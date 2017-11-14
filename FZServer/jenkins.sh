#!/bin/bash

# 推送到远程仓库
cd ../../CloudStoreMerchantServer
git pull

# 把当前目录下的文件（除了public）复制到本地仓库 (也可以先删除public文件夹）
rsync -vaP --exclude="public" ../04_CloudMerchant_Vue/server/* .


git add -A
git commit -a -m "update service"
git push

# TODO: 去jenkins按发版

