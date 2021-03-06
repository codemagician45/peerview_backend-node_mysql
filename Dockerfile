FROM node:8
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --loglevel=warn
COPY . .
