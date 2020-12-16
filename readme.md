# Rythm Price Microservice

This project is the pricing microservice of the rythm application.
There are two projects in this repo, "rythm-price-micro-serv" and "rythm-price-micro-serv-cdk".
### rythm-price-micro-serv
The "rythm-price-micro-serv" is the Python application that consumes a HTTP pricing stream from the Oanda API and sends the received messages to a Kafka Topic hosted on the Confluent Cloud platform. The Python application is hosted in Docker and ran in ECS Fargate Task on AWS.

### rythm-price-micro-serv-cdk
The "rythm-price-micro-serv-cdk" project is the CDK application that provisions the infrastructure for the application.

![Architecture](https://raw.githubusercontent.com/brandonvio/trackerp/master/docs/arch.png)
