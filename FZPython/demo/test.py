#!/usr/bin/env python
# coding: utf8

from pyquant.models.backtest import  *
from pyquant.strategies.temp import *

strategy = CrossOver5

sd = SymbolData(fromdate='2010-01-01')
sd.symbol = Symbol.get_stock_by_ticker('000001',index=True)


bt = Backtest()
bt.strategy = strategy
bt.symboldata = sd

bt.run_strategy()
bt.print_report()

if __name__ == '__main__':
    """"""