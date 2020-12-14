from src.OandaStream import OandaStream
from src.OandaClient import OandaClient
from src.Types import Price
import json


module_name = "OandaLive"
oanda_stream = OandaStream()
dep = OandaClient.get_dependencies()
oanda_client = OandaClient(*OandaClient.get_dependencies())

print("/----------------------------------------------/")
print(dep)
print("/----------------------------------------------/")


def publish_price(price_dict):
    price = Price.from_origin(price_dict)
    price_json = json.dumps({
        "ask": price.ask,
        "bid": price.bid,
        "spread": price.spread
    })
    price = price.to_json()
    print(price)


def begin_publish_price_data():
    print('oanda_stream')
    oanda_stream.stream(publish_price, instruments=None)
