#!/bin/bash

echo "Running webpack to start buliding"

npm run build

echo "Finish buliding, start upload static files to Qiniu"

node upload.js

echo "Finish upload static files to Qiniu, start upload files to VPS" 


scp build/index.html root@139.162.47.118:/root/btc/public

echo "Finish upload files to VPS, clean up the build folder"

rm -rf build

echo "Finish all the deploy process!"

