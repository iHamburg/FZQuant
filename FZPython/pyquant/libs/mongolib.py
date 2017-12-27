#!/usr/bin/env python
# coding: utf8

from pymongo import MongoClient
from pyquant.configs.configs import mongodb as config
import json

conn = MongoClient(config['host'], config['port'])
db = conn.fzquant

def _get_data_collection_name(code, index=False):
    if index:
        return 'i'+code
    else:
        return 's'+code

def insert_data(code, df,index=False):
    """
    插入每日股票信息

    TODO: 需要去重

    :param code: 股票代码
    :param df: dataframe
    :return:
    """
    # 获取collection
    col = db[_get_data_collection_name(code,index)]
    # 插入数据

    col.insert(json.loads(df.to_json(orient='records')))

def get_data(col_name, **kwargs):
    """

    :param code:
    :param index:
    :param fromdate:
    :return: list
    """

    query = {}
    date_query = {}
    if 'fromdate' in kwargs.keys() and kwargs['fromdate']:
        date_query['$gte'] = kwargs['fromdate']

    if 'todate' in kwargs.keys() and kwargs['todate']:
        date_query['$lt'] = kwargs['todate']

    if date_query:
        query['date'] = date_query

    print('query', query)

    col = db[col_name]

    cursor = col.find(query)

    return list(cursor)


def get_security(security):
    """
    根据security生成query，然后查询mongodb

    :param security: Security
    :return: list
    """

    query = {}
    date_query = {}

    if security.fromdate:
        date_query['$gte'] = security.fromdate

    if security.todate:
        date_query['$lt'] = security.todate

    if date_query:
        query['date'] = date_query

    # print('query', query)
    col = db[security.collection_name]
    cursor = col.find(query)

    return list(cursor)


def insertTickData(df):
    """
    插入盘口数据
    :param df:
    :return:
    """

    col = db.tickData
    col.insert(json.loads(df.to_json(orient='records')))

if __name__ == '__main__':
    print("Begin")


    print('===== ENDE ====')