#!/usr/bin/env python
# coding: utf8

import datetime
import pandas as pd
import backtrader as bt

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


def getdata(args):
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

def getIndex(code, **args):
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
    # df = ts.get_k_data('601933', index=False, start='1990-01-01')

if __name__ == '__main__':
    print("Begin")