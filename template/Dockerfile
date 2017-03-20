
# version 0.1
# 拷贝工作目录，重新安装依赖包，然后启动
# docker build -t promo/vuetpl .
# docker run -d -p 8090:8018 promo/vuetpl
# FROM promo/node:latest
# RUN mkdir -p /usr/src/app
# COPY . /usr/src/app
# WORKDIR /usr/src/app
# RUN rm -rf node_modules
# RUN npm install
# EXPOSE 8018
# CMD npm start
# --------------------

# version 0.2
# 拷贝工作目录的依赖包,并且进行安装，映射开发目录到容器
# docker build -t promo/vuetpl .
# npm install --production
FROM promo/node:latest
RUN mkdir -p /usr/src/app
COPY package.json /usr/src/package.json
RUN cd /usr/src && npm install
WORKDIR /usr/src/app
EXPOSE 8018
CMD npm start


