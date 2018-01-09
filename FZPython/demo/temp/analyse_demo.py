#!/usr/bin/env python
# 分析股票数据

#=========== 实现脚本运行操作 ============
import os
import sys
module_path = os.path.abspath(os.getcwd())
if module_path not in sys.path:
    sys.path.append(module_path)
#=========== 实现脚本运行操作 ============


import backtrader as bt
import pyquant.utils.utils as utils

# from pyquant.strategies.fzstrategy import (CrossOver3)
import pyquant.strategies.fzstrategy as strat
# from pyquant.models.securitydata import *
import datetime
import argparse
from pyquant.models.symbol_data import SymbolData



def main():

    args = _parse_args()

    # 选择策略
    strats = dict(
        c2=strat.CrossOver2,
        c3=strat.CrossOver3,
    )

    # 时间周奇
    tframes = dict(
        D=bt.TimeFrame.Days,
        W=bt.TimeFrame.Weeks,
        M=bt.TimeFrame.Months)


    cerebro = bt.Cerebro()

    cerebro.broker.setcash(1000000)
    cerebro.broker.setcommission(commission=0.0015)  # 真实佣金： 0.15%
    cerebro.addsizer(bt.sizers.PercentSizer, percents=10)  # 每次投入10%资金

    # df = datalib.get_df_data(args.code, index=True)
    # df =

    # stock = Stock('002119')
    # sd = SecurityData(stock, TushareSource, fromdate=args.fromdate)
    # df = sd.get_data()

    sd = SymbolData(17, fromdate='2017-01-01')
    df = sd.get_daily_price(output='df')

    kwargs = dict()
    # 开始时间
    if args.fromdate:
        kwargs['fromdate'] = datetime.datetime.strptime(args.fromdate, '%Y-%m-%d')

    # 结束时间
    if args.todate:
        kwargs['todate'] = datetime.datetime.strptime(args.todate, '%Y-%m-%d')

    data = bt.feeds.PandasData(dataname=df,**kwargs)

    # 时间周期
    if args.ktype == 'D':
        cerebro.adddata(data)
    else:
        # Resample the data
        cerebro.resampledata(data,timeframe=tframes[args.ktype])


    cerebro.addstrategy(strats[args.strategy],
                        )


    # cerebro.addanalyzer(bt.analyzers.SharpeRatio, _name='sharpratio')
    # cerebro.addanalyzer(SQN, _name='sqn')

    # cerebro.run()
    thestrats = cerebro.run()

    utils.printAnalysers(thestrats)

    if args.plot:
        cerebro.plot(style='candle')


def _parse_args():
    parser = argparse.ArgumentParser(
        description='Showcase for Order Execution Types')

    parser.add_argument('--code','-c',
                        default='000001',
                        help='stock code')

    parser.add_argument('--fromdate', '-f', required=False, default='2017-01-01',
                        help='Ending date in YYYY-MM-DD format')

    parser.add_argument('--todate', '-t', required=False, default=None,
                        help='Ending date in YYYY-MM-DD format')

    parser.add_argument('--ktype', '-k', required=False, default='D',
                        choices=['D','W','M'],
                        help='D=日k线 W=周 M=月 5=5分钟 15=15分钟 30=30分钟 60=60分钟')

    parser.add_argument('--strategy', '-s', required=False, default='c2',
                        choices=['c2', 'c3'],
                        help='策略参数')

    parser.add_argument('--plot', '-p', action='store_true',  required=False, default=True,
                        help='plot')

    return parser.parse_args()

if __name__ == '__main__':
    main()