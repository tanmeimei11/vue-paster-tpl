#+++++++++++++++++++++++++++++++++++++++
# version 0.1
# Dockerfile for vue tpl  
# BUILD-USING: docker build -t vuetpl . 
# RUN-USING: docker run -it -v ${PWD}:/usr/src/app -p 8090:8018 --name {{name}} vuetpl sh
#+++++++++++++++++++++++++++++++++++++++
FROM node:7-alpine

ENV APP_HOME=/usr/src/app \
    MODULES_DIR=/usr/src    
ENV NODE_PATH=$MODULES_DIR/node_modules 

# 拷贝工作目录的依赖包,并且进行安装
COPY package.json $MODULES_DIR/package.json
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN \
  cd $MODULES_DIR && \ 
  cnpm install 

WORKDIR $APP_HOME
EXPOSE 8018

CMD ["node"] 
