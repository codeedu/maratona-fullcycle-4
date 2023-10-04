FROM node:14.21.3-alpine3.17

RUN apk add --no-cache bash git

RUN touch /home/node/.bashrc | echo "PS1='\w\$ '" >> /home/node/.bashrc

RUN npm i -g @nestjs/cli@7.4.1

USER node

WORKDIR /home/node/app
