FROM node:20.2.0

WORKDIR /workspaces/poke-be
COPY package.json .

RUN npm install

COPY . ./

CMD npm run start:dev