
import backtrader as bt
import pyquant.utils.utils as utils

# from pyquant.strategies.fzstrategy import (CrossOver3)

import datetime

class Backtest(object):
    """
    Backtest对象直接测试
    """
    strategy = None
    df = None
    fromdate = None
    todate = None

    T_Close, T_Day, T_Date, T_None = range(4)

    def __init__(self, strategy, df,  **kwargs):
        self.strategy = strategy
        self.df = df

    # def addStratrgy(self,strategy):

    def run(self, **kwargs):
        """
        """

        print('T_Day', self.T_Day)
        cerebro = bt.Cerebro()

        cerebro.broker.setcash(1000000)
        cerebro.broker.setcommission(commission=0.0015)  # 真实佣金： 0.15%
        cerebro.addsizer(bt.sizers.PercentSizer, percents=10)  # 每次投入10%资金


        # 开始时间
        if 'fromdate' in kwargs.keys():
            kwargs['fromdate'] = datetime.datetime.strptime(kwargs['fromdate'], '%Y-%m-%d')

        # 结束时间
        if 'todate' in kwargs.keys():
            kwargs['todate'] = datetime.datetime.strptime(kwargs['todate'], '%Y-%m-%d')

        data = bt.feeds.PandasData(dataname = self.df, **kwargs)

        cerebro.adddata(data)

        cerebro.addstrategy(self.strategy)

        thestrats = cerebro.run()

        return thestrats


if __name__ == '__main__':

    print('=====Begin=======')
    from pyquant.models.securitydata import *
    import pyquant.strategies.fzstrategy as strat

    strategy = strat.CrossOver2

    stock = Stock('002119')
    sd = SecurityData(stock, MongoSource, fromdate='2017-01-01')
    df = sd.get_data()

    backtest = Backtest(strategy,df)
    backtest.run()
    # 运行策略
    # run_strategy(strategy, df)

    # 调试策略


    print('=====END=======')