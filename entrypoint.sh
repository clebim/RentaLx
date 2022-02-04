#!/bin/bash

npm run migration:run
npm run seed:run:prod
echo 'Starting server...'
npm run start
