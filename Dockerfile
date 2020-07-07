FROM --platform=amd64 node:14.4.0

COPY . /app
WORKDIR /app

RUN npm install
CMD node app.js
