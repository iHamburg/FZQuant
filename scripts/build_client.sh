#!/usr/bin/env bash

echo 'Begin commit already existed changes'
git pull
git add -A
git commit -a -m "update client"


cd FZQuantClient
npm install
npm run build

cp -r dist/* ../FZServer/public

git add -A
git commit -a -m "update client"
git push

echo 'End git push'