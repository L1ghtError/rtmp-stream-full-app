#STEP 1 "react js"
FROM node:lts-buster-slim AS build
WORKDIR /app
COPY /react-rtmp-stream-client/package.json ./
RUN npm install
#RUN apk --no-cache add curl
COPY /../react-rtmp-stream-client/ .
RUN npm run build 
#STEP 2 "Nginx server"
FROM nginx:alpine AS prod-stage
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
