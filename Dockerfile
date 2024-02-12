FROM node:14-alpine

RUN mkdir -p /user/src/app

WORKDIR /user/src/app

COPY package.json yarn.lock ./

RUN yarn install --production=true

ADD . .

EXPOSE 8080

CMD [ "yarn", "start" ]
