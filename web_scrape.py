from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json
import pandas as pd
import pprint

url = "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
parameters = {
    'start':'1',
    'limit':'1',
    'convert':'USD'
}
headers ={
    'Accepts': 'application/json',
    'X-CMC_PRO_API_KEY':'f5edd51c-defa-48b5-9af8-60226629f498'
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

pp = pprint.PrettyPrinter(width=41, compact=True)
pp.pprint(data_retrieved[0]['data'][0]['quote'])

circulating_supply = []
cmc_rank = []
data_added = []
id = []
last_updated = []
max_supply = []
name = []
num_market_pairs =[]
platform = []
quote = []

test_data = data_retrieved[0]['data']

for item in test_data:
    print(item)