FROM node:alpine AS build
WORKDIR /app-data-base
COPY /react-rtmp-stream-server/ .
#RUN apk add curl
RUN npm install
CMD node app.js
#docker build -t rtmp-server .
#docker run -p 8000:8000 -p 1935:1935 rtmp-server
