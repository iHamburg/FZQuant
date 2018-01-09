# -*- coding: utf-8 -*-
##
# @brief 数据控制模块

import datetime
import pandas as pd
import backtrader as bt
import tushare as ts
import pyquant.libs.mongolib as mongolib
import pyquant.libs.tusharelib as tusharelib

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

    # print(df)
    return bt.feeds.PandasData(dataname=df, **dfkwargs)


def get_df_data(code,index=False, **kwargs):
    """
    考虑到之后缓存的存在， 每次下载都全部下载，在生成datafeed的时候再处理

    :param code:
    fromdate: 2017-01-01
    todate:
    :return:
    """

    # 从mongodb下载所有数据
    # print('begin getstock')
    data = mongolib.get_data(code,index)
    # print('after getstock',data)
    # 生成 Dataframes
    df = pd.DataFrame(data)

    # 如果mongodb没有拉到数据
    if df.empty:
        # 从tushare 下载 数据

        df = tusharelib.get_df(code, index)

        # 如果从tushare里没有拉回数据
        if df.empty:
            return

        # 插入mongodb
        mongolib.insert_data(code, df,index)

    df = _get_df_from_mongo_for_bt(df)

    return df

def _get_df_from_mongo_for_bt(df):
    """
    处理从mongodb下载的df，转换成bt能够识别

    TODO: 数据的转换可以放在数据类中

    :param df:
    :return:
    """

    # print('======== _process_df_from_mongo =========')
    if '_id' in df:
        del df['_id']

    if '_code' in df:
        del df['code']

    df['date'] = df['date'].astype('datetime64[ns]')

    df = df.set_index('date')

    cols = ['open', 'high', 'close', 'low', 'volume']
    df = df.ix[:, cols]

    return df

