FROM node:lts-alpine as build-stage

# Lmao if anyone puts this in production that would be amazing. If anyone sees this I would be surprised.

LABEL maintainer="Gabe Dunn <gabe.dunn@shaw.ca>"

WORKDIR /app

# copy package.json and yarn.lock to leverage caching
COPY package*.json *.lock ./

# install dependencies
RUN yarn

# copy over the working files
COPY . .

# start the development
CMD ["yarn", "start"]

# TODO: add a second stage/new container for reverse proxy

# run a second stage to serve the static files
#FROM nginx:stable-alpine as production-stage

# copy the files from the build-stage
#COPY --from=build-stage /app/dist /usr/share/nginx/html

# start the nginx development
#CMD ["nginx", "-g", "daemon off;"]
