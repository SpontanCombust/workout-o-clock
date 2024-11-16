#!/bin/bash

source ../.env
cd ../api/

java -jar \
    -Xdebug \
    -Xrunjdwp:server=y,transport=dt_socket,suspend=n,address=5005 \
    -DDB_NAME=$DB_NAME \
    -DDB_APP_PASSWORD=$DB_APP_PASSWORD \
    -DAPI_DB_HOST=$API_DB_HOST \
    -DAPI_JWT_SECRET_KEY=$API_JWT_SECRET_KEY \
    -Dspring.profiles.active=$API_PROFILE \
    $(find -name *.jar)

cd -