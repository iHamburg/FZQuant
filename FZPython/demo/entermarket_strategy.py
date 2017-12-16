# -*- coding: utf-8 -*-


from  pyquant.strategies.crossover import (CrossOver, CrossOver2)
from pyquant.strategies.fzstrategy import (CrossOver3)



# 可以读取tushare的pandas的数据

import backtrader as bt
import datetime
import argparse
import pandas as pd
from backtrader.analyzers import (SQN, AnnualReturn, TimeReturn, SharpeRatio,
                                  TradeAnalyzer)
import pyquant.utils.utils as utils


def runstrat():
    args = parse_args()

    cerebro = bt.Cerebro()

    cerebro.broker.setcash(1000000)
    cerebro.broker.setcommission(commission=0.0015) # 真实佣金： 0.15%
    cerebro.addsizer(bt.sizers.PercentSizer, percents=10)  #每次投入10%资金

    data = utils.getdata(args)
    cerebro.adddata(data)

    cerebro.addstrategy(
        CrossOver3,
        fast=10,
        slow=18
    )


    # cerebro.addanalyzer(AnnualReturn, _name='AnnualReturn')
    # cerebro.addanalyzer(TradeAnalyzer)
    cerebro.addanalyzer(bt.analyzers.SharpeRatio, _name='sharpratio')
    cerebro.addanalyzer(SQN, _name='sqn')
    if args.writer:
        cerebro.addwriter(bt.WriterFile)

    # cerebro.run()
    thestrats = cerebro.run()
    utils.printAnalysers(thestrats)




    if args.plot:
        #plot 参数
        plotargs = dict()
        if args.numfigs:
            plotargs['numfigs'] = args.numfigs

        if args.plotstyle:
            plotargs['style'] = args.plotstyle

        cerebro.plot(**plotargs)





def parse_args():
    parser = argparse.ArgumentParser(
        description='Showcase for Order Execution Types')

    parser.add_argument('--data', '-i', required=False,
                        # default='../datas/index/000001.csv',
                        default='../datas/stock/601933.csv',
                        help='File to be read in')

    parser.add_argument('--fromdate', '-f', required=False, default='2017-01-01',
                        help='Ending date in YYYY-MM-DD format')

    parser.add_argument('--todate', '-t', required=False, default=None,
                        help='Ending date in YYYY-MM-DD format')

    parser.add_argument('--plot', '-p', action='store_true', required=False, default=True,
                        help='Plot the read data')

    parser.add_argument('--plotstyle', '-ps', required=False, default='candle',
                        choices=['bar', 'line', 'candle'],
                        help='Plot the read data')

    parser.add_argument('--numfigs', '-n', required=False, default=1,
                        help='Plot using n figures')

    parser.add_argument('--smaperiod', '-s', required=False, default=15,
                        help='Simple Moving Average Period')

    parser.add_argument('--writer', '-w',action='store_true', required=False, default=False,
                        help='Writer the System report')


    return parser.parse_args()


if __name__ == '__main__':
    runstrat()