from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/cryptoCurrency_db"
mongo = PyMongo(app)

# create my own API from the data stored in Mongo database
@app.route('/get_data')
def index():
    listings = mongo.db.items.find_one()
    return listings

@app.route('/')
def home():
    return 'welcome'

if __name__ == '__main__':
    app.run(debug=True)