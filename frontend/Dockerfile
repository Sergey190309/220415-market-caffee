## pull official base image
FROM node:buster-slim

## set working directory
WORKDIR /frontend

# update and upgrade the instance
RUN apt update && apt -y upgrade

## add `/app/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH

## install app dependencies
COPY package.json ./
# COPY package-lock.json ./
COPY yarn.lock ./
# RUN npm install --silent
RUN yarn
# RUN npm install react-scripts@3.4.1 -g --silent
# RUN yarn add react-scripts

## add app
COPY . ./

## start app
# CMD ["npm", "start"]
CMD ["yarn", "start"]
