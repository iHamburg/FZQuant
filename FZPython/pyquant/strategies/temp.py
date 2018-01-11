# coding: utf8
import backtrader as bt
import backtrader.indicators as btind
import datetime
import argparse
import pandas as pd
from backtrader.analyzers import (SQN, AnnualReturn, TimeReturn, SharpeRatio,
                                  TradeAnalyzer)


import pyquant.utils.utils as utils
import backtrader.analyzers as btanal

from pyquant.strategies.fzstrategy import FZStrategy

class CrossOver4(FZStrategy):
    """
    """
    params = (
        # period for the fast Moving Average
        ('fast', 9),
        # period for the slow moving average
        ('slow', 18),
        # moving average to use
        # ('_movav', bt.indicators.MovAv.SMA)
    )

    def __init__(self):
        super(CrossOver4, self).__init__()

        sma_fast = bt.indicators.MovAv.SMA(period=self.p.fast)
        sma_slow = bt.indicators.MovAv.SMA(period=self.p.slow)
        # self.adx = btind.AverageDirectionalMovementIndex(period=18)

        self.name = 'CrossOver4'
        # btind.BollingerBands()

        # btind.AverageDirectionalMovementIndex(period=9)
        self.buysig = btind.CrossOver(sma_fast, sma_slow)

        self.entermarkt_desc = '快速均线上穿慢速均线'
        self.leavemarkt_desc = '快速均线下穿慢速均线'


    def next(self):
        # self.log('buysignal %s' % self.buysig[0], isprint=True)
        super(CrossOver4 ,self).next()

        if self.position.size: #如果已经有position
            if self.buysig < 0:
                self.sell()

        elif self.buysig :
            # if self.adx.adx[0] > self.adx.adx[-1] :
            self.buy()


class CrossOver5(FZStrategy):
    """
    """
    params = (
        # period for the fast Moving Average
        ('fast', 9),
        # period for the slow moving average
        ('slow', 18),
        ('leave_days', 18),  #自动离市时间

        # moving average to use
        # ('_movav', bt.indicators.MovAv.SMA)
    )

    def __init__(self):
        super(CrossOver5, self).__init__()

        sma_fast = bt.indicators.MovAv.SMA(period=self.p.fast)
        sma_slow = bt.indicators.MovAv.SMA(period=self.p.slow)

        self.name = 'CrossOver4'

        self.buysig = btind.CrossOver(sma_fast, sma_slow)

        self.entermarkt_desc = '快速均线上穿慢速均线'
        self.leavemarkt_desc = '快速均线下穿慢速均线'

    def next(self):
        # self.log('buysignal %s' % self.buysig[0], isprint=True)
        super(CrossOver5, self).next()

        if self.position.size:  # 如果已经有position
            if self.buydate + self.p.leave_days < len(self.data):
                self.sell()
                self.log('卖出', isprint=True)

        elif self.buysig:
            self.buy()
            self.buydate = len(self.data)
            self.log('购买', isprint=True)


if __name__ == '__main__':
    """"""