"""
Functions of the MapDiseas part
"""
from flask import Flask, send_file, jsonify, make_response, request
import flag
import pandas as pd
import csv
from io import StringIO
import pymysql
from sqlalchemy import create_engine

"""
We connect to the database and choose all the countries that are registered
    Arguments:
        url_connect {string} -- Information to connect to the database
"""
def registered_countries(url_connect):
    engine = create_engine(url_connect)
    con = engine.connect()
    sql = ("SELECT * FROM `COUNTRIES`")
    countries = pd.read_sql(sql, con)
    con.close()
    #Here we just pass the data with the force_acscii false option to pass the flags
    json_countries = countries.to_json(orient='records', force_ascii=False)
    return json_countries

"""
Collect all the data from the countries that do not pass
Arguments:
    url_connect {string} -- Information to connect to the database
    list_countries {list} -- It's a list of all the countries
"""
def data_to_json(url_connect, list_countries):
    #We parse the list you give us so that we can pass it on to the sql in
    # a good format and without error problems
    if list_countries is None:
        list_countries = ""
    countries = tuple(map(str, list_countries.split(',')))
    if len(countries) > 1:
        all_data = countries
    else:
        all_data = "('"+list_countries+"')"
    #We connect to the base de dates
    engine = create_engine(url_connect)
    con = engine.connect()
    #the query is to return all the data from all the past countries
    sql = ("SELECT * FROM `Covid-19` WHERE `Country/Region` in %s" % str(all_data))
    data_countries = pd.read_sql(sql, con)
    con.close()
    json_countries = data_countries.to_json(orient='records', force_ascii=False)
    return json_countries

    """
We collect all the data from the database and return it as
a csv file and we will need this for the map and download
    Arguments:
        url_connect {string} -- Information to connect to the database
        list_countries {list} -- It's a list of all the countries
    """
def data_to_csv(url_connect, list_countries):
    #We parse the list you give us so that we can pass it on to the sql in
    # a good format and without error problems
    if list_countries is None:
        list_countries = ""
    countries = tuple(map(str, list_countries.split(',')))
    if len(countries) > 1:
        all_data = countries
    else:
        all_data = "('"+list_countries+"')"
    #We connect to the base de dates
    engine = create_engine(url_connect)
    con = engine.connect()
    sql = ("SELECT * FROM `Covid-19` WHERE `Country/Region` in %s" % str(all_data))
    data_countries = pd.read_sql(sql, con)
    con.close()
    # We convert the data into a csv so we can pass it on
    csv = data_countries.to_csv(encoding='utf-8', index=False)
    response = make_response(csv)
    name = 'attachment; filename=dataCovid.csv'
    response.headers['Content-Disposition'] = name
    response.mimetype = 'text/csv'
    return response

    """
Part where you group the data from one or several countries to give us a result
   Arguments:
        url_connect {string} -- Information to connect to the database
        list_countries {list} -- It's a list of all the countries
    """
def list_all_result(url_connect, list_countries):
    list_countries = request.args.get('countries')
    if list_countries is None:
        list_countries = ""
    countries = tuple(map(str, list_countries.split(',')))
    if len(countries) > 1:
        all_data = countries
    else:
        all_data = "('"+list_countries+"')"
    engine = create_engine(url_connect)
    con = engine.connect()
    #The consultation is described in this way:The consultation is described in this way:
    #we group the country by dates and make a summation of the column confrimed, deahs,
    #recovered which will give us back all the dates and with their respective results
    sql = ("""SELECT `date`, sum(`confirmed`) as 'confirmed', sum(`deaths`) as 'deaths',
            sum(`recovered`) as 'recovered' FROM `Covid-19` 
            where `country/region` in  %s  GROUP by `date`  order by `date`""" % str(all_data))
    data_countries = pd.read_sql(sql, con)
    con.close()
    json_countries = data_countries.to_json(orient='records', force_ascii=False)
    return json_countries
