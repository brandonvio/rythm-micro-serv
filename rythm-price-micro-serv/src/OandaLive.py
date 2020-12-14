from src.OandaStream import OandaStream
from src.OandaClient import OandaClient
from src.Types import Price
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers='ops-server.westus2.cloudapp.azure.com:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8'))


module_name = "OandaLive"
oanda_stream = OandaStream()
dep = OandaClient.get_dependencies()
oanda_client = OandaClient(*OandaClient.get_dependencies())

print("/----------------------------------------------/")
print(dep)
print("/----------------------------------------------/")


def publish_price(price_dict):
    price = Price.from_origin(price_dict)
    price_dict = price.to_dict()
    price_x = {}
    price_x["instrument"] = price_dict["instrument"]
    price_x["bid"] = price_dict["bid"]
    price_x["ask"] = price_dict["ask"]
    producer.send('forex-price-2', value=price_x)
    producer.flush()
    print(price)


def begin_publish_price_data():
    print('oanda_stream')
    oanda_stream.stream(publish_price, instruments=None)
