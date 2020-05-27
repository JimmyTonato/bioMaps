"""Login.py"""
from flask import Flask, request
from sqlalchemy import create_engine
import pandas
import pymysql

app = Flask(__name__)

credentialsdb = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Mario123!',
    'database': 'AppBioMap'
    }

urlConnect = "mysql+pymysql://" + \
credentialsdb['user']+":"+credentialsdb["password"]+"@" + credentialsdb["host"]+"/"+credentialsdb["database"]

@app.route('/login', methods=['POST'])
def login():
    """MainFunction"""
    username = request.json["username"]
    password = request.json["password"]

    engine = create_engine(urlConnect)
    con = engine.connect()
    sql = (f'SELECT * FROM users where username="{username}" and password="{password}"')
    
    dataUsers = pandas.read_sql(sql, con)
    con.close()
    jsonUsers = dataUsers.to_json(orient='records', force_ascii=False)
    
    
    return jsonUsers



if __name__ == "__main__":
    app.run(debug=True, port=5003)
