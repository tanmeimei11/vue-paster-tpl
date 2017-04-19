#!/bin/bash
IMAGE_NAME=vuetpl:0.0.1
DOCKERFILE=Dockerfile
DOCKER_USERNAME=vuetpl
DOCKER_PASSWOR=123qq123

if [ ! -f "$DOCKERFILE"  ]; then
  echo 'no Dockerfile found' 
  exit 1
fi

CONTAINER_IDS=`docker ps -a | grep $IMAGE_NAME | awk {'print $1'}` 
if [ -n "$CONTAINER_IDS" ]; then
  docker stop $CONTAINER_IDS
fi

#docker rm $CONTAINER_IDS
docker rmi $IMAGE_NAME
docker build . -t $IMAGE_NAME

#docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
#docker push
