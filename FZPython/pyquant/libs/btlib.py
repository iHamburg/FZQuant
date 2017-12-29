# -*- coding: utf-8 -*-
##


import backtrader as bt
import pyquant.utils.utils as utils

# from pyquant.strategies.fzstrategy import (CrossOver3)

import datetime

def run_strategy(strategy, df, **kwargs):
    """

    :return:
    """

    # 时间周奇
    tframes = dict(
        D=bt.TimeFrame.Days,
        W=bt.TimeFrame.Weeks,
        M=bt.TimeFrame.Months)


    cerebro = bt.Cerebro()

    cerebro.broker.setcash(1000000)
    cerebro.broker.setcommission(commission=0.0015)  # 真实佣金： 0.15%
    cerebro.addsizer(bt.sizers.PercentSizer, percents=10)  # 每次投入10%资金

    fromdate = '2017-01-01'
    # 开始时间
    if 'fromdate' in kwargs.keys():
        kwargs['fromdate'] = datetime.datetime.strptime(kwargs['fromdate'], '%Y-%m-%d')

    # 结束时间
    if 'todate' in kwargs.keys():
        kwargs['todate'] = datetime.datetime.strptime(kwargs['todate'], '%Y-%m-%d')

    data = bt.feeds.PandasData(dataname=df,**kwargs)

    cerebro.adddata(data)
    # 时间周期
    # if args.ktype == 'D':
    #     cerebro.adddata(data)
    # else:
    #     # Resample the data
    #     cerebro.resampledata(data,timeframe=tframes[args.ktype])


    cerebro.addstrategy(strategy)


    # cerebro.addanalyzer(bt.analyzers.SharpeRatio, _name='sharpratio')
    # cerebro.addanalyzer(SQN, _name='sqn')

    # cerebro.run()
    thestrats = cerebro.run()

    return thestrats

    # utils.printAnalysers(thestrats)



def opt_strategy(strategy, df, strargs, **kwargs):
    """
    调试strategy的参数
    :return:
    """

    # 时间周奇
    tframes = dict(
        D=bt.TimeFrame.Days,
        W=bt.TimeFrame.Weeks,
        M=bt.TimeFrame.Months)


    cerebro = bt.Cerebro()

    cerebro.broker.setcash(1000000)
    cerebro.broker.setcommission(commission=0.0015)  # 真实佣金： 0.15%
    cerebro.addsizer(bt.sizers.PercentSizer, percents=10)  # 每次投入10%资金

    fromdate = '2017-01-01'
    # 开始时间
    if 'fromdate' in kwargs.keys():
        kwargs['fromdate'] = datetime.datetime.strptime(kwargs['fromdate'], '%Y-%m-%d')

    # 结束时间
    if 'todate' in kwargs.keys():
        kwargs['todate'] = datetime.datetime.strptime(kwargs['todate'], '%Y-%m-%d')


    data = bt.feeds.PandasData(dataname=df,**kwargs)

    cerebro.adddata(data)
    # 时间周期
    # if args.ktype == 'D':
    #     cerebro.adddata(data)
    # else:
    #     # Resample the data
    #     cerebro.resampledata(data,timeframe=tframes[args.ktype])



    cerebro.optstrategy(strategy,
                        **strargs
                        # fast=range(5, 10),

                        # slow=range(10,12)
                        )


    # cerebro.addanalyzer(bt.analyzers.SharpeRatio, _name='sharpratio')
    # cerebro.addanalyzer(SQN, _name='sqn')

    # cerebro.run()
    thestrats = cerebro.run()

    return thestrats

if __name__ == '__main__':

    print('=====Begin=======')
    from pyquant.models.securitydata import *
    import pyquant.strategies.fzstrategy as strat

    strategy = strat.CrossOver2
    stock = Stock('002119')
    sd = SecurityData(stock, MongoSource, fromdate='2017-01-01')
    df = sd.get_data()

    # 运行策略
    # run_strategy(strategy, df)

    # 调试策略
    strargs = dict(fast=range(5,10))
    opt_strategy(strategy, df, strargs)

    print('=====END=======')