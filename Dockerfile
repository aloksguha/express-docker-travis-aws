FROM node:alpine as builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm test
CMD [ "npm", "start" ]
EXPOSE 3000