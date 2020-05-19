# from flask import Flask, send_file
import pandas as pd
import pycristoforo as pyc
import pycountry
import numpy as np
import pymysql
import geocoder
def random_location(country1):
    try:
        abbreviature = pycountry.countries.search_fuzzy(country1)[0].alpha_3
        country = pyc.get_shape(abbreviature)
    except:
        try:
            country = pyc.get_shape(country1) 
        except:
            return 0
    
    points = pyc.geoloc_generation(country, 1, country1)
    latitude = points[0].get('geometry').get('coordinates')[1]
    Longitude = points[0].get('geometry').get('coordinates')[0]
    return [latitude, Longitude]
    

# data = pd.read_csv("./data/covid-19-all-all.csv")
# data['esta'] = "no"
# for index, information in data.iterrows():
#     if(index >= 50000):
#         print(index)
#         country = information['Country/Region']
#         if(random_location(country) != 0):
#             coordinates = random_location(country)
#             data.loc[index, 'Latitude'] = coordinates[0]
#             data.loc[index, 'Longitude'] = coordinates[1]
#         data.loc[index, 'esta'] = 'si'
#         data.to_csv(r'./data/covid-bacck-desde50.csv', index = False, header = True)
    

# data.to_csv(r'./data/covid-desde-50.csv', index = False, header = True)
    
# db = pymysql.connect("localhost", "root", "Daniel25.", "AppBioMap")
# cursor = db.cursor()
# sql = """CREATE TABLE PERSON (
#    ID INT NOT NULL,
#    FIRST_NAME  CHAR(20) NOT NULL,
#    LAST_NAME  CHAR(20),
#    AGE INT,
#    SEX CHAR(1),
#    PRIMARY KEY (ID) )"""
 
# cursor.execute(sql)
# db.close()
# data = pd.read_csv("./data/covid-bacck.csv")
# data = data[data.esta == 'si']
# print(data)
paises = {}
data = pd.read_csv("./data/covid-19-all-all.csv")
# for index, information in data.iterrows():
#     pais = information['Country/Region']
#     province = information['Province/State']
#     if pais not in paises and not pd.isna(pais):
#         paises.setdefault(pais)
#         paises[pais] = {}
    

#     if province not in paises[pais] and not pd.isna(province):
#         paises[pais].setdefault(province)
#     print(paises[pais][province])
# print(paises)
loc1 = geocoder.osm('mocou')
loc1
print(loc1.latlng)



