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
    print(module_name, price.time, price.instrument, price.ask, price.bid)
    price_json = json.dumps({
        "ask": price.ask,
        "bid": price.bid,
        "spread": price.spread
    })
    price = price.to_json()
    print(price)


def begin_publish_price_data():
    pass
    instruments = oanda_client.get_account_instruments()
    instrument_array = ["EUR_USD"]
    for instrument in instruments:
        print(instrument.name)
        instrument_array.append(instrument.name)
        ask, bid, spread = 0, 0, 0
        inst = {
            "name": instrument.name,
            "displayName": instrument.displayName,
            "type": instrument.type,
            "marginRate": instrument.marginRate,
            "ask": ask,
            "bid": bid,
            "spread": spread
        }

    print('oanda_stream')
    oanda_stream.stream(publish_price, instruments=instrument_array)
