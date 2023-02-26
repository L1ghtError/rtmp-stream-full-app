# rtmp-stream-full-app
### Application that combines [react-rtmp-stream-client](https://github.com/L1ghtError/react-rtmp-stream-client) and [react-rtmp-stream-server](https://github.com/L1ghtError/react-rtmp-stream-server)
# launch instraction

# way 1 (docker-compose):

install this repo with:

```bash
git clone --recursive -j8 https://github.com/L1ghtError/rtmp-stream-full-app
docker-compose build
docker-compose up
```

# way 2 (kubernetes):

```bash
kubectl apply -f server-deployment.yml
kubectl apply -f client-deployment.yml
```

# way 3 (manual by dockerfile):

```bash
git clone --recursive -j8 https://github.com/L1ghtError/rtmp-stream-full-app
cd react-rtmp-stream-server-docker
docker build -t lighterror/react-rtmp-stream-server .
docker run -p 8000:8000 -p 1935:1935  lighterror/react-rtmp-stream-server
cd ../react-rtmp-stream-client
docker build -t lighterror/react-rtmp-stream-client .
docker run -p 3000:80 lighterror/react-rtmp-stream-client
```

# way 3 (manual by "native" instruments):

```bash
git clone --recursive -j8 https://github.com/L1ghtError/rtmp-stream-full-app
cd react-rtmp-stream-server-docker/react-rtmp-stream-client
npm install
npm run dev
cd ../react-rtmp-stream-server-docker\react-rtmp-stream-server
npm install
node app.js
```
