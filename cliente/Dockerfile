FROM node:carbon

RUN mkdir app

ADD . /app
WORKDIR /app

RUN npm install
RUN npm -g install nodemon

CMD [ "npm", "start" ]