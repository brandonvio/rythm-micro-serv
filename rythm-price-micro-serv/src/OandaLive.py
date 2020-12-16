from src.OandaStream import OandaStream
from src.OandaClient import OandaClient
from src.Environment import get_secret, get_env
from src.Types import Price
from kafka import KafkaProducer
import json

confluent_sasl_plain_username = get_secret("confluent_sasl_plain_username")
confluent_sasl_plain_password = get_secret("confluent_sasl_plain_password")
kafka_bootstrap_servers = get_env("bootstrap_servers")

kafka_producer = KafkaProducer(
    bootstrap_servers=[kafka_bootstrap_servers],
    security_protocol="SASL_SSL",
    sasl_mechanism="PLAIN",
    sasl_plain_username=confluent_sasl_plain_username,
    sasl_plain_password=confluent_sasl_plain_password,
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)


module_name = "OandaLive"
oanda_stream = OandaStream()
dep = OandaClient.get_dependencies()
oanda_client = OandaClient(*OandaClient.get_dependencies())


def publish_price(price_dict):
    price = Price.from_origin(price_dict)
    price_dict = price.to_dict()
    price_x = {}
    price_x["instrument"] = price_dict["instrument"]
    price_x["bid"] = price_dict["bid"]
    price_x["ask"] = price_dict["ask"]
    kafka_producer.send("rythm-oanda-price-stream-topic", value=price_x)
    kafka_producer.flush()
    print(price)


def begin_publish_price_data():
    print('oanda_stream')
    oanda_stream.stream(publish_price, instruments=None)
