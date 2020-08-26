#!/bin/bash

cd /home/node/app

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

npm install
npm run start:dev


