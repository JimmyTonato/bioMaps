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
import time

YOUTUBE_READ_WRITE_SCOPE = "https://www.googleapis.com/"
YOUTUBE_API_SERVICE_NAME = "youtube/"
YOUTUBE_API_VERSION = "v3/"
# DEVELOPER_KEY = "AIzaSyAaxHHR5GgyWFDHlQnxgVpci1PyeBtWn2Y"
LONGITUD_RADIUS = "1000km"
# MAX_RESULTS = 4
# VIDEO_CATEGORY_ID = 25
# FIRST_SEARCH = "crisis"
# SECOND_SEARCH = "covid"
# ID_VIDEO = "CbDNCs9IOL4"
# LATITUD = 41.382894
# LONGITUD = 2.177432


def JsonData(URL_CONNECT, latitud, longitud, keyAPI, oneSearch, twoSearch, maxVideosSearch, categoryID):
    coordinates = (latitud, longitud)
    country = reverseGeocode(coordinates)
    url = search_videos(latitud, longitud, keyAPI, oneSearch,
                        twoSearch, maxVideosSearch, categoryID)
    videos = convert_dict_videos(url, country, keyAPI)
    add_videos_bbdd(URL_CONNECT, videos)
    return country


def reverseGeocode(coordinates):
    # covert longitut for country
    result = rg.search(coordinates)
    print(result)
    abbreviature = result[0]['cc']
    country = pycountry.countries.get(alpha_2=abbreviature).name
    print(country)
    return country


def search_videos(latitud, longitud, keyAPI, oneSearch, twoSearch, maxVideosSearch, categoryID):
    # Funcion join in url for videos
    url = YOUTUBE_READ_WRITE_SCOPE + YOUTUBE_API_SERVICE_NAME + YOUTUBE_API_VERSION + "search?&part=snippet&location=" + \
        str(latitud) + "%2C" + str(longitud) + "&locationRadius=" + str(LONGITUD_RADIUS) + "&maxResults=" + str(maxVideosSearch) + \
        "&type=video,id&videoCategoryId=" + \
        str(categoryID) + "&q=" + oneSearch + \
        ',' + twoSearch + "&key=" + keyAPI
    print(url)
    return url


def convert_dict_videos(url, country, keyAPI):
    # Convert list in dict
    videos_full = []
    response = requests.get(url)
    response_json = json.loads(response.text)
    for i in response_json['items']:
        videos = {"Country": country, "VideoId": i['id']['videoId'], "ChannelId": i['snippet']['channelId'], "ChannelTitle": i['snippet']['channelTitle'],
                  "Title": i['snippet']['title'], "Description": i['snippet']['description'],
                  "IMG": i['snippet']['thumbnails']['high']['url'], "PublishTime": dateutil.parser.parse(i['snippet']['publishTime']).strftime('%Y-%m-%d')}

        statistics = convert_dict_data(i['id']['videoId'], keyAPI)
        videos.update(statistics)
        videos_full.append(videos)
    df = pd.DataFrame(videos_full)
    print(df)
    return videos_full


def convert_dict_data(id, keyAPI):
    # Convert list in dict
    data = {}
    url_data = YOUTUBE_READ_WRITE_SCOPE + YOUTUBE_API_SERVICE_NAME + YOUTUBE_API_VERSION + \
        "videos?&part=statistics" + "&id=" + id + "&key=" + keyAPI
    response = requests.get(url_data)
    response_json = json.loads(response.text)
    items = response_json['items'][0]
    try:
        view = items['statistics']['viewCount']
    except:
        view = 0
    try:
        comment = items['statistics']['commentCount']
    except:
        comment = 0
    try:
        like = items['statistics']['likeCount']
    except:
        like = 0
    try:
        dislike = items['statistics']['dislikeCount']
    except:
        dislike = 0
    data = {"viewCount": view, "commentCount": comment,
            "likeCount": like, "dislikeCount": dislike}
    return data


def add_videos_bbdd(URL_CONNECT, videos):
    df = pd.DataFrame(videos)
    engine = create_engine(URL_CONNECT)
    con = engine.connect()
    df.to_sql(name='videos', con=con, if_exists='append', index=False)
    con.close()


def getting_bbdd(URL_CONNECT, country, data1, data2, limit):
    engine = create_engine(URL_CONNECT)
    con = engine.connect()
    if(data1 == "0" and data2 == "0"):
        sql = ("""SELECT Country, VideoId,ChannelId, ChannelTitle, Title, Description, IMG, PublishTime,max(viewCount) as viewCount, max(commentCount) as commentCount, max(likeCount) as likeCount, max(dislikeCount) as dislikeCount
                  FROM `videos`
                  where `country` = '%s'
                  GROUP BY Country, VideoId, ChannelId, ChannelTitle, Title, Description, IMG,PublishTime
                  ORDER BY `publishTime` desc limit %s """ % (country, limit))
    else:
        sql = ("""SELECT Country, VideoId,ChannelId, ChannelTitle, Title, Description, IMG, PublishTime,max(viewCount) as viewCount, max(commentCount) as commentCount, max(likeCount) as likeCount, max(dislikeCount) as dislikeCount
                  FROM `videos`
                  where `country` = '%s'  and `publishTime` BETWEEN '%s' and '%s'
                  GROUP BY Country, VideoId, ChannelId, ChannelTitle, Title, Description, IMG,PublishTime
                  ORDER BY `publishTime` desc limit %s """ % (country, data1, data2, limit))
    dataVideos = pd.read_sql(sql, con)
    con.close()
    jsonVideos = dataVideos.to_json(orient='records', force_ascii=False)
    return jsonVideos


# if __name__ == "__main__":
#     coordinates = (LATITUD, LONGITUD)
#     country = reverseGeocode(coordinates)
#     url = search_videos(LATITUD, LONGITUD, DEVELOPER_KEY, FIRST_SEARCH,
#                         SECOND_SEARCH, MAX_RESULTS, VIDEO_CATEGORY_ID)
#     videos = convert_dict_videos(url, country)
