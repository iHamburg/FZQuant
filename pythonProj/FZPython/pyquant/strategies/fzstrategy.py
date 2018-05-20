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


class FZStrategy(bt.Strategy):

    name = None
    # _desc = None     #策略描述
    buy_signals = []
    sell_signals = []

    entermarkt_desc = None
    stop_desc = None
    leavemarkt_desc = None


    def log(self, txt, dt=None, isprint=False):
        if isprint:
            dt = dt or  self.data.datetime.date(0)
            print('%s, %s' % (dt.isoformat(), txt))

    def __init__(self):
        self.log('======FZStrategy init=======')
        self.dataclose = self.data.close
        self.order = None
        # self.buyprice = None
        # self.buycomm = None

    @property
    def desc(self):
        desc = '入市策略: %s\n止损策略: %s \n 离市策略: %s' % (self.entermarkt_desc, self.stop_desc, self.leavemarkt_desc)
        return desc

    # def start(self):
    #     self.log('=====Strategy start')

    # def next(self):
    #     self.log('Close, %.2f' % (self.dataclose[0]))


    # def buy(self,data=None,
    #         size=None, price=None, plimit=None,
    #         exectype=None, valid=None, tradeid=0, oco=None,
    #         trailamount=None, trailpercent=None,
    #         parent=None, transmit=True,
    #         **kwargs):
    #     print('=====buy=====')
    #
    #     return super(FZStrategy, self).buy(data, size, price, plimit, exectype, valid, tradeid, oco, trailamount, trailpercent,
    #                                        parent, transmit, **kwargs)

    def notify_order(self, order):

        # if order.status == order.Submitted:
        #     #发出信号
        #     if order.isbuy():
        #         self.buy_signals.append(str(self.data.datetime.date(0)))
        #     else:
        #         self.sell_signals.append(str(self.data.datetime.date(0)))

        # print('====== order.status', self.data.datetime.date(0),  order.status)
        if order.status in [order.Submitted, order.Accepted]:
            # Buy/Sell order submitted/accepted to/by broker - Nothing to do
            return

        # if order.status in [order.Completed]:
        #     if order.isbuy():
        #         self.log(
        #             'BUY EXECUTED, Price: %.2f, Cost: %.2f, Comm %.2f' %
        #             (order.executed.price,
        #              order.executed.value,
        #              order.executed.comm), isprint=False)
        #         self.buyprice = order.executed.price
        #         self.buycomm = order.executed.comm
        #     elif order.issell():
        #         self.log('SELL EXECUTED, Price: %.2f, Cost: %.2f, Comm %.2f' %
        #                  (order.executed.price,
        #                   order.executed.value,
        #                   order.executed.comm), isprint=False)


        elif order.status in [order.Canceled, order.Margin, order.Rejected]:
            self.log('Order Canceled/Margin/Rejected',isprint=True)

            # Write down: no pending order
        self.order = None

    def notify_trade(self, trade):
        if not trade.isclosed:
            return

        self.log('OPERATION PROFIT, GROSS %.2f, NET %.2f' %
                 (trade.pnl, trade.pnlcomm), isprint=False)

    def stop(self):
        self.log('======Ending Value %.2f' %
                 (self.broker.getvalue()), isprint=True)



class CrossOver2(FZStrategy):
    """


    """
    params = (
        # period for the fast Moving Average
        ('fast', 9),
        # period for the slow moving average
        ('slow', 18),
        # 止损率
        ('stoploss', 0.1)
        # 离市日期
        ('leaveDays', 3)
        # moving average to use
        # ('_movav', bt.indicators.MovAv.SMA)
    )

    def __init__(self):
        super(CrossOver2, self).__init__()
        self.log('======CrossOver2 init=======',isprint=True)
        # self.log('======Crossover3 init=======', isprint=True)
        sma_fast = bt.indicators.MovAv.SMA(period=self.p.fast)
        sma_slow = bt.indicators.MovAv.SMA(period=self.p.slow)

        self.adx = btind.AverageDirectionalMovementIndex(period=18)

        self.name = 'CrossOver2'

        #  买入策略是快速均线上穿慢速均线
        self.buysig = btind.CrossOver(sma_fast, sma_slow)
        # self.sellsig =


    def next(self):
        super(CrossOver2 ,self).next()

        # 判断是否卖出
        if self.position.size: #如果已经购买
            if self.buysig < 0:
                self.sell()

        elif self.buysig :
            self.log('adx[0]: %.2f ,adx[-1]: %.2f' %(self.adx.adx[0],self.adx.adx[-1]))
            # if self.adx.adx[0] > self.adx.adx[-1] :
            self.buy()


