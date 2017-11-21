#!/usr/bin/env bash


git pull
git add -A
git commit -a -m "update client"


cd FZQuantClient
npm install
npm run build

cp dist/* ../FZServer/public