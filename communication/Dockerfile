FROM node:19-bullseye
WORKDIR /communication
COPY package.json start.js /communication//
RUN npm install
RUN npm i -g nodemon
CMD [ "npm", "run", "dev" ]