FROM 778477161868.dkr.ecr.us-west-2.amazonaws.com/node-12-20-0-alpine:latest

WORKDIR /usr/rythm-socketio-serv
COPY ./build/ .
ENTRYPOINT ["node", "Server.js"]