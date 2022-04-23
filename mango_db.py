from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json
import pandas as pd
import pymongo


url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
parameters = {"start": 1, "limit": 1000, "convert": "USD"}
headers = {
    "Accept": "application/json",
    "X-CMC_PRO_API_KEY": "f5edd51c-defa-48b5-9af8-60226629f498",
}

session = Session()
session.headers.update(headers)
data_retrieved = []

try:
    response = session.get(url, params=parameters)
    data = json.loads(response.text)
    data_retrieved.append(data)

except (ConnectionError, Timeout, TooManyRedirects) as error:
    data_retrieved(error)

#Int Mango
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)
db = client.cryptoCurrency_db
collection = db.items
 
# Insert data to Mango DB

for item in data_retrieved:

    collection.insert_one(item)


docs = pd.DataFrame(columns=[])
items = db.items.find()
for num, doc in enumerate(items):
    doc["_id"] = str(doc["_id"])
    doc_id = doc["_id"]
    series_obj = pd.Series(doc, name=doc_id)
    docs = docs.append(series_obj)


data_df = pd.DataFrame(docs["data"][0])
data_df["date_added"] = pd.to_datetime(data_df["date_added"])
data_df["year"] = pd.DatetimeIndex(data_df["date_added"]).year
df = pd.DataFrame.from_dict(data_df)
df["date_added"] = pd.to_datetime(df["date_added"])
df["year"] = pd.DatetimeIndex(df["date_added"]).year
df["month"] = pd.DatetimeIndex(df["date_added"]).month
df = df["quote"].apply(pd.Series)
df = df.USD.apply(pd.Series)
final_df = pd.concat([data_df, df], axis=1)
final_df = final_df.drop(columns="quote")
collection.insert_many(final_df.to_dict("records"))

