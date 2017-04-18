#!/bin/bash
IMAGE_NAME=vuetpl:vue-paster-tpl
DOCKERFILE=Dockerfile

if [ ! -f "$DOCKERFILE"  ]; then
  echo 'no Dockerfile found' 
fi

docker rmi $IMAGE_NAME
docker build . -t $IMAGE_NAME

# docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
# docker push
