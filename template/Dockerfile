#+++++++++++++++++++++++++++++++++++++++
# Dockerfile for vue project 
# 拷贝工作目录的依赖包,并且进行安装，映射开发目录到容器
#+++++++++++++++++++++++++++++++++++++++
# version 0.1
FROM node:7-alpine

ENV APP_HOME=/usr/src/app \
    MODULES_DIR=/usr/src    
ENV NODE_PATH=$MODULES_DIR/node_modules 

# node_modules
COPY package.json $MODULES_DIR/package.json
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN \
  cd $MODULES_DIR && \ 
  cnpm install 

WORKDIR $APP_HOME
EXPOSE 8018

CMD ["node"] 

# docker build -t vuetpl .
# npm install --production 
# docker run -it -v ${PWD}:/usr/src/app -p 8090:8018  --name {{name}} vuetpl sh
# docker exec {{name}} npm run start
# docker exec {{name}} npm run build
