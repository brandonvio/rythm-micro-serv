#!/bin/bash
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
echo "~~ begin docker build"
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 778477161868.dkr.ecr.us-west-2.amazonaws.com
docker build -t rythm-socketio-serv .
docker tag rythm-socketio-serv:latest 778477161868.dkr.ecr.us-west-2.amazonaws.com/rythm-socketio-serv:latest
# docker push 778477161868.dkr.ecr.us-west-2.amazonaws.com/rythm-socketio-serv:latest
docker run --rm -it -p 3000:3000 rythm-socketio-serv:latest .
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
echo "~~ end docker build"
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"