FROM node:16



RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
EXPOSE 3000
CMD ["node","./app.js"]

#FROM node:16
#
## Create app directory
#WORKDIR /usr/src/app
#
## Install app dependencies
## A wildcard is used to ensure both package.json AND package-lock.json are copied
## where available (npm@5+)
#COPY package*.json ./
#
## Install any needed packages
#RUN npm install
#
## Bundle app source
#COPY . .
#
## Stage 2 build for creating smaller image
#FROM node:carbon-alpine
#WORKDIR /usr/src/app
#
#COPY --from=builder /usr/src/app .
#
#EXPOSE 3000
#
#CMD ["node","./app.js"]