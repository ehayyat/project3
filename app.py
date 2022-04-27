from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import json
from bson import ObjectId
import flask

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/cryptoCurrency_db"
mongo = PyMongo(app)

# create my own API from the data stored in Mongo database
@app.route('/get_data')
def index():
    listings = mongo.db.items.find_one()
    return JSONEncoder().encode(listings)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=8000)

