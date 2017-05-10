vue-paster-tpl
==

## 技术栈

*   [webpack2](http://www.css88.com/doc/webpack2/)
*   [koa2](http://koajs.com/)
*   [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)
*   [templates](https://github.com/vuejs/vue-cli#official-templates)

## 配置说明、命令说明

* `npm run tiny` 压缩文件夹，配置压缩文件夹 `config/index.js` 的 `build.imgRegx.compress`,默认`assets/img`文件夹
* `npm run qiniu` 上传文件夹，配置上传文件夹 `config/index.js` 的 `build.imgRegx.qiniu` ,默认`assets/qiniu`文件夹

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8018
npm run dev

# build for production with minification
npm run build
```

## docker dev

``` bash
# install prod dependencies
npm install --prod
# serve with hot reload at localhost:8018
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