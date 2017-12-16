# -*- coding: utf-8 -*-


import backtrader as bt
import pandas as pd
import pyquant.strategies.fzstrategy as mystrategy
import datetime
import pyquant.utils.utils as utils

# datapath = '../datas/000001.csv'
#
# df = pd.read_csv(datapath, parse_dates=True,index_col=0)
#
# data = bt.feeds.PandasData(dataname=df,
#                             fromdate=datetime.datetime(2017,1,1),
#                             nocase=True,)
# cerebro = bt.Cerebro()
# cerebro.adddata(data)
# cerebro.addstrategy(mystrategy.TestStrategy)
# cerebro.run()
# cerebro.plot()


utils.getIndex('000001')