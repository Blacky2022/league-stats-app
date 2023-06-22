FROM node:alpine

WORKDIR /api

COPY package.json .

RUN npm install --unsafe-perm

COPY . .

CMD ["npm", "run", "start"]