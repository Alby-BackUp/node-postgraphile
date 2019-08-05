FROM node:12-alpine as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY . .
RUN yarn install --frozen-lockfile --production=true

EXPOSE 8080
CMD [ "node", "index.js" ]