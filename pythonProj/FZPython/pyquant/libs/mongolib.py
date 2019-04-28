#!/usr/bin/env python
# coding: utf8

from pymongo import MongoClient
from pyquant.config import mongodb as config
import pandas as pd
import json
import pydash

conn = MongoClient(config['host'], config['port'])

db = conn.fzquant


def insert_data(col_name, df):
    """
    插入数据

    TODO: 需要去重

    :param code: 股票代码
    :param df: dataframe
    :return:
    """
    # 获取collection
    col = db[col_name]
    # 插入数据
    print('开始向',col_name,'插入数据')
    col.insert(json.loads(df.to_json(orient='records')))

def get_data(col_name, output='df', **kwargs):
    """
    从 mongodb 下载 股票 日数据

    mongolib需要知道column

    :param col_name:
    :return:
            list: OCLH
    """
    query = {}
    date_query = {}
    if 'fromdate' in kwargs.keys() and kwargs['fromdate']:
        date_query['$gte'] = kwargs['fromdate']

    if 'todate' in kwargs.keys() and kwargs['todate']:
        date_query['$lt'] = kwargs['todate']

    if date_query:
        query['date'] = date_query

    # print('query', query)

    col = db[col_name]

    cursor = col.find(query)

    if output == 'df':
        df = pd.DataFrame(list(cursor))
        del df['_id']
        del df['code']
        df['date'] = df['date'].astype('datetime64')
        df = df.set_index('date')
        cols = ['open', 'high', 'close', 'low', 'volume']
        df = df.ix[:, cols]
        return df
    elif output == 'obj':
        obj_list = list(cursor)

        return [pydash.omit(item, '_id','code') for item in obj_list]

    elif output == 'list':
        obj_list = list(cursor)
        return   [[ item['date'],item['open'], item['close'],item['low'],item['high'],item['volume']] for item in obj_list]



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
    print(get_data('s002119', output='obj'))
    print('===== ENDE ====')