#!/usr/bin/env python
# coding: utf8

import backtrader as bt

import argparse
from backtrader.analyzers import (SQN, AnnualReturn, TimeReturn, SharpeRatio,
                                  TradeAnalyzer)
import pyquant.utils.utils as utils




cerebro = bt.Cerebro()

cerebro.broker.setcash(1000000)
cerebro.broker.setcommission(commission=0.0015) # 真实佣金： 0.15%
cerebro.addsizer(bt.sizers.PercentSizer, percents=10)  #每次投入10%资金

data = utils.get_stock('600194', fromdate='2017-01-01', todate='2017-6-1')
cerebro.adddata(data)

cerebro.addstrategy(bt.strategies.MA_CrossOver,
                   )


# stratruns =cerebro.run()
cerebro.addanalyzer(bt.analyzers.SharpeRatio, _name='sharpratio')
cerebro.addanalyzer(SQN, _name='sqn')

# cerebro.run()
thestrats = cerebro.run()

utils.printAnalysers(thestrats)

cerebro.plot()




