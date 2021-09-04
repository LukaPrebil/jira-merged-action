FROM node:14-alpine

RUN apk add --no-cache bash

ENV NODE_ENV=production

ADD package.json .
ADD package-lock.json .
ADD src/index.js src/
ADD src/helpers.js src/

RUN npm install

ADD entrypoint.sh .
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]