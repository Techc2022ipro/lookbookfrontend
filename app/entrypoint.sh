#!/bin/bash

echo "Running in NODE_ENV=$NODE_ENV"

echo "Running npm install ..."
npm install --verbose

echo "Running npm run ..."
npm start