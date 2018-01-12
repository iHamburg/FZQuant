#!/usr/bin/env python
# coding: utf8

from pyquant.models.backtest import  *
from pyquant.strategies.temp import *

strategy = CrossOver5

sd = SymbolData(fromdate='2000-01-01')
# sd.symbol = Symbol.get_stock_by_ticker('000001',index=True)
sd.symbol = Symbol.get_by_ticker('600193')


bt = Backtest()
bt.strategy = strategy
bt.symboldata = sd

# bt.opt_strategy()
bt.run_strategy()
bt.print_report()


if __name__ == '__main__':
    """"""