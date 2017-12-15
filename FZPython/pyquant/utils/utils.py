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

    dfkwargs = dict()

    if args.fromdate:
        fromdate = datetime.datetime.strptime(args.fromdate, '%Y-%m-%d')
        dfkwargs['fromdate'] = fromdate

    if args.todate:
        todate = datetime.datetime.strptime(args.todate, '%Y-%m-%d')
        dfkwargs['todate'] = todate


    df = pd.read_csv(args.data, parse_dates=True, index_col=0)

    return bt.feeds.PandasData(dataname=df, **dfkwargs)