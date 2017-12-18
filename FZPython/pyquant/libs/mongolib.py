#!/usr/bin/env python
# coding: utf8

from pymongo import MongoClient
conn = MongoClient('localhost', 27017)


def insertTickData(json):
    """插入数据"""