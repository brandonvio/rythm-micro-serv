#!/bin/bash
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
echo "~~ begin docker build"
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
# aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 778477161868.dkr.ecr.us-west-2.amazonaws.com
aws ecr get-login-password --region us-west-2 --profile scratch-account-01 | docker login --username AWS --password-stdin 778477161868.dkr.ecr.us-west-2.amazonaws.com
docker build -t rythm-price-repository .
docker tag rythm-price-repository:latest 778477161868.dkr.ecr.us-west-2.amazonaws.com/rythm-price-repository:latest
docker push 778477161868.dkr.ecr.us-west-2.amazonaws.com/rythm-price-repository:latest
# docker run --rm -it -p 8000:8000 rythm-price-repository:latest .
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
echo "~~ end docker build"
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"