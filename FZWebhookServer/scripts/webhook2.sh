#!/usr/bin/env bash


echo "========= BEGIN webhook =========="


echo "restart FZSocketServer"
cd ../FZSocketServer
echo 'git pull'
git pull
npm install

echo 'pm2 restart fzsocket'
pm2 restart fzsocket

echo "restart FZServer"
cd ../FZServer
echo 'git pull'
git pull
npm install

echo 'pm2 restart fzserver'
pm2 restart fzserver



echo "======== END webhook =========="
