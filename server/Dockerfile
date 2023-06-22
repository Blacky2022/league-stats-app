FROM node:alpine

WORKDIR /api

RUN npm install -g nodemon@2.0.22

COPY package.json .

RUN npm install --unsafe-perm

COPY . .

CMD ["npm", "run", "start"]