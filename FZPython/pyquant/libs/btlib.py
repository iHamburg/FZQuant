# -*- coding: utf-8 -*-


import backtrader as bt
import pyquant.utils.utils as utils
from pyquant.db_models import Symbol
from pyquant.models.symboldata import SymbolData
# from pyquant.strategies.fzstrategy import (CrossOver3)
from pyquant.config import cerebro as config

import datetime

def run_strategy(strategy, df, **kwargs):
    """
    运行策略

    :return:
    """
    # 时间周奇
    # tframes = dict(
    #     D=bt.TimeFrame.Days,
    #     W=bt.TimeFrame.Weeks,
    #     M=bt.TimeFrame.Months)


    cerebro = bt.Cerebro()

    cerebro.broker.setcash(config['cash'])
    cerebro.broker.setcommission(config['commission'])  # 真实佣金： 0.15%
    cerebro.addsizer(bt.sizers.PercentSizer, percents=10)  # 每次投入10%资金

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



def run_daily_strategy(strategy, df, **kwargs):
    """
    运行策略

    :return:
    """

    cerebro = bt.Cerebro()

    cerebro.broker.setcash(config['cash'])
    cerebro.broker.setcommission(config['commission'])  # 真实佣金： 0.15%
    cerebro.addsizer(bt.sizers.PercentSizer, percents=10)  # 每次投入10%资金

    # 开始时间
    if 'fromdate' in kwargs.keys():
        kwargs['fromdate'] = datetime.datetime.strptime(kwargs['fromdate'], '%Y-%m-%d')

    # 结束时间
    if 'todate' in kwargs.keys():
        kwargs['todate'] = datetime.datetime.strptime(kwargs['todate'], '%Y-%m-%d')

    data = bt.feeds.PandasData(dataname=df,**kwargs)

    cerebro.adddata(data)
    cerebro.addstrategy(strategy)

    # cerebro.addwriter(bt.WriterFile, csv=True)
    cerebro.addanalyzer(bt.analyzers.SharpeRatio) # sharperatio
    # cerebro.addanalyzer(SQN, _name='sqn')


    thestrats = cerebro.run()

    return thestrats

def run_strategy_by_symbol(strategy, symbol, **kwargs):
    """"""



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


    cerebro.addanalyzer(bt.analyzers.SharpeRatio)
    # cerebro.addanalyzer(SQN, _name='sqn')


    thestrats = cerebro.run()

    return thestrats


def test_run_strategy():
    strategy = strat.CrossOver2

    symbol = Symbol.get(17)
    sd = SymbolData(symbol,MySQLSource, fromdate='2017-01-01')
    df = sd.get_daily_price()

    # 运行策略
    result = run_daily_strategy(strategy, df, fromdate='2015-01-01')[0]

    print('Parameter: ', result.p._getkwargs())
    for item in result.analyzers:
        print(item.get_analysis())
    print('==================================================')

def test_run_strategy_mongo():
    strategy = strat.CrossOver2
    stock = Stock('002119')
    sd = SecurityData(stock, MongoSource, fromdate='2017-01-01')
    df = sd.get_data(
        output='df'
    )

    print(df)

    # 运行策略
    run_strategy(strategy, df)

def test_opt_strategy():
    strategy = strat.CrossOver2
    stock = Stock('002119')
    sd = SecurityData(stock, MongoSource, fromdate='2017-01-01')
    df = sd.get_data()

    # 调试策略
    strargs = dict(fast=range(5, 10))

    opt_strategy(strategy, df, strargs)

if __name__ == '__main__':

    print('=====Begin=======')
    from pyquant.models.securitydata import *
    import pyquant.strategies.fzstrategy as strat

    test_run_strategy()

    print('=====END=======')