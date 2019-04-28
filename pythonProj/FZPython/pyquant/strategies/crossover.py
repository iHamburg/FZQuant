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

    def log(self, txt, dt=None, isprint=False):
        if isprint:
            dt = dt or  self.data.datetime.date(0)
            print('%s, %s' % (dt.isoformat(), txt))

    def __init__(self):
        sma_fast = self.p._movav(period=self.p.fast)
        sma_slow = self.p._movav(period=self.p.slow)
        self.adx = btind.AverageDirectionalMovementIndex(period=self.p.slow)

        self.buysig = btind.CrossOver(sma_fast, sma_slow)
        # btind.AverageDirectionalMovementIndex()

    def start(self):
        # print('==Strategy start')
        self.log('=====Strategy start', isprint=True)

    def next(self):
        if self.position.size:
            if self.buysig < 0:
                self.sell()

        elif self.buysig :
            self.log('adx[0]: %.2f ,adx[-1]: %.2f' %(self.adx.adx[0],self.adx.adx[-1]))
            if self.adx.adx[0] > self.adx.adx[-1] :
                self.buy()

    def notify_order(self, order):
        if order.status in [order.Submitted, order.Accepted]:
            # Buy/Sell order submitted/accepted to/by broker - Nothing to do
            return

        if order.status in [order.Completed]:
            if order.isbuy():
                self.log(
                    'BUY EXECUTED, Price: %.2f, Cost: %.2f, Comm %.2f' %
                    (order.executed.price,
                     order.executed.value,
                     order.executed.comm), isprint=True)
                self.buyprice = order.executed.price
                self.buycomm = order.executed.comm
            elif order.issell():
                self.log('SELL EXECUTED, Price: %.2f, Cost: %.2f, Comm %.2f' %
                         (order.executed.price,
                          order.executed.value,
                          order.executed.comm), isprint=True)

                # self.bar_executed = len(self)
        elif order.status in [order.Canceled, order.Margin, order.Rejected]:
            self.log('Order Canceled/Margin/Rejected')

            # Write down: no pending order
        self.order = None

    def notify_trade(self, trade):
        if not trade.isclosed:
            return

        self.log('OPERATION PROFIT, GROSS %.2f, NET %.2f' %
                 (trade.pnl, trade.pnlcomm), isprint=True)

    def stop(self):
        self.log(' Ending Value %.2f' %
                 (self.broker.getvalue()), isprint=True)


class CrossOver2(CrossOver):
    def stop(self):
        super(CrossOver2,self).stop()
