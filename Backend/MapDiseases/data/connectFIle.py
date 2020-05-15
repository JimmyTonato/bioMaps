from flask import Flask, send_file
app = Flask(__name__)

@app.route('/covid')
def holamundo():
    
    return send_file("./data/covid.csv", as_attachment=True)




if __name__ == '__main__':
    app.run()