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

    def next(self):
        super(CrossOver4 ,self).next()

        if self.position.size:
            if self.buysig < 0:
                self.sell()

        elif self.buysig :
            # if self.adx.adx[0] > self.adx.adx[-1] :
            self.buy()

if __name__ == '__main__':
    """"""