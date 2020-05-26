"""Import.py"""
from flask import Flask, send_file
import app as newsAPI


app = Flask(__name__)


@app.route('/mapNewsApi', methods=['GET', 'POST'])
def runNewsApi():
    """MainFunction"""
    data = newsAPI.getnews()
    return data


if __name__ == '__main__':
    app.run(debug=True, port=5002)
