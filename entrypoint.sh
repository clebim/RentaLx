#!/bin/bash

echo 'Starting server...'
npm run migration:run
npm run seed:run:prod
npm run start
