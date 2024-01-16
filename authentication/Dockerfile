FROM node:19-bullseye
WORKDIR /clinic
COPY package.json start.js /authentication/
RUN npm install
RUN npm i -g nodemon
CMD [ "npm", "run", "dev" ]