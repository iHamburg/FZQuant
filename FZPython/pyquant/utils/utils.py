#!/usr/bin/env python
# coding: utf8

import datetime
import pandas as pd
import backtrader as bt
from pymongo import MongoClient
import tushare as ts
import  json
import time
import pyquant.libs.mongolib as mongolib

def printAnalysers(strats):
    """
     Params:

     """
    for strat in strats:
        print('--------------------------------------------------')
        if type(strat)==list: strat = strat[0]

        # strat = strat[0]  # 在opt中strat是列表
        print('Parameter: ', strat.p._getkwargs())
        for item in strat.analyzers:
            print(item.get_analysis())
        print('==================================================')


def get_csv_data(args):
    """
    需要去查找数据，如果没有的话就要从远程拉取
    :param args:
    :return:
    """
    dfkwargs = dict()

    if args.fromdate:
        fromdate = datetime.datetime.strptime(args.fromdate, '%Y-%m-%d')
        dfkwargs['fromdate'] = fromdate

    if args.todate:
        todate = datetime.datetime.strptime(args.todate, '%Y-%m-%d')
        dfkwargs['todate'] = todate


    df = pd.read_csv(args.data, parse_dates=True, index_col=0)

    print(df)
    return bt.feeds.PandasData(dataname=df, **dfkwargs)


def get_stock_df(code, **kwargs):
    """
    考虑到之后缓存的存在， 每次下载都全部下载，在生成datafeed的时候再处理

    :param code:
    fromdate: 2017-01-01
    todate:
    :return:
    """

    data = mongolib.get_stock(code)

    # 生成 Dataframes
    df = pd.DataFrame(data)

    # 如果没有该股票，先去下载该股票，然后返回
    if df.empty:
        try:
            _get_stock_from_tushare(code)
            return get_stock(code)
        except Exception as e:
            # 为什么第一次会有
            print('捕捉到异常', e)
            return


    del df['_id']
    del df['code']

    df['date'] = df['date'].astype('datetime64[ns]')

    df = df.set_index('date')

    cols = ['open', 'high', 'close', 'low', 'volume']
    df = df.ix[:, cols]
    # print(df)

    return df


def get_stock(code, **kwargs):
    """
    考虑到之后缓存的存在， 每次下载都全部下载，在生成datafeed的时候再处理

    :param code:
    fromdate: 2017-01-01
    todate:
    :return:
    """

    data = mongolib.get_stock(code)

    # 生成 Dataframes
    df = pd.DataFrame(data)

    # 如果没有该股票，先去下载该股票，然后返回
    if df.empty:
        try:
            _get_stock_from_tushare(code)
            return get_stock(code)
        except Exception as e:
            # 为什么第一次会有
            print('捕捉到异常', e)
            return


    del df['_id']
    del df['code']

    df['date'] = df['date'].astype('datetime64[ns]')

    df = df.set_index('date')

    cols = ['open', 'high', 'close', 'low', 'volume']
    df = df.ix[:, cols]
    # print(df)

    if 'fromdate' in kwargs.keys():
        kwargs['fromdate'] = datetime.datetime.strptime(kwargs['fromdate'], '%Y-%m-%d')

    if 'todate' in kwargs.keys():
        kwargs['todate'] = datetime.datetime.strptime(kwargs['todate'], '%Y-%m-%d')

    data = bt.feeds.PandasData(dataname=df,
                               **kwargs)

    return data

def looprun(interval=0,fcn=None, **kwargs):
    """

    :param interval: 时间间隔
    :param fcn: 函数名
    :param kwargs: 函数参数
    :return:
    """

    if interval > 0:
        while True:
            time.sleep(interval)
            fcn(**kwargs)
    else :
        fcn(**kwargs)

def get_index(code, **args):
    """
    需要去查找数据，如果没有的话就要从远程拉取
    :param args:
    :param code:
    :return:
    """
    print('code ', code, 'args', args)

    # 根据code去datas中找数据
    filePath = '../datas/index/'+code+'.csv'
    print('filepath', filePath)

    df = pd.read_csv(filePath, parse_dates=True, index_col=0)

    return bt.feeds.PandasData(dataname=df, **args)

def _get_stock_from_tushare(code):
    """
    从 tushare 下载 股票 日数据
    :param code:
    :return:
    """
    table = 's'+code

    df = ts.get_k_data(code, index=False)
    print('从tushare下载',code)
    # 如果下载不到数据，扔出异常
    if df.empty:
        raise Exception("Tushare下载数据异常")


    conn = MongoClient('localhost', 27017)
    db = conn.fzquant
    table = db[table]

    table.insert(json.loads(df.to_json(orient='records')))
    conn.close()


if __name__ == '__main__':
    print("Begin")
    # print(get_stock('600191'))
    print(get_stock_df('600191'))


    # get_stock_from_tushare('600192')

    print('===== ENDE ====')