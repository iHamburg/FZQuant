
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



class Backtest(object):
    """
    Backtest对象直接测试
    """

    strategy = None
    _df = None
    symboldata = None
    _fromdate = None
    _todate = None
    reporter = None
    name = 'Kitty'

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

        self.reporter = Reporter(self)

    def run_strategy(self, strategy=None, fromdate=None, todate=None):
        """
        """

        params = dict(starting_cash = 100000,
                      commission = 0.0015)

        cerebro = bt.Cerebro()

        cerebro.broker.setcash(params['starting_cash'])
        cerebro.broker.setcommission(params['commission'])  # 真实佣金： 0.15%
        cerebro.addsizer(bt.sizers.PercentSizer, percents=10)  # 每次投入10%资金  风控模块

        kwargs = {}

        if not fromdate:
            #  如果没有传fromdate， 就从sd中拿fromedate
            fromdate = self.symboldata.fromdate

        if not todate:
            todate = self.symboldata.todate


        if fromdate:
            kwargs['fromdate'] = datetime.datetime.strptime(fromdate, '%Y-%m-%d')

        if todate:
            kwargs['todate'] = datetime.datetime.strptime(todate, '%Y-%m-%d')

        # print(kwargs)
        df = self.symboldata.get_daily_price(output='df')

        data = bt.feeds.PandasData(dataname = df, **kwargs)

        cerebro.adddata(data)

        cerebro.addstrategy(self.strategy)

        # 加入Analyser

        analyzers = [SharpeRatio, TradeAnalyzer, AnnualReturn, DrawDown, TimeDrawDown]

        for analyzer in analyzers:
            cerebro.addanalyzer(analyzer)


        thestrats = cerebro.run()



        # 生成reporter
        self.reporter.start_cash = params['starting_cash']
        self.reporter.commission = params['commission']
        self.reporter.strategy_name = self.strategy.name
        self.reporter.fromdate = fromdate
        self.reporter.todate = todate
        self.reporter.symbol_name = self.symboldata.symbol.name
        self.reporter.symbol_ticker = self.symboldata.symbol.ticker
        self.reporter.end_cash = cerebro.broker.get_cash()
        self.reporter.total_value = cerebro.broker.get_value()


        for strat in thestrats:
            print('--------------------------------------------------')

            if type(strat) == list:
                strat = strat[0]

            print('==== buy signals ', strat.buy_signals)
            print('==== sell signals ', strat.sell_signals)
            for trade in strat._trades:
                print(type(trade), trade)

            self.reporter.strategy_params = strat.p._getkwargs()
            for analyzer in strat.analyzers:


                # print(analyzer.get_analysis())
                # analyzer.pprint()
                name = analyzer.__class__.__name__
                print('Analyzer ',name)
                if name == 'SharpeRatio':
                    self.reporter.sharpe_ratio = analyzer.get_analysis()['sharperatio']
                elif name == 'TradeAnalyzer':
                    obj = analyzer.get_analysis()
                    del obj['long']
                    del obj['short']
                    del obj['len']['long']
                    del obj['len']['short']
                    self.reporter.trade_analyzer = obj
                elif name == 'AnnualReturn':
                    self.reporter.annual_return = analyzer.get_analysis()
                elif name == 'DrawDown':
                    # pprint(analyzer.get_analysis())
                    self.reporter.drawdown = analyzer.get_analysis()
                elif name == 'TimeDrawDown':
                    pprint(analyzer.get_analysis())
                    self.reporter.drawdown = analyzer.get_analysis()
                    #     print(type(row), row)
                    # analyzer.pprint()






        # print(self.reporter.__dict__)

        return self.reporter


    def notify_buy_signal(self):
        """"""
        strat = self.strategy
        symbol_data = self.symboldata

        stra = self.run_strategy()



def _test_run_strategy():
    strategy = strat.CrossOver3

    sd = SymbolData(17, fromdate='2017-01-01', output='df')

    bt = Backtest(strategy,sd)

    reporter = bt.run_strategy(fromdate='2017-01-01')

    print(reporter.__dict__)



def _test_run_stra_name():
    """"""

if __name__ == '__main__':

    print('=====Begin=======')

    import pyquant.strategies.fzstrategy as strat

    # _test_run_strategy()

    stra = 'strat.CrossOver3'
    # stra = strat.CrossOver3
    sd = SymbolData(17, fromdate='2017-01-01', output='df')

    backtest = Backtest('strat.CrossOver3', sd)

    backtest.run_strategy(fromdate='2017-01-01')

    _test_run_strategy()

    print('=====END=======')