# {{ name }}

> {{ description }}

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Build Public (only mac)

```bash

# add jenkis token 
npm config set JENKINS_TOKEN <user>:<token>

# publish (must not master/develop branch)
npm run publish
```

## docker dev

``` bash
# pull images [*must*]
docker pull jiuyan/vuetpl:0.0.1

# install prod dependencies
npm run --prod
# serve with hot reload at localhost:8090
npm run dstart

# build for production with minification
npm run dbuild

# open
http://<host>:8018
```