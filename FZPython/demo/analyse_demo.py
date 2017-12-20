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
from pyquant.strategies.fzstrategy import (CrossOver3)
import datetime
import argparse





def main():

    args = _parse_args()
    cerebro = bt.Cerebro()

    cerebro.broker.setcash(1000000)
    cerebro.broker.setcommission(commission=0.0015)  # 真实佣金： 0.15%
    cerebro.addsizer(bt.sizers.PercentSizer, percents=10)  # 每次投入10%资金

    df = utils.get_stock_df(args.code)


    kwargs = dict()
    if args.fromdate:
        kwargs['fromdate'] = datetime.datetime.strptime(args.fromdate, '%Y-%m-%d')

    if args.todate:
        kwargs['todate'] = datetime.datetime.strptime(args.todate, '%Y-%m-%d')

    data = bt.feeds.PandasData(dataname=df,
                               **kwargs)

    tframes = dict(
        D=bt.TimeFrame.Days,
        W=bt.TimeFrame.Weeks,
        M=bt.TimeFrame.Months)

    # 时间周期
    if args.ktype == 'D':
        cerebro.adddata(data)
    else:
        # Resample the data
        cerebro.resampledata(
            data,
            timeframe=tframes[args.ktype])


    cerebro.addstrategy(CrossOver3,
                        )

    # stratruns =cerebro.run()
    # cerebro.addanalyzer(bt.analyzers.SharpeRatio, _name='sharpratio')
    # cerebro.addanalyzer(SQN, _name='sqn')

    # cerebro.run()
    thestrats = cerebro.run()

    utils.printAnalysers(thestrats)

    if args.plot:
        cerebro.plot()

def _parse_args():
    parser = argparse.ArgumentParser(
        description='Showcase for Order Execution Types')

    parser.add_argument('--code','-c',
                        default='600756',
                        help='stock code')

    parser.add_argument('--fromdate', '-f', required=False, default=None,
                        help='Ending date in YYYY-MM-DD format')

    parser.add_argument('--todate', '-t', required=False, default=None,
                        help='Ending date in YYYY-MM-DD format')

    parser.add_argument('--ktype', '-k', required=False, default='D',
                        choices=['D','W','M'],
                        help='D=日k线 W=周 M=月 5=5分钟 15=15分钟 30=30分钟 60=60分钟')

    parser.add_argument('--plot', '-p', action='store_true',  required=False,default=True,
                        help='plot')

    return parser.parse_args()

if __name__ == '__main__':
    main()