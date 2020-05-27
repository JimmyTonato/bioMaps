from flask import Flask, request
from sqlalchemy import create_engine
import pandas
import pymysql

def login(urlConnect, username, password):
    engine = create_engine(urlConnect)
    con = engine.connect()
    sql = (f'SELECT * FROM users where username="{username}" and password="{password}"')
    
    dataUsers = pandas.read_sql(sql, con)
    con.close()
    jsonUsers = dataUsers.to_json(orient='records', force_ascii=False)
    
    
    return jsonUsers

