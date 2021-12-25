# ========================================================
### STAGE 1: coping ###
FROM node:current-buster as coping

RUN mkdir /usr/src/app
WORKDIR /usr/src/app


ENV PATH /usr/src/app/node_modules/.bin:$PATH
# ENV NODE_OPTIONS=--openssl-legacy-provider

# COPY package.json /usr/src/app/package.json
COPY . /usr/src/app
RUN cat .bashrc >> /root/.bashrc

# ========================================================
### STAGE 2: instalation ###
FROM coping as installation

RUN yarn install
# RUN yarn install --silent
RUN yarn add react-scripts -g
# RUN yarn add react-scripts -g --silent

# ========================================================
### STAGE 3: build ###
FROM installation as build

ENV NODE_OPTIONS=--openssl-legacy-provider
RUN yarn build

# ========================================================
### STAGE 4: Production Environment ###
FROM nginx:alpine as production
COPY --from=build /usr/src/app/build  /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# =======================================>
# d build  --target coping -t front_coping .
# d run -it --name .... image /bin/bash