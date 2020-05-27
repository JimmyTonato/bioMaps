import MapDiseases.map_deseases as MapDiseases
from flask import Flask, send_file, jsonify, make_response, request
app = Flask(__name__)

credential_db = {
    'host':'localhost',
    'user':'root',
    'password':'Daniel25.',
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

if __name__ == '__main__':
    app.run(debug=True)