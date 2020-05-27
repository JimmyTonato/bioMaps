# from flask import Flask, send_file
import pandas as pd
# import pycristoforo as pyc
import pycountry
import flag
# import numpy as np
import pymysql
# import geocoder
# from geopy.geocoders import Nominatim
# from opencage.geocoder import OpenCageGeocode
# import flag
from sqlalchemy import create_engine
# import flag
# import pandas as pd
# import csv
# from io import StringIOt
# def random_location(country1):
#     try:
#         abbreviature = pycountry.countries.search_fuzzy(country1)[0].alpha_3
#         country = pyc.get_shape(abbreviature)
#     except:
#         try:
#             country = pyc.get_shape(country1) 
#             return 0
    
#     points = pyc.geoloc_generation(country, 1, country1)
#     latitude = points[0].get('geometry').get('coordinates')[1]
#     Longitude = points[0].get('geometry').get('coordinates')[0]
#     return [str(latitude), str(Longitude)]
    

# data = pd.read_csv("./data/covid-prueba.csv")

##Conectarme a la base de datos
# db = pymysql.connect("localhost", "root", "Daniel25.", "AppBioMap")
# engine = create_engine("mysql+pymysql://root:Daniel25.@localhost/AppBioMap")
# con = engine.connect()
# data.to_sql(name='Covid-19', con=con, if_exists = 'append', index=False)
# # df = pd.DataFrame([[key, clients[key]] for key in clients.keys()], columns=['Name', 'Amount'])
# con.close()



# data.to_sql(name=database, con=conn, if_exists = 'replace', index=False, flavor = 'mysql')
# data.sort_values(by=['Date'], inplace=True)
# # data['esta'] = "no"
# # for index, information in data.iterrows():
# #     if(index >= 50000):
# #         print(index)
# #         country = information['Country/Region']
# #         if(random_location(country) != 0):
# #             coordinates = random_location(country)
# #             data.loc[index, 'Latitude'] = coordinates[0]
# #             data.loc[index, 'Longitude'] = coordinates[1]
# #         data.loc[index, 'esta'] = 'si'
# #         data.to_csv(r'./data/covid-bacck-desde50.csv', index = False, header = True)

# # for index, information in data.iterrows():
# #     Confirmed = information['Confirmed']
# #     Recovered = information['Recovered']
# #     death = information['Deaths']
# #     if(Confirmed == 0 and Recovered == 0 and death == 0):
# #         data.drop(index, inplace=True)

# data.to_csv(r'./data/covid-prueba.csv', index = False, header = True)
    
# cursor = db.cursor()
# sql = """CREATE TABLE COUNTRIES (
#    id MEDIUMINT NOT NULL AUTO_INCREMENT,
#    Country/Region  CHAR(30) NOT NULL,
#    Province/State  CHAR(30),
#    Latitude DOUBLE(5,1),
#    Longitude DOUBLE(5,1),
#    PRIMARY KEY (ID) )"""
 
# cursor.execute(sql)
# db.close()
# data = pd.read_csv("./data/covid-bacck.csv")
# data = data[data.esta == 'si']
# print(data)
paises = {}
nada = []
# data = pd.read_csv("./data/covid-prueba.csv")
# for index, information in data.iterrows():
#     pais = information['Country/Region']
#     province = information['Province/State']
#     if pais not in paises and not pd.isna(pais):
#         paises.setdefault(pais)
        
#         try:
#             abbreviature = str(pycountry.countries.search_fuzzy(pais)[0].alpha_2)
#         except:
#             abbreviature = "ZZ"
#         bandera = flag.flagize(':'+abbreviature+':')
#         paises[pais] = bandera

# df = pd.DataFrame([[key, paises[key]] for key in paises.keys()], columns=['Country/Region', 'imgCount'])   
# db = pymysql.connect("localhost", "root", "Daniel25.", "AppBioMap")
# engine = create_engine("mysql+pymysql://root:Daniel25.@localhost/AppBioMap")
# con = engine.connect()
# data.to_sql(name='Covid-19', con=con, if_exists = 'append', index=False)
# con.close()
# for pais in paises:
#     print("-----------------")
#     print(pais)
#     print("ciudades: ")
#     for province in paises[pais]:
#         loc = geocoder.osm(province)
#         paises[pais][province] = loc.latlng
#         print(province)
#         print(province+" : "+ str(paises[pais][province]))

# loc =', '.join(random_location('Islands'))
# geolocator = Nominatim(user_agent="specify_your_app_name_here")
# location = geolocator.reverse(loc)
# print(location.raw['address']['state'])


# loc = geocoder.osm('Spartanburg County, SC, US')
# loc1
# print(loc1.latlng)


nada = ['Japan', 'Thailand', 'South Korea', 'Singapore', 'Philippines', 'Malaysia', 'Vietnam', 'Australia', 'Mexico', 'Brazil', 'Colombia', 'France', 'Nepal', 'Cambodia', 'Sri Lanka', 'Ivory Coast', 'Finland', 'United Arab Emirates', 'India', 'Italy', 'United Kingdom', 'Russia', 'Sweden', 'Germany', 'Spain', 'Belgium', 'Egypt', 'Iran', 'Lebanon', 'Oman', 'Afghanistan', 'Bahrain', 'Iraq', 'Kuwait', 'Algeria', 'Croatia', 'Switzerland', 'Austria', 'Israel', 'Pakistan', 'Georgia', 'Greece', 'North Macedonia', 'Norway', 'Romania', 'Denmark', 'Estonia', 'Netherlands', 'San Marino', 'Azerbaijan', 'Belarus', 'Iceland', 'Lithuania', 'New Zealand', 'Nigeria', 'North Ireland', 'Ireland', 'Luxembourg', 'Monaco', 'Qatar', 'Ecuador', 'Czech Republic', 'Armenia', 'Dominican Republic', 'Indonesia', 'Portugal', 'Andorra', 'Latvia', 'Morocco', 'Saudi Arabia', 'Senegal', 'Argentina', 'Chile', 'Jordan', 'Ukraine', 'Saint Barthelemy', 'Hungary', 'Faroe Islands', 'Gibraltar', 'Liechtenstein', 'Poland', 'Tunisia', 'West Bank and Gaza', 'Bosnia and Herzegovina', 'Slovenia', 'South Africa', 'Bhutan', 'Cameroon', 'Costa Rica', 'Peru', 'Serbia', 'Slovakia', 'Togo', 'Vatican City', 'French Guiana', 'Malta', 'Martinique', 'Bulgaria', 'Maldives', 'Bangladesh', 'Moldova', 'Paraguay', 'Albania', 'Cyprus', 'St. Martin', 'Brunei', 'Saint Martin', 'Burkina Faso', 'Channel Islands', 'Mongolia', 'Panama', 'Taiwan', 'Bolivia', 'Honduras', 'Congo (Kinshasa)', 'Jamaica', 'Reunion', 'Turkey', 'Cuba', 'Guyana', 'Kazakhstan', 'Cayman Islands', 'Guadeloupe', 'Ethiopia', 'Sudan', 'Guinea', 'Antigua and Barbuda', 'Aruba', 'Kenya', 'Uruguay', 'Ghana', 'Jersey', 'Namibia', 'Seychelles', 'Trinidad and Tobago', 'Venezuela', 'Curacao', 'Eswatini', 'Gabon', 'Guatemala', 'Guernsey', 'Mauritania', 'Rwanda', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Suriname', 'Kosovo', 'Central African Republic', 'Congo (Brazzaville)', 'Equatorial Guinea', 'Uzbekistan', 'Guam', 'Puerto Rico', 'Benin', 'Greenland', 'Liberia', 'Mayotte', 'Somalia', 'Tanzania', 'The Bahamas', 'Barbados', 'Montenegro', 'Gambia', 'Kyrgyzstan', 'Mauritius', 'Zambia', 'Djibouti', 'Bahamas, The', 'Chad', 'El Salvador', 'Fiji', 'Nicaragua', 'Madagascar', 'Haiti', 'Angola', 'Cabo Verde', 'Papua New Guinea', 'Zimbabwe', 'Cape Verde', 'East Timor', 'Eritrea', 'Uganda', 'Bahamas', 'Grenada', 'Mozambique', 'Syria', 'Timor-Leste', 'Belize', 'Laos', 'Libya', 'Diamond Princess', 'Guinea-Bissau', 'Mali', 'Saint Kitts and Nevis', 'Burma', 'MS Zaandam', 'Botswana', 'Burundi', 'Sierra Leone', 'Malawi', 'South Sudan', 'Western Sahara', 'Sao Tome and Principe', 'Yemen', 'Comoros', 'Tajikistan', 'Lesotho']
# print(nada)
# for i in nada:
#     print("-------------------")
#     print(i)
#     loc =', '.join(random_location(i))
#     print(loc)
#     geolocator = Nominatim(user_agent="specify_your_app_name_here")
#     location = geolocator.reverse(loc, language='en')
#     try:
#         print(location.raw['address']['city'])
#     except:
#         try:
#             print(location.raw['address']['state'])
#         except:
#             try:
#                 print(location.raw['address']['county'])
#             except:
#                 print(location.raw['display_name'])

        

# geolocator = Nominatim(user_agent="specify_your_app_name_here")
# location = geolocator.geocode('Travis')
# print((location.latitude, location.longitude))
# # Omaha, NE (From Diamond Princess) : None
# # Travis, CA (From Diamond Princess)
# # Travis, CA (From Diamond Princess) : None
# # Lackland, TX (From Diamond Princess)
# # Lackland, TX (From Diamond Princess) : None
# # Unassigned Location (From Diamond Princess)
# # Unassigned Location (From Diamond Princess) : None
# # Unassigned Location, VT
# # Unassigned Location, VT : None
# SELECT * FROM `Covid-19` WHERE `Date` = '2020-04-23'
# SELECT * FROM `Covid-19` WHERE `Date` BETWEEN '2020-04-23' and '2020-04-30'

import dateutil.parser
from dateutil import parser
yourdate = dateutil.parser.parse("2020-03-26T12:45:36Z").strftime('%Y-%m-%d')
print('Current Timestamp : ', yourdate)
print(type(yourdate))
# SELECT `date`, sum(`confirmed`) FROM `Covid-19` where `country/region` in ('China', 'Spain', 'Ecuador')
# GROUP by `date`

    # data.to_sql(name='Covid-19', con=con, if_exists = 'append', index=False)
    #recogemos los datos con la opcion que nos ofrecen los dateframes(pandas)