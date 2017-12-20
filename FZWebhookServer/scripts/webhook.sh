#!/usr/bin/env bash

echo ""
echo "========= BEGIN webhook =========="


git pull
npm install

pm2 restart all



echo "======== END webhook =========="
