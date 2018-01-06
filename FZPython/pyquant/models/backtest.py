
import backtrader as bt
import pyquant.utils.utils as utils
from pyquant.db_models import Symbol
from pyquant.models.symboldata import SymbolData
# from pyquant.strategies.fzstrategy import (CrossOver3)
from pyquant.models.reporter import Reporter
import datetime

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
        self.strategy = strategy
        self.symboldata = symboldata
        self.reporter = Reporter(self)




    def run_strategy(self, fromdate=None, todate=None):
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
        df = self.symboldata.get_daily_price()
        data = bt.feeds.PandasData(dataname = df, **kwargs)

        cerebro.adddata(data)

        cerebro.addstrategy(self.strategy)
        cerebro.addanalyzer(bt.analyzers.SharpeRatio)
        cerebro.addanalyzer(bt.analyzers.TradeAnalyzer)

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

            self.reporter.strategy_params = strat.p._getkwargs()
            for analyzer in strat.analyzers:
                # print(type(item),item)

                # print(analyzer.get_analysis())
                # analyzer.pprint()
                name = analyzer.__class__.__name__
                print('name',name)
                if name == 'SharpeRatio':
                    self.reporter.sharpe_ratio = analyzer.get_analysis()['sharperatio']
                if name == 'TradeAnalyzer':
                    obj = analyzer.get_analysis()
                    print('total', obj['total']['total'])



        print(self.reporter.__dict__)

        return thestrats





def main():
    strategy = strat.CrossOver3

    symbol = Symbol.get(17)
    sd = SymbolData(symbol, MySQLSource, fromdate='2017-01-01')

    bt = Backtest(strategy,sd)

    bt.run_strategy(fromdate='2017-01-01')


def main2():
    bt = Backtest()
    print(bt.name)
    bt.name = 'newname'
    print(bt.name)

if __name__ == '__main__':

    print('=====Begin=======')
    from pyquant.models.securitydata import *
    import pyquant.strategies.fzstrategy as strat

    main()



    print('=====END=======')