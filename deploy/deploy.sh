#!/bin/sh
PROJECT="${PWD##*/}"
echo "Deploying ${PROJECT} into ${ENV}"
case $ENV in
    "production")
        SERVER=desarrollo@192.168.222.4;
        DEST="/disco/services/${PROJECT}";
    ;;
    "testing")
        SERVER=desarrollo@172.17.21.5;
        DEST="/data/services/public/${PROJECT}";
    ;;
    *)
        echo "Can't deploy. ${ENV} is an invalid environment"
        exit 1
    ;;
esac
yarn build
rsync -avrmzR -e ssh --exclude-from='deploy/exclude-files.txt' * $SERVER:$DEST
ssh $SERVER "cd ${DEST} && docker-compose down --remove-orphans && docker-compose up -d --build"
