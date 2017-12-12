#!/usr/bin/env python

import backtrader as bt
import os.path  # To manage paths
import sys  # To find out the script name (in argv[0])
import datetime
from backtrader.indicators import MovingAverageSimple
import backtrader.indicators as btind
import backtrader.feeds as btfeeds
import math

class TestStrategy(bt.Strategy):


    params = dict(maperiod=20)

    def log(self, txt):
        dt = self.data.datetime.date(0)
        # print('%s, %s' % (dt, txt))
        print('%s, %s' % (dt.isoformat(), txt))

    def __init__(self):
        self.dataclose = self.data.close
        self.order = None
        self.buyprice = None
        self.buycomm = None

        self.sma = btind.SMA(period = self.p.maperiod)


    def start(self):
        # print('==Strategy start')
        self.log('=====Strategy start')

    def next(self):

        # self.log('Close, %.2f' % self.dataclose[0])


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

                # Keep track of the created order to avoid a 2nd order
                self.order = self.close()



    def notify_order(self,order):
        if order.status in [order.Submitted, order.Accepted]:
            # Buy/Sell order submitted/accepted to/by broker - Nothing to do
            return

        if order.status in [order.Completed]:
            if order.isbuy():
                # self.log(
                #     'BUY EXECUTED, Price: %.2f, Cost: %.2f, Comm %.2f' %
                #     (order.executed.price,
                #      order.executed.value,
                #      order.executed.comm))
                self.buyprice = order.executed.price
                self.buycomm = order.executed.comm
            elif order.issell():pass
                # self.log('SELL EXECUTED, Price: %.2f, Cost: %.2f, Comm %.2f' %
                #          (order.executed.price,
                #           order.executed.value,
                #           order.executed.comm))

            # self.bar_executed = len(self)
        elif order.status in [order.Canceled, order.Margin, order.Rejected]:
            self.log('Order Canceled/Margin/Rejected')

            # Write down: no pending order
        self.order = None

    def notify_trade(self, trade):
        if not trade.isclosed:
            return

        # self.log('OPERATION PROFIT, GROSS %.2f, NET %.2f' %
        #          (trade.pnl, trade.pnlcomm))

    def stop(self):
        self.log('(MA Period %2d) Ending Value %.2f' %
                 (self.params.maperiod, self.broker.getvalue()))


if __name__ == '__main__':
    cerebro = bt.Cerebro()
    cerebro.broker.setcash(100000)
    cerebro.broker.setcommission(commission=0.001)
    # cerebro.addsizer(bt.sizers.FixedSize, stake=1000)
    cerebro.addsizer(bt.sizers.PercentSizer, percents=10)

    cerebro.addstrategy(TestStrategy)

    print('Starting Portfolio Value: %.2f' % cerebro.broker.getvalue())

    modpath = os.path.dirname(os.path.abspath(sys.argv[0]))
    # datapath = os.path.join(modpath, '../datas/orcl-1995-2014.txt')
    datapath = os.path.join(modpath, '../../datas/orcl-1995-2014.txt')
    # datapath = os.path.join(modpath, '600169.csv')

    # add data
    data = bt.feeds.YahooFinanceCSVData(
        dataname=datapath,
        # Do not pass values before this date
        fromdate=datetime.datetime(2000, 1, 1),
        # Do not pass values after this date
        todate=datetime.datetime(2000, 12, 31),
        reverse=False)
    cerebro.adddata(data)
    # cerebro.resampledata(data, timeframe=bt.TimeFrame.Weeks, name='weeks')

    result = cerebro.run()

    print('Final Portfolio Value: %.2f' % cerebro.broker.getvalue())


    cerebro.plot()

