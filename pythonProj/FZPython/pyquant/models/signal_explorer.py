#!/usr/bin/env python
# coding: utf8

import backtrader as bt
from pyquant.models.symbol_data import SymbolData, Symbol
class SignalExplorer(object):
    """
    返回策略有opensignal的stocklist
    """

    def explore_signal(self, strategy, symbol):
        """
        根据 stratety 跑 symbols，返回有open signal的symbols

        :param strategy:
        :param symbols:
        :return:
        """

        cerebro = bt.Cerebro(optreturn=False)

        cerebro.addsizer(bt.sizers.PercentSizer, percents=50)  # 每次投入全部资金

        # symbol 生成dataframe
        sd = SymbolData(symbol.id)
        sd.fromdate = '2017-01-01'

        # print('df', sd.df)
        data = bt.feeds.PandasData(dataname=sd.df)

        cerebro.adddata(data)

        cerebro.addstrategy(strategy)

        # 加入Analyser

        thestrats = cerebro.run(runonce=False)
        # pprint(thestrats)

        for strat in thestrats:
            print('--------------------------------------------------')

            if type(strat) == list:
                strat = strat[0]

            print(strat)
            # print('==== buy signals ', strat.buy_signals)
            # print('==== sell signals ', strat.sell_signals)



def _test_explore_signal():
    import pyquant.strategies.fzstrategy as strat
    signal_explorer = SignalExplorer()
    symbol = Symbol.get_by_id(17)
    signal_explorer.explore_signal(strat.CrossOver3, symbol)


if __name__ == '__main__':

    _test_explore_signal()