#!/usr/bin/env python
# coding: utf8

import tushare as ts
import backtrader as bt
import pandas as pd

#下载上证综指 20年的数据

codeList = []

df = ts.get_k_data('000002',index=False,start='1990-01-01')
# df = ts.get_k_data('600435',index=True,start='2016-01-01')
df = df.set_index('date')
# df.to_csv('index/399006.csv', columns=['open','high','close','low','volume'])
df.to_csv('stock/000002.csv', columns=['open','high','close','low','volume'])

#
# #直接保存
# df.to_csv('000001-2016-2017_2.csv')

# df = pd.read_csv('000001.csv', parse_dates=True,index_col=0)
#
# data = bt.feeds.PandasData(dataname=df,
#                                # datetime='Date',
#
#                                nocase=True,
#                                )
# cerebro = bt.Cerebro()
# cerebro.adddata(data)
# cerebro.run()
# cerebro.plot()
