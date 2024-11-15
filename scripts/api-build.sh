#!/bin/bash

source ../.env
cd ../api/

mvn install \
    -DDB_NAME=$DB_NAME \
    -DDB_APP_PASSWORD=$DB_APP_PASSWORD \
    -DAPI_DB_HOST=$API_DB_HOST \
    -DAPI_JWT_SECRET_KEY=$API_JWT_SECRET_KEY

cd -