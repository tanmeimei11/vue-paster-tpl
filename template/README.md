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
# add gitlab token 
npm config set GIT_TOKEN <token>

# add jenkis token 
npm config set JENKINS_TOKEN <user>:<token>

# publish (must not master/develop branch)
npm run publish
```

## docker dev

``` bash
# pull images [*must*]
docker pull registry.cn-hangzhou.aliyuncs.com/ddot/vuetpl

# serve with hot reload at localhost:8090
npm run dstart

# build for production with minification
npm run dbuild

# open
http://<host>:8090

# build container and attach
docker run -it -v ${PWD}:/usr/src/app -p 8090:8018  --name {{name}} c94d71f7deff sh
```
