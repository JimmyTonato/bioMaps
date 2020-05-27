import MapDiseases.map_deseases as MapDiseases
from flask import Flask, send_file, jsonify, make_response, request
import MapNews.app as newsAPI
import Login.login as users
import MapMedia.youtube_api as YT  # name document the youtube API
app = Flask(__name__)

credential_db = {
    'host':'localhost',
    'user':'root',
    'password':'Root123!',
    'database':'AppBioMap'
}

URL_CONNECT = "mysql+pymysql://"+credential_db['user']+":"+credential_db["password"]+"@"+credential_db["host"]+"/"+credential_db["database"]
   
@app.route('/mapDiseades/covid-19/registeredcountries')
def registered_countries():
    return MapDiseases.registered_countries(URL_CONNECT)

@app.route('/mapDiseades/covid-19/jsondataMap', methods=['GET', 'POST'])
def data_to_json():
    list_countries = request.args.get('countries')
    return MapDiseases.data_to_json(URL_CONNECT, list_countries)

@app.route('/mapDiseades/covid-19/csvdataMap', methods=['GET', 'POST'])
def data_to_csv():
    list_countries = request.args.get('countries')
    return MapDiseases.data_to_csv(URL_CONNECT, list_countries)

@app.route('/mapDiseades/covid-19/resultsAll', methods=['GET', 'POST'])
def list_all_result():
    list_countries = request.args.get('countries')
    return MapDiseases.list_all_result(URL_CONNECT, list_countries)

#------------------------------------------------------
#                   Map News
#------------------------------------------------------
@app.route('/mapNewsApi', methods=['GET', 'POST'])
def runNewsApi():
    data = newsAPI.getnews()
    return data
#------------------------------------------------------
#                   Users
#------------------------------------------------------
@app.route('/login', methods=['POST'])
def login():
    username = request.json["username"]
    password = request.json["password"]
    
    return users.login(URL_CONNECT, username, password)

#------------------------------------------------------
#                   Media
#------------------------------------------------------
@app.route('/mapMedia/runYoutubeApi/apiRun', methods=['GET', 'POST'])
def runYoutubeApi():
    latitud = request.args.get("latitude")
    longitud = request.args.get("longitude")
    date1= request.args.get('date1')
    date2= request.args.get('date2')
    limit= request.args.get('limit')

    country = YT.JsonData(URL_CONNECT, latitud, longitud)

    data = YT.getting_bbdd(URL_CONNECT, country, date1, date2, limit)
    return data
if __name__ == '__main__':
    app.run(debug=True)
