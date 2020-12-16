from kafka import KafkaConsumer

consumer = KafkaConsumer("rythm-oanda-price-stream-topic",
                         bootstrap_servers=["pkc-4kgmg.us-west-2.aws.confluent.cloud:9092"],
                         security_protocol="SASL_SSL",
                         sasl_mechanism="PLAIN",
                         sasl_plain_username="F4VZFM56I4KYTWJL",
                         sasl_plain_password="aSN7n8az1QVELvltlQMmcU+F73utDWVLx0PcHyFqL/PZHS6/CG631hJO1ULFhUTA")

for msg in consumer:
    print(msg)
