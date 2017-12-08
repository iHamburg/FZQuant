# -*- coding: utf-8 -*-


import backtrader as bt
import pandas as pd
import pyquant.strategies.mystrategy as mystrategy
import datetime
from backtrader.analyzers import (SQN, AnnualReturn, TimeReturn, SharpeRatio,
                                  TradeAnalyzer)
# import matplotlib as mpl
# mpl.use('TkAgg')

codeList = ['000001.csv','000300.csv','600398.csv','600435']

datapath = '../datas/000001.csv'

df = pd.read_csv(datapath, parse_dates=True,index_col=0)

data = bt.feeds.PandasData(dataname=df,
                            fromdate=datetime.datetime(2017,1,1),
                            nocase=True,)


datapath = '../datas/000300.csv'

df = pd.read_csv(datapath, parse_dates=True,index_col=0)

data2 = bt.feeds.PandasData(dataname=df,
                            fromdate=datetime.datetime(2017,1,1),
                            nocase=True,)

#测试入市策略，

cerebro = bt.Cerebro()
cerebro.adddata(data)
# cerebro.adddata(data2)
# cerebro.addstrategy(mystrategy.TestStrategy)

cerebro.optstrategy(
    mystrategy.TestStrategy,
    maperiod=range(20, 60))

cerebro.addanalyzer(SQN)
cerebro.addanalyzer(AnnualReturn)
cerebro.addanalyzer(SharpeRatio)
# cerebro.addanalyzer(TimeReturn)
cerebro.addanalyzer(TradeAnalyzer)
# cerebro.addwriter(bt.WriterFile)
# cerebro.addanalyzer(SharpeRatio, legacyannual=True)
cerebro.run()
# cerebro.plot()