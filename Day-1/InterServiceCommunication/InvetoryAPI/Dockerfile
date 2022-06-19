FROM node:18
WORKDIR /inventory-api
COPY package.json .
RUN npm install
COPY . .
CMD npm start