# -*- coding: utf-8 -*-

import backtrader as bt
import backtrader.indicators as btind

class CrossOver(bt.Strategy):
    '''This is a long-only strategy which operates on a moving average cross

    Note:
      - Although the default

    Buy Logic:
      - No position is open on the data

      - The ``fast`` moving averagecrosses over the ``slow`` strategy to the
        upside.

    Sell Logic:
      - A position exists on the data

      - The ``fast`` moving average crosses over the ``slow`` strategy to the
        downside

    Order Execution Type:
      - Market

    '''
    alias = ('SMA_CrossOver',)

    params = (
        # period for the fast Moving Average
        ('fast', 10),
        # period for the slow moving average
        ('slow', 30),
        # moving average to use
        ('_movav', btind.MovAv.SMA)
    )

    def log(self, txt, dt=None, printout=True):
        if printout:
            dt = dt or self.data.datetime[0]
            dt = bt.num2date(dt)
            print('%s, %s' % (dt.isoformat(), txt))

    def __init__(self):
        sma_fast = self.p._movav(period=self.p.fast)
        sma_slow = self.p._movav(period=self.p.slow)
        self.adx = btind.AverageDirectionalMovementIndex(period=self.p.slow)

        self.buysig = btind.CrossOver(sma_fast, sma_slow)
        # btind.AverageDirectionalMovementIndex()

    def next(self):
        if self.position.size:
            if self.buysig < 0:
                self.sell()

        elif self.buysig :
            self.log('adx[0]: %.2f ,adx[-1]: %.2f' %(self.adx.adx[0],self.adx.adx[-1]))
            if self.adx.adx[0] > self.adx.adx[-1] :
                self.buy()