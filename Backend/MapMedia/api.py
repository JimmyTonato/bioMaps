from flask import Flask, send_file, request
import youtube_api as YT  # name document the youtube API

app = Flask(__name__)


@app.route('/mapMedia/runYoutubeApi/apiRun', methods=['GET', 'POST'])
def runYoutubeApi():
    latitud = request.args.get("latitude")
    longitud = request.args.get("longitude")
    date1= request.args.get('date1')
    date2= request.args.get('date2')
    limit= request.args.get('limit')

    country = YT.JsonData(latitud, longitud)

    data = YT.getting_bbdd(country, date1, date2, limit)
    return data

# @app.route('/mapMedia/runYoutubeApi/dataBBDD', methods=['GET', 'POST'])
# def getting_bbdd():
#     country = request.args.get('country')

#     data = YT.getting_bbdd(country, date1, date2, limit)
#     return data

if __name__ == '__main__':
    app.run(debug=True)
