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



def getdata(args):

    dfkwargs = dict()

    if args.fromdate:
        fromdate = datetime.datetime.strptime(args.fromdate, '%Y-%m-%d')
        dfkwargs['fromdate'] = fromdate

    if args.todate:
        todate = datetime.datetime.strptime(args.todate, '%Y-%m-%d')
        dfkwargs['todate'] = todate


    df = pd.read_csv(args.data, parse_dates=True, index_col=0)

    return bt.feeds.PandasData(dataname=df, **dfkwargs )

def printAnalysers(strats):

    for strat in strats:
        print('--------------------------------------------------')
        if type(strat)==list: strat = strat[0]

        # strat = strat[0]  # 在opt中strat是列表
        print('Parameter: ', strat.p._getkwargs())
        for item in strat.analyzers:
            print(item.get_analysis())
        print('==================================================')

def runstrat():
    args = parse_args()

    cerebro = bt.Cerebro()

    cerebro.broker.setcash(1000000)
    cerebro.broker.setcommission(commission=0.0015) # 真实佣金： 0.15%
    cerebro.addsizer(bt.sizers.PercentSizer, percents=10)  #每次投入10%资金

    data = getdata(args)
    cerebro.adddata(data)
    cerebro.optstrategy(CrossOver3,
                        fast=range(5,10),
                        slow=range(10,12)
                        )


    if args.printWriter:
        cerebro.addwriter(bt.WriterFile)

    # stratruns =cerebro.run()
    cerebro.addanalyzer(bt.analyzers.SharpeRatio, _name='sharpratio')
    cerebro.addanalyzer(SQN, _name='sqn')
    if args.printWriter:
        cerebro.addwriter(bt.WriterFile)

    # cerebro.run()
    thestrats = cerebro.run()

    if args.printAnalysers:
        printAnalysers(thestrats)

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
                        default='../datas/stock/600398.csv',
                        help='File to be read in')

    parser.add_argument('--fromdate', '-f', required=False, default=None,
                        help='Ending date in YYYY-MM-DD format')

    parser.add_argument('--todate', '-t', required=False, default=None,
                        help='Ending date in YYYY-MM-DD format')

    parser.add_argument('--plot', '-p', action='store_true', required=False,
                        help='Plot the read data')

    parser.add_argument('--plotstyle', '-ps', required=False, default='bar',
                        choices=['bar', 'line', 'candle'],
                        help='Plot the read data')

    parser.add_argument('--numfigs', '-n', required=False, default=1,
                        help='Plot using n figures')

    parser.add_argument('--smaperiod', '-s', required=False, default=15,
                        help='Simple Moving Average Period')

    parser.add_argument('--printWriter', '-w',action='store_true', required=False, default=False,
                        help='Writer the System report')

    parser.add_argument('--printAnalysers', '-pa',action='store_true', required=False, default=True,
                        help='print analysers')


    return parser.parse_args()


if __name__ == '__main__':
    runstrat()