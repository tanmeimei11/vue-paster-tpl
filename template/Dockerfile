#+++++++++++++++++++++++++++++++++++++++
# Dockerfile for vue project 
#+++++++++++++++++++++++++++++++++++++++
# version 0.1
# 拷贝工作目录的依赖包,并且进行安装，映射开发目录到容器
# docker build -t vuetpl .
# npm install --production 
# docker run -it -v ${PWD}:/usr/src/app -p 8090:8018  --name {{name}} vuetpl sh
# docker exec {{name}} npm run start
# docker exec {{name}} npm run build
FROM node:7-alpine

ENV APP_HOME=/usr/src/app \
    MODULES_DIR=/usr/src \  
    NODE_PATH=/usr/src/node_modules 

RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY package.json $MODULES_DIR/package.json
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN \
  cd $MODULES_DIR && \ 
  cnpm install 

EXPOSE 8018
CMD ["node"] 


