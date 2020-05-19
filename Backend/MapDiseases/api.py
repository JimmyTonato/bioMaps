# from flask import Flask, send_file
import pandas as pd
import pycristoforo as pyc
import pycountry
import numpy as np

# app = Flask(__name__)

# # @app.route('/')
# def holamundo():
    
#     return send_file("./data/covid-19-all.csv", as_attachment=True)

# @app.route('/holas')
# def holamundos():
#     return send_file("./data/covid-19-all.csv", as_attachment=True)

# if __name__ == '__main__':
#     app.run()

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
    


# data = pd.read_csv("./data/covid-19-all.csv")
# print(data.keys())

# for information in data.to_dict('record'):
#     if(information['Country/Region'] == 'Macau'):
#        information['Country/Region'] = 'Macao'
#     coordinates = random_location(information['Country/Region'])
#     information['Latitude'] = coordinates[0]
#     information['Longitude'] = coordinates[1]
#     information['all'] = 1
# print(data)
#  if(field_ofStudy not in fields_folders):

# paises = []
# for information in data.to_dict('record'):
#     pais = information['Country/Region']
#     if(pais not in paises):
#         paises.append(pais)
# print(paises)
# for pais in paises:
#     if(random_location(pais) != 0):
#         print(pais)
#         print(random_location(pais))

# for information in data.to_dict('record'):
#     country = information['Country/Region']

#     data.replace({'Country/Region' : "hola"}, 0, inplace = True)
#     # if(random_location(country) != 0):
#     #     coordinates = random_location(country)
#     #     information['Latitude'] = coordinates[0]
#     #     information['Longitude'] = coordinates[1]
# print(data)
# data.to_csv(r'./data/covid-19-all-corregido-2.csv', index = False, header = True)
data = pd.read_csv("./data/covid-19-all.csv")

for index, information in data.iterrows():
    country = information['Country/Region']
    if(random_location(country) != 0):
        coordinates = random_location(country)
        data.loc[index, 'Latitude'] = coordinates[0]
        data.loc[index, 'Longitude'] = coordinates[1]
data['All'] = 1
data.to_csv(r'./data/covid.csv', index = False, header = True)
    