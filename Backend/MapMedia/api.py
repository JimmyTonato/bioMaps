from flask import Flask, send_file, request
import youtube_api as YT  # name document the youtube API

app = Flask(__name__)

credential_db = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Root123!',
    'database': 'AppBioMap'
}

URL_CONNECT = "mysql+pymysql://" + \
    credential_db['user']+":"+credential_db["password"]+"@" + \
    credential_db["host"]+"/"+credential_db["database"]

@app.route('/mapMedia/runYoutubeApi/apiRun', methods=['GET', 'POST'])
def runYoutubeApi():
    latitud = request.args.get("latitude")
    longitud = request.args.get("longitude")
    date1 = request.args.get('date1')
    date2 = request.args.get('date2')
    limit = request.args.get('limit')
    keyAPI = request.args.get('key')
    oneSearch = request.args.get('firstSearch')
    twoSearch = request.args.get('secondSearch')
    maxVideosSearch = request.args.get('maxVideosSearch')
    categoryID = request.args.get('categoryID')

    country = YT.JsonData(URL_CONNECT, latitud, longitud, keyAPI,
                          oneSearch, twoSearch, maxVideosSearch, categoryID)
    data = YT.getting_bbdd(URL_CONNECT, country, date1, date2, limit)

    return data



if __name__ == '__main__':
    app.run(debug=True)
