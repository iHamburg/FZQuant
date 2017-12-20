#!/usr/bin/env python
# coding: utf8

#=========== 实现脚本运行操作 ============
import os
import sys
module_path = os.path.abspath(os.getcwd())
if module_path not in sys.path:
    sys.path.append(module_path)
#=========== 实现脚本运行操作 ============

import backtrader as bt

import argparse
from backtrader.analyzers import (SQN, AnnualReturn, TimeReturn, SharpeRatio,
                                  TradeAnalyzer)
import pyquant.utils.utils as utils
from pyquant.strategies.fzstrategy import (CrossOver3)


cerebro = bt.Cerebro()

cerebro.broker.setcash(1000000)
cerebro.broker.setcommission(commission=0.0015) # 真实佣金： 0.15%
cerebro.addsizer(bt.sizers.PercentSizer, percents=10)  #每次投入10%资金

df = utils.get_stock_df('002119', fromdate='2017-01-01')
data = bt.feeds.PandasData(dataname=df)
cerebro.adddata(data)

cerebro.addstrategy(CrossOver3,
                   )


# stratruns =cerebro.run()
cerebro.addanalyzer(bt.analyzers.SharpeRatio, _name='sharpratio')
cerebro.addanalyzer(SQN, _name='sqn')

# cerebro.run()
thestrats = cerebro.run()

utils.printAnalysers(thestrats)

cerebro.plot(style='candle')




