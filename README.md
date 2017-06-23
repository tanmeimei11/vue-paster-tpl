vue-paster-tpl
==

## 模版测试 (in-cli版本必须大于0.0.8)
Modify `hosts`
``` vim
10.10.105.86 npm.dot.com
```
``` bash 
$ npm i in-cli -g --registry http://10.10.105.86
```


## 技术栈

*   [webpack2](http://www.css88.com/doc/webpack2/)
*   [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)
*   [templates](https://github.com/vuejs/vue-cli#official-templates)

## 命令说明

* `npm run publish` 在Jenkins上发布当前分支 *仅支持mac、安装了docker 并且需要配置 JENKINS_TOKEN*
* `npm run tiny` 压缩文件夹，配置压缩文件夹 `config/index.js` 的 `build.imgRegx.compress`,默认`assets/img`文件夹
* `npm run qiniu` 上传文件夹，配置上传文件夹 `config/index.js` 的 `build.imgRegx.qiniu` ,默认`assets/qiniu`文件夹

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8018
npm run start

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