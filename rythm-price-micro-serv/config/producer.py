from kafka import KafkaProducer
import kafka
# from confluent_kafka import
# from kafak import


kafka_producer = KafkaProducer(
    bootstrap_servers=["pkc-4kgmg.us-west-2.aws.confluent.cloud:9092"],
    security_protocol="SASL_SSL",
    sasl_mechanism="PLAIN",
    sasl_plain_username="F4VZFM56I4KYTWJL",
    sasl_plain_password="aSN7n8az1QVELvltlQMmcU+F73utDWVLx0PcHyFqL/PZHS6/CG631hJO1ULFhUTA"
)

# topics = admin_client.describe_topics()
# print(topics)

# try:
#     topic_list = []
#     topic_list.append(NewTopic(name="rythm-oanda-price-stream-topic",
#                                num_partitions=1,
#                                replication_factor=3))

#     response = admin_client.create_topics(new_topics=topic_list, validate_only=False)
#     print(response)
# except kafka.errors.TopicAlreadyExistsError:
#     print("Topic already exists.")
