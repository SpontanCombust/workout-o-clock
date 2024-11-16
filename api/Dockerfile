FROM maven:3.8-openjdk-17 AS build_img

COPY . /tmp/api
RUN cd /tmp/api && \
    mvn install -DskipTests


FROM openjdk:17

# make these available in docker-compose or when launching the container directly
ENV DB_NAME=woc_dev
ENV DB_APP_PASSWORD=woc_app_pass
ENV API_DB_HOST=localhost
ENV API_JWT_SECRET_KEY=secretkey
ENV API_PROFILE=dev

COPY --from=build_img /tmp/api/target/*.jar /woc-api.jar
ENTRYPOINT java -jar \
    -DDB_NAME=$DB_NAME \
    -DDB_APP_PASSWORD=$DB_APP_PASSWORD \
    -DAPI_DB_HOST=$API_DB_HOST \
    -DAPI_JWT_SECRET_KEY=$API_JWT_SECRET_KEY \
    -Dspring.profiles.active=$API_PROFILE \
    /woc-api.jar

EXPOSE 8080