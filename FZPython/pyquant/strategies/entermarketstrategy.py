#!/usr/bin/env python

import backtrader as bt
import datetime
from backtrader.indicators import MovingAverageSimple
import backtrader.indicators as btind
from pyquant.strategies.fzstrategy import FZStrategy


class SingleSMAStrategy(FZStrategy):

    params = dict(period=20)

    def __init__(self):
        super(SingleSMAStrategy, self).__init__()
        self.sma = btind.SMA(period = self.p.period)


    def next(self):
        # Check if an order is pending ... if yes, we cannot send a 2nd one
        if self.order: return

        # check if we are in the market
        if not self.position:

            # Not yet ... we Might buy if ...
            if self.dataclose > self.sma:
                # self.log('BUY CREATE, %.2f' % self.dataclose[0])
                self.order = self.buy()

        else:
            # Already in the market ... we might sell
            if self.dataclose < self.sma:
                # SELL, SELL, SELL!!! (with all possible default parameters)
                # self.log('SELL CREATE, %.2f' % self.dataclose[0])

                self.order = self.close()


#=========== End Of SingleSMAStrategy


class EnterStrategy2(SingleSMAStrategy):

    params = dict(leaveDays=10)

    def __init__(self):
        super(EnterStrategy2, self).__init__()
        self.lastTradeLen = None


    def next(self):
        # Check if an order is pending ... if yes, we cannot send a 2nd one
        # self.log('order %s position %s' % (self.order,self.position), isprint=True)
        if self.order: return

        # check if we are in the market
        if not self.position:

            # Not yet ... we Might buy if ...
            if self.dataclose > self.sma:
                # self.log('BUY CREATE, %.2f' % self.dataclose[0])
                self.order = self.buy()
                self.lastTradeLen = len(self.data)
                print('lastTradelen', self.lastTradeLen)

        else:
            # Already in the market ... we might sell

            self.log('lastTradelen %d, this.len %d' %(self.lastTradeLen, len(self.data)), isprint=True)
            if self.lastTradeLen + 10 < len(self.data):
                self.order = self.close()
#=========================== Begin OF Run Demo

import argparse
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

    cerebro.addstrategy(EnterStrategy2,
                        )

    # stratruns =cerebro.run()
    cerebro.addanalyzer(bt.analyzers.SharpeRatio, _name='sharpratio')
    cerebro.addanalyzer(SQN, _name='sqn')
    if args.printWriter:
        cerebro.addwriter(bt.WriterFile)

    # cerebro.run()
    thestrats = cerebro.run()

    if args.printAnalysers:
        utils.printAnalysers(thestrats)

    if args.plot:
        cerebro.plot(**(eval('dict(' + args.plot + ')')))



def parse_args():
    parser = argparse.ArgumentParser(
        description='Showcase for Order Execution Types')

    parser.add_argument('--data', '-i', required=False,
                        # default='../../datas/stock/600398.csv',
                        default='../../datas/index/000001.csv',
                        help='File to be read in')

    parser.add_argument('--fromdate', '-f', required=False, default=None,
                        help='Ending date in YYYY-MM-DD format')

    parser.add_argument('--todate', '-t', required=False, default=None,
                        help='Ending date in YYYY-MM-DD format')

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

    parser.add_argument('--plot', '-p', nargs='?', required=False,
                        metavar='kwargs', const='{}',
                        help='Plot (with additional args if passed')


    return parser.parse_args()


if __name__ == '__main__':
    runstrat()

