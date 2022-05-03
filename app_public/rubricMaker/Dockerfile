FROM node:16
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
EXPOSE 4200
CMD ["npm","start"]

#FROM node:carbon
#RUN mkdir -p /usr/src/app
#WORKDIR /usr/src/app
#COPY package*.json .
#RUN npm install
#COPY . .
#EXPOSE 4200
#CMD ["npm","start"]
