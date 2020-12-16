import requests
import json
import urllib.parse
from kafka import KafkaProducer
from src.EnvUtil import EnvUtil


kafka_sasl_plain_username = EnvUtil.get_secret("confluent_sasl_plain_username")
kafka_sasl_plain_password = EnvUtil.get_secret("confluent_sasl_plain_password")
kafka_bootstrap_servers = EnvUtil.get_env("KAFKA_BOOTSTRAP_SERVERS")
kafka_topic = EnvUtil.get_env("KAFKA_TOPIC")
oanda_account_id = EnvUtil.get_env("OANDA_DEFAULT_ACCOUNT")
oanda_stream_domain = EnvUtil.get_env("OANDA_STREAM_DOMAIN")
oanda_token = EnvUtil.get_secret("OANDA_TOKEN")
oanda_instruments = urllib.parse.quote_plus(EnvUtil.get_env("INSTRUMENTS"))


kafka_producer = KafkaProducer(
    bootstrap_servers=[kafka_bootstrap_servers],
    security_protocol="SASL_SSL",
    sasl_mechanism="PLAIN",
    sasl_plain_username=kafka_sasl_plain_username,
    sasl_plain_password=kafka_sasl_plain_password,
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)


def stream():
    headers = {"Authorization": f"Bearer {oanda_token}"}
    url = f"https://{oanda_stream_domain}/v3/accounts/{oanda_account_id}/pricing/stream?instruments={oanda_instruments}"
    price_stream = requests.get(url, stream=True, headers=headers)
    print(">>>> pricing service online! <<<<<")
    for line in price_stream.iter_lines():
        if line:
            line = json.loads(line.decode('utf-8'))
            if line["type"] == "PRICE":
                publish_price_to_kafka(line)


def publish_price_to_kafka(line):
    price_dict = price_todict(line)
    kafka_producer.send(kafka_topic, value=price_dict)
    kafka_producer.flush()
    print(price_dict["version"], price_dict["instrument"], price_dict["bid"], price_dict["ask"])


def price_todict(line):
    ask = float(line["asks"][0]["price"])
    bid = float(line["bids"][0]["price"])
    mid = round(((ask + bid) / 2), 5)
    spread = round((ask - bid) * 10000, 2)
    return {
        "version": "1.01212244:802",
        "instrument": line["instrument"],
        "status": line["status"],
        "time": str(line["time"]),
        "tradeable": bool(line["tradeable"]),
        "ask": ask,
        "bid": bid,
        "mid": mid,
        "spread": spread,
        "ask_liquidity": int(line["asks"][0]["liquidity"]),
        "bid_liquidity": int(line["bids"][0]["liquidity"]),
        "ask_closeout": float(line["closeoutAsk"]),
        "bid_closeout": float(line["closeoutBid"])
    }