class CrossOver3(FZStrategy):
    params = (
        # period for the fast Moving Average
        ('fast', 10),
        # period for the slow moving average
        ('slow', 30),
        # moving average to use
        # ('_movav', bt.indicators.MovAv.SMA)
    )

    def __init__(self):
        super(CrossOver3,self).__init__()
        self.log('======Crossover3 init=======', isprint=True)
        sma_fast = bt.indicators.MovAv.SMA(period=self.p.fast)
        sma_slow = bt.indicators.MovAv.SMA(period=self.p.slow)
        # self.adx = btind.AverageDirectionalMovementIndex(period=18)
        # self.adx = btind.AverageDirectionalMovementIndex(period=9)
        # btind.MACD()
        # btind.BollingerBands()

        # btind.AverageDirectionalMovementIndex(period=9)
        self.buysig = btind.CrossOver(sma_fast, sma_slow)


    def next(self):
        super(CrossOver3,self).next()

        if self.position.size:
            if self.buysig < 0:
                self.sell()

        elif self.buysig :
            # self.log('adx[0]: %.2f ,adx[-1]: %.2f' %(self.adx.adx[0],self.adx.adx[-1]))
            # if self.adx.adx[0] > self.adx.adx[-1] :
            self.buy()



class TempStrategy(FZStrategy):
    """


    """
    params = (
        # period for the fast Moving Average
        ('fast', 9),
        # period for the slow moving average
        ('slow', 18),
        # 止损率
        ('stoploss', 0.1)
        # 离市日期
        ('leaveDays', 3)
        # moving average to use
        # ('_movav', bt.indicators.MovAv.SMA)
    )

    def __init__(self):
        super(CrossOver2, self).__init__()
        self.log('======CrossOver2 init=======',isprint=True)
        # self.log('======Crossover3 init=======', isprint=True)
        sma_fast = bt.indicators.MovAv.SMA(period=self.p.fast)
        sma_slow = bt.indicators.MovAv.SMA(period=self.p.slow)

        self.adx = btind.AverageDirectionalMovementIndex(period=18)

        self.name = 'Temp'

        #  买入策略是快速均线上穿慢速均线
        self.buysig = btind.CrossOver(sma_fast, sma_slow)



    def next(self):
        super(TempStrategy ,self).next()

        # 判断是否卖出
        if self.position.size: #如果已经购买
            if self.buysig < 0:
                self.sell()

        elif self.buysig :
            self.log('adx[0]: %.2f ,adx[-1]: %.2f' %(self.adx.adx[0],self.adx.adx[-1]))
            # if self.adx.adx[0] > self.adx.adx[-1] :
            self.buy()


# =========== 处理运行 ==============

def runstrat():
    args = parse_args()

    cerebro = bt.Cerebro()

    cerebro.broker.setcash(1000000)
    cerebro.broker.setcommission(commission=0.0015) # 真实佣金： 0.15%
    cerebro.addsizer(bt.sizers.PercentSizer, percents=10)  #每次投入10%资金

    data = utils.get_csv_data(args)
    cerebro.adddata(data)

    cerebro.addstrategy(
        CrossOver3,
        fast=10,
        slow=18
    )


    # cerebro.addanalyzer(btanal.AnnualReturn)
    cerebro.addanalyzer(btanal.DrawDown)

    cerebro.addanalyzer(btanal.VWR)
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
                        default='../../datas/index/000001.csv',
                        # default='../datas/stock/600398.csv',
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

    parser.add_argument('--writer', '-w',action='store_true', required=False, default=False,
                        help='Writer the System report')


    return parser.parse_args()


if __name__ == '__main__':
    runstrat()