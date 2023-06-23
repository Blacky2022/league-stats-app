FROM node:alpine

WORKDIR /api


COPY package.json .

RUN npm install -g npm@latest

RUN npm install 

COPY . .

CMD ["npm", "run", "start"]