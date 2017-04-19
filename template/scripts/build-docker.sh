#!/bin/bash
IMAGE_NAME=inVue:vue-paster-tpl
DOCKERFILE=Dockerfile

if [ ! -f "$DOCKERFILE"  ]; then
  echo 'no Dockerfile found' 
  exit(1)
fi

CONTAINER_IDS=`docker ps -a | grep $IMAGE_NAME | awk {'print $1'}` 
docker stop $CONTAINER_IDS
#docker rm $CONTAINER_IDS
docker rmi $IMAGE_NAME
docker build . -t $IMAGE_NAME

# docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
# docker push
