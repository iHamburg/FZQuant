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

from backtrader.analyzers import (SQN, AnnualReturn, TimeReturn, SharpeRatio,
                                  TradeAnalyzer)
import pyquant.utils.utils as utils
# from pyquant.strategies.fzstrategy import (CrossOver3)
import pyquant.strategies.fzstrategy as strat
import pyquant.datasource.data as datalib
from pyquant.models.securitydata import *
import datetime

cerebro = bt.Cerebro()

cerebro.broker.setcash(1000000)
cerebro.broker.setcommission(commission=0.0015) # 真实佣金： 0.15%
cerebro.addsizer(bt.sizers.PercentSizer, percents=10)  #每次投入10%资金

# df = datalib.get_df_data('000001',index=True, fromdate='2017-01-01')
stock = Stock('002119')
sd = SecurityData(stock, TushareSource, fromdate='2017-01-01')
df = sd.get_data()

data = bt.feeds.PandasData(dataname=df, fromdate= datetime.datetime.strptime('2017-1-1', '%Y-%m-%d'))
cerebro.adddata(data)

cerebro.addstrategy(strat.CrossOver2)
cerebro.addstrategy(strat.CrossOver3)


# stratruns =cerebro.run()
cerebro.addanalyzer(bt.analyzers.SharpeRatio, _name='sharpratio')
cerebro.addanalyzer(SQN, _name='sqn')

# cerebro.run()
thestrats = cerebro.run()

# utils.printAnalysers(thestrats)

cerebro.plot(savefile=True)


