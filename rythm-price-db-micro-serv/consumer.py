from kafka import KafkaConsumer

consumer = KafkaConsumer('forex-price-2',
                         group_id='my-app-xyz',
                         bootstrap_servers='ops-server.westus2.cloudapp.azure.com:9092')

for msg in consumer:
    print(msg)
