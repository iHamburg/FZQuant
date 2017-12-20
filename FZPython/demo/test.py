#!/usr/bin/env python
# -*- coding: utf-8 -*-

#=========== 实现脚本运行操作 ============
import os
import sys
module_path = os.path.abspath(os.getcwd())
print('module_path',module_path)
if module_path not in sys.path:
    sys.path.append(module_path)
#=========== 实现脚本运行操作 ============

import backtrader as bt
import pandas as pd
import pyquant.strategies.fzstrategy as mystrategy
import datetime

datapath = '../datas/000001.csv'

df = pd.read_csv(datapath, parse_dates=True,index_col=0)

data = bt.feeds.PandasData(dataname=df,
                            fromdate=datetime.datetime(2017,1,1),
                            nocase=True,)
cerebro = bt.Cerebro()
cerebro.adddata(data)
cerebro.addstrategy(mystrategy.TestStrategy)
cerebro.run()
cerebro.plot()