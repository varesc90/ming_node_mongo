FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silence

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]