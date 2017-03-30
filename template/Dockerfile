# version 0.1
# 拷贝工作目录的依赖包,并且进行安装，映射开发目录到容器
# docker build -t vuetpl .
# npm install --production 
# docker run -it -v ${PWD}:/usr/src/app -p 8090:8018  --name {{name}} vuetpl sh
# docker exec {{name}} npm run start
# docker exec {{name}} npm run build
FROM node:7-alpine
RUN mkdir -p /usr/src/app
COPY package.json /usr/src/package.json
RUN cd /usr/src && npm install
WORKDIR /usr/src/app
EXPOSE 8018
CMD npm start


