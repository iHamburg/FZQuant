#!/usr/bin/env bash
# 当前项目是  FZServer

echo "begin webhook"
git pull

npm install

npm run forever

echo "end webhook"
