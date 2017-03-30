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

## docker dev

``` bash
# build container
docker run -v ${PWD}:/usr/src/app -p 8090:8018  --name {{name}} vuetpl sh

# serve with hot reload at localhost:8090
docker start {{name}} && docker exec {{name}} npm run start

# build for production with minification
docker start {{name}} && docker exec {{name}} npm run build
# open
http://<host>:8090
```
