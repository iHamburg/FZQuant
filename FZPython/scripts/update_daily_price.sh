#!/usr/bin/env bash

echo 'begin update daily price'


cd /Users/zhangyiqing/FZQuant/FZPython

PYTHONIOENCODING=utf-8 /Users/zhangyiqing/anaconda3/envs/py3.5/bin/python demo/update_dailyprice.py

echo 'end of update daily price'