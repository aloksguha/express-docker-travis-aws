FROM node:alpine as builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN ./node_modules/mocha/bin/mocha test --exit
CMD [ "npm", "start" ]
EXPOSE 3000