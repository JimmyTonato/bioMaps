from flask import Flask, send_file, request
import reverse_geocoder as rg
import pycountry
import sys
import requests
import json
import pandas as pd
import pycristoforo as pyc
import pprint
from sqlalchemy import create_engine
from dateutil import parser
import dateutil.parser


YOUTUBE_READ_WRITE_SCOPE = "https://www.googleapis.com/"
YOUTUBE_API_SERVICE_NAME = "youtube/"
YOUTUBE_API_VERSION = "v3/"
DEVELOPER_KEY = "AIzaSyAaxHHR5GgyWFDHlQnxgVpci1PyeBtWn2Y"
LONGITUD_RADIUS = "1000km"
MAX_RESULTS = 10
VIDEO_CATEGORY_ID = 25
FIRST_SEARCH = "covid"
SECOND_SEARCH = "España"


def JsonData(URL_CONNECT, latitud, longitud):
    coordinates = (latitud, longitud)
    country = reverseGeocode(coordinates)
    url = join_url(country, latitud, longitud)
    videos = convert_dict(url, country)
    add_videos_bbdd(URL_CONNECT, videos)
    # jsonVideos = json.dumps(videos, indent=4, sort_keys=True, default=str)
    #jsonData = getting_bbdd(jsonVideos)
    return country


def add_videos_bbdd(URL_CONNECT, videos):
    df = pd.DataFrame(videos)
    engine = create_engine(URL_CONNECT)
    con = engine.connect()
    df.to_sql(name='videos', con=con, if_exists='append', index=False)
    con.close()

#SELECT * FROM `videos` where country = 'Spain' ORDER BY publishTime DESC limit 6

# SELECT * FROM `videos` where country = 'Germany' and publishTime BETWEEN '2020-01-01' and '20-05-01' ORDER BY publishTime limit 5
def getting_bbdd(URL_CONNECT, country, data1, data2, limit):
    engine = create_engine(URL_CONNECT)
    con = engine.connect()
    # and publishTime BETWEEN '%s' and '%s' ORDER BY publishTime limit %s , str(data1), str(data2), str(limit    limit %s"
    sql = ("SELECT * FROM `videos` where `country` = '%s'  and `publishTime` BETWEEN '%s' and '%s' ORDER BY `publishTime` desc limit %s " % (country, data1, data2, limit))
    dataVideos = pd.read_sql(sql, con)
    con.close()
    jsonVideos = dataVideos.to_json(orient='records', force_ascii=False)
    return jsonVideos


def reverseGeocode(coordinates):
    # covert longitut for country
    result = rg.search(coordinates)
    abbreviature = result[0]['cc']
    country = pycountry.countries.get(alpha_2=abbreviature).name
    print(country)
    return country


def join_url(contry, latitud, longitud):
    # Funcion join in url
    url = YOUTUBE_READ_WRITE_SCOPE + YOUTUBE_API_SERVICE_NAME + YOUTUBE_API_VERSION + "search?&part=snippet&location=" + \
        str(latitud) + "%2C" + str(longitud) + "&locationRadius=" + str(LONGITUD_RADIUS) + "&maxResults=" + str(MAX_RESULTS) + \
        "&type=video,id&videoCategoryId=" + \
        str(VIDEO_CATEGORY_ID) + "&q=" + FIRST_SEARCH + \
        ',' + contry + "&key=" + DEVELOPER_KEY
    print(url)
    return url


def convert_dict(url, country):
    # Convert list in dict
    videos = []
    response = requests.get(url)
    response_json = json.loads(response.text)
    for i in response_json['items']:
        videos.append({"Country": country, "VideoId": i['id']['videoId'], "ChannelId": i['snippet']['channelId'], "ChannelTitle": i['snippet']['channelTitle'],
                       "Title": i['snippet']['title'], "Description": i['snippet']['description'],
                       "IMG": i['snippet']['thumbnails']['high']['url'], "PublishTime": dateutil.parser.parse(i['snippet']['publishTime']).strftime('%Y-%m-%d')})
    return videos
