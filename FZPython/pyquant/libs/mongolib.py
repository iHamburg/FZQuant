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

def get_data(code, index=False):
    """

    :param code:
    :param index:
    :return: list
    """

    col = db[_get_data_collection_name(code,index)]
    cursor = col.find()

    # 删除_id

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
    print(get_data('600193'))


    print('===== ENDE ====')