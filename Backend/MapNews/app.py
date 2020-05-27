"""App.py"""
from flask import Flask, request
import reverse_geocoder as rg
import pycountry
import requests

def getnews():
    """MainFunction"""
    #Map properties
    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    shortby = request.args.get('filterSelection')

    #Geocode to get the country with the latitude and longitude
    coordinates = (latitude, longitude)
    result = rg.search(coordinates)
    abbreviature = result[0]['cc']
    country = pycountry.countries.get(alpha_2=abbreviature).name
    disease = "COVID-19"
    qintitle = country + ": " + disease

    #NewsAPI
    headers = {'Authorization': '31a8e18dbc0745b1a28e06a048ffdad3'}
    everything_news_url = 'https://newsapi.org/v2/everything'
    everything_payload = {'qInTitle': qintitle,
                          'language': '', 'sortBy': shortby}

    response = requests.get(url=everything_news_url,
                            headers=headers, params=everything_payload)
    responsejson = response.json()

    #Json with all the news
    return responsejson

