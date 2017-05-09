vue-paster-tpl
==

## 技术栈

*   [webpack2](http://www.css88.com/doc/webpack2/)
*   [koa2](http://koajs.com/)
*   [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)
*   [templates](https://github.com/vuejs/vue-cli#official-templates)


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## docker dev

``` bash
# install prod dependencies
npm install --prod
# serve with hot reload at localhost:8090
npm run dstart

# build for production with minification
npm run dbuild

# open
http://<host>:8018
```

## Build Public (only mac)

```bash

# add jenkis token 
npm config set JENKINS_TOKEN <user>:<token>

# publish (must not master/develop branch)
npm run publish
```