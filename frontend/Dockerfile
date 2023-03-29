FROM node:16

WORKDIR /server


RUN npm i
COPY package.json /server
COPY . /server

EXPOSE 3000

CMD [ "npm", "run", "start" ]