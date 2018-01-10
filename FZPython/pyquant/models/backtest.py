
import datetime
from pprint import pprint
import backtrader as bt
import pyquant.utils.utils as utils
from pyquant.db_models import Symbol
from pyquant.models.symbol_data import SymbolData
# from pyquant.strategies.fzstrategy import (CrossOver3)
from pyquant.models.reporter import Reporter
from backtrader.analyzers import *
import pyquant.strategies.fzstrategy as strat
import pyquant.strategies.fzstrategy as fzstrategy
# import pyquant.libs.utillib as utillib
from pyquant.utils.monitor import listener, Monitor


class Backtest(object):
    """
    Backtest对象直接测试
    """

    strategy = None
    _df = None
    symboldata = None
    fromdate = None
    todate = None
    reporter = None
    analyzers = [SharpeRatio, TradeAnalyzer, AnnualReturn, DrawDown, TimeDrawDown, Returns]
    analyzer_results = {}
    params = {}
    name = '某次回测'
    starting_cash = 1000000
    commission = 0.0015

    backtest_params = {}
    # T_Close, T_Day, T_Date, T_None = range(4)


    def __init__(self, strategy = None, symboldata = None):
        """

        :param strategy:   string or obj
        :param symboldata:
        """

        if isinstance(strategy, str):
            strategy = eval(strategy)

        self.strategy = strategy

        self.symboldata = symboldata

        # self.params
        self.reporter = Reporter(self)


    @listener(Monitor)
    def run_strategy(self):
        """
        """


        cerebro = bt.Cerebro()

        cerebro.broker.setcash(self.starting_cash)
        cerebro.broker.setcommission(self.commission)  # 真实佣金： 0.15%
        cerebro.addsizer(bt.sizers.PercentSizer, percents=10)  # 每次投入10%资金  风控模块

        kwargs = {}

        if not self.fromdate:
            #  如果没有传fromdate， 就从sd中拿fromedate
            fromdate = self.symboldata.fromdate

        if not self.todate:
            todate = self.symboldata.todate


        if fromdate:
            kwargs['fromdate'] = datetime.datetime.strptime(fromdate, '%Y-%m-%d')

        if todate:
            kwargs['todate'] = datetime.datetime.strptime(todate, '%Y-%m-%d')


        data = bt.feeds.PandasData(dataname = self.symboldata.df, **kwargs)

        cerebro.adddata(data)

        cerebro.addstrategy(self.strategy)

        # 加入Analyser

        for analyzer in self.analyzers:
            cerebro.addanalyzer(analyzer)


        thestrats = cerebro.run()
        # pprint(thestrats)

        for strat in thestrats:
            print('--------------------------------------------------')

            if type(strat) == list:
                strat = strat[0]

            # print('==== buy signals ', strat.buy_signals)
            # print('==== sell signals ', strat.sell_signals)


            self.reporter.strategy_params = strat.p._getkwargs()

            for analyzer in strat.analyzers:

                # analyzer.pprint()
                name = analyzer.__class__.__name__
                obj = analyzer.get_analysis()
                if name == 'TradeAnalyzer':
                    del obj['long']
                    del obj['short']
                    del obj['len']['long']
                    del obj['len']['short']
                self.analyzer_results[name] = obj

        # 生成reporter


        self.reporter.strategy_name = self.strategy.name
        self.reporter.fromdate = fromdate
        self.reporter.todate = todate
        self.reporter.symbol_name = self.symboldata.symbol.name
        self.reporter.symbol_ticker = self.symboldata.symbol.ticker
        self.reporter.end_cash = cerebro.broker.get_cash()
        self.reporter.total_value = cerebro.broker.get_value()
        self.reporter.analyzers = self.analyzer_results


            # pprint(self.analyzer_dict)




    def notify_buy_signal(self):
        """"""
        strat = self.strategy
        symbol_data = self.symboldata

        stra = self.run_strategy()

    def reporter(self):
        reporter = {}
        reporter['']



def _test_run_strategy():
    strategy = strat.CrossOver3

    sd = SymbolData(fromdate='2017-01-01')
    sd.symbol = Symbol.get_stock_by_ticker('000001',index=True)


    bt = Backtest()
    bt.strategy = strategy
    bt.symboldata = sd

    bt.run_strategy()
    # pprint(bt.reporter.__dict__)





def _test_run_stra_name():
    """"""

if __name__ == '__main__':

    print('=====Begin=======')

    # import pyquant.strategies.fzstrategy as strat


    # _test_run_strategy()

    # stra = 'strat.CrossOver3'
    # # stra = strat.CrossOver3
    # sd = SymbolData(17, fromdate='2017-01-01', output='df')
    #
    # backtest = Backtest('strat.CrossOver3', sd)
    #
    # backtest.run_strategy(fromdate='2017-01-01')

    # start = time.clock()
    # _test_run_strategy()
    # end = time.clock()
    # print(end - start)


    _test_run_strategy()

    print('=====END=======')