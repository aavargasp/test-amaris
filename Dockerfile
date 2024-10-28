# syntax=docker/dockerfile:1

FROM node:23.1.0-alpine3.20 AS install
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

FROM node:23.1.0-alpine3.20 AS run
WORKDIR /usr/src/app
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]