import time
import datetime
import json
from pprint import pprint
from pyquant.db_models import Symbol
from pyquant.models.symbol_data import SymbolData
from backtrader.analyzers import *
import pyquant.strategies.fzstrategy as strat
import pyquant.strategies.fzstrategy as fzstrategy
import pyquant.libs.utillib as utillib
from pyquant.utils.monitor import listener, Monitor


class Backtest(object):
    """
    Backtest对象直接测试
    """

    name = '某次回测'
    starting_cash = 1000000
    commission = 0.0015
    fromdate = None
    todate = None

    strategy = None
    symboldata = None

    reporter = None
    # analyzers = [SharpeRatio, TradeAnalyzer, AnnualReturn, DrawDown, TimeDrawDown, Returns]
    analyzers = [SharpeRatio, DrawDown, TimeDrawDown, Returns]

    backtest_params = {}
    strategy_params = {}
    symboldata_params = {}
    analyzer_reports = {}



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



    @listener(Monitor)
    def run_strategy(self):
        """
        回测策略
        """

        cerebro = bt.Cerebro(optreturn=False)

        cerebro.broker.setcash(self.starting_cash)
        cerebro.broker.setcommission(self.commission)  # 真实佣金： 0.15%
        # cerebro.addsizer(bt.sizers.PercentSizer, percents=0)  # 每次投入全部资金  风控模块
        cerebro.addsizer(bt.sizers.PercentSizer, percents=50)  # 每次投入全部资金  风控模块

        kwargs = {}

        if not self.fromdate:
            #  如果没有传fromdate， 就从sd中拿fromedate
            self.fromdate = self.symboldata.fromdate

        if not self.todate:
            self.todate = self.symboldata.todate or utillib.get_today()


        kwargs['fromdate'] = datetime.datetime.strptime(self.fromdate, '%Y-%m-%d')
        kwargs['todate'] = datetime.datetime.strptime(self.todate, '%Y-%m-%d')

        # df =  self.symboldata.df
        # print(df.dtypes)
        # return

        data = bt.feeds.PandasData(dataname = self.symboldata.df, **kwargs)

        cerebro.adddata(data)

        cerebro.addstrategy(self.strategy)

        # 加入Analyser

        for analyzer in self.analyzers:
            cerebro.addanalyzer(analyzer)

        before = time.time();
        thestrats = cerebro.run(runonce=False)
        print('【运行】cerebro.run ',time.time()-before)
        # pprint(thestrats)

        for strat in thestrats:
            print('--------------------------------------------------')

            if type(strat) == list:
                strat = strat[0]

            # print('==== buy signals ', strat.buy_signals)
            # print('==== sell signals ', strat.sell_signals)

            self.strategy_params['strategy_class'] = strat.__class__.__name__
            self.strategy_params['strategy_param'] =  strat.p._getkwargs()
            self.strategy_params['strategy_name'] = strat.name
            self.strategy_params['strategy_desc'] = strat.desc


            # analyzer params
            for analyzer in strat.analyzers:

                # analyzer.pprint()
                name = analyzer.__class__.__name__
                obj = analyzer.get_analysis()
                if name == 'TradeAnalyzer':
                    del obj['long']
                    del obj['short']
                    del obj['len']['long']
                    del obj['len']['short']
                self.analyzer_reports[name] = obj



        # 生成reporter

        # backtest params
        for key in ['name', 'starting_cash', 'commission', 'fromdate', 'todate']:
            self.backtest_params[key] = getattr(self, key)

        # symboldata params
        self.symboldata_params['symbol_ticker'] = self.symboldata.symbol.ticker
        self.symboldata_params['symbol_name'] = self.symboldata.symbol.name
        self.symboldata_params['symbol_instrument'] = self.symboldata.symbol.instrument

        self.analyzer_reports['end_cash'] = cerebro.broker.get_cash()
        self.analyzer_reports['total_value'] = cerebro.broker.get_value()

        # cerebro.plot()



    @listener(Monitor)
    def opt_strategy(self):
        cerebro = bt.Cerebro()

        cerebro.broker.setcash(self.starting_cash)
        cerebro.broker.setcommission(self.commission)  # 真实佣金： 0.15%
        cerebro.addsizer(bt.sizers.PercentSizer, percents=10)  # 每次投入10%资金  风控模块

        kwargs = {}

        if not self.fromdate:
            #  如果没有传fromdate， 就从sd中拿fromedate
            self.fromdate = self.symboldata.fromdate

        if not self.todate:
            self.todate = self.symboldata.todate or utillib.get_today()

        kwargs['fromdate'] = datetime.datetime.strptime(self.fromdate, '%Y-%m-%d')
        kwargs['todate'] = datetime.datetime.strptime(self.todate, '%Y-%m-%d')

        data = bt.feeds.PandasData(dataname=self.symboldata.df, **kwargs)

        cerebro.adddata(data)

        # cerebro.addstrategy(self.strategy)
        cerebro.optstrategy(self.strategy, leave_days=range(5,18))
        # 加入Analyser

        for analyzer in self.analyzers:
            cerebro.addanalyzer(analyzer)

        opt_returns = cerebro.run()


        for opt_return in opt_returns:
            print('--------------------------------------------------')
            # print(type(opt_return),opt_return)
            if isinstance(opt_return, list):
                opt_return = opt_return[0]

            print('params', opt_return.params)
            print('analyzers', opt_return.analyzers)
            for analyzer in opt_return.analyzers:
                print(analyzer.get_analysis())
            print('p', opt_return.p)


        # 生成reporter

        # backtest params
        for key in ['name', 'starting_cash', 'commission', 'fromdate', 'todate']:
            self.backtest_params[key] = getattr(self, key)

        # symboldata params
        self.symboldata_params['symbol_ticker'] = self.symboldata.symbol.ticker
        self.symboldata_params['symbol_name'] = self.symboldata.symbol.name
        self.symboldata_params['symbol_instrument'] = self.symboldata.symbol.instrument

        self.analyzer_reports['end_cash'] = cerebro.broker.get_cash()
        self.analyzer_reports['total_value'] = cerebro.broker.get_value()


    def notify_buy_signal(self):
        """"""
        strat = self.strategy
        symbol_data = self.symboldata

        stra = self.run_strategy()

    def print_report(self, output='console', file_name='backtest_report.txt'):
        if output == 'console':
            print(self.backtest_params)
            print(self.strategy_params)
            pprint(self.symboldata_params)
            pprint(self.analyzer_reports)
        elif output == 'file':
            # 打印到文件
            with open(file_name, 'w') as f:
                report = dict(backtest=self.backtest_params, strategy=self.strategy_params,
                              symboldata=self.symboldata_params, analyzer=self.analyzer_reports)

                f.write(json.dumps(report, ensure_ascii=False))  # 写


    def backtest_strat_with_tickers(self, strategy, tickers):
        """
         回测一个确定策略对于一组symbol的结果

        :param strategy:
        :param tickers:
        :return:
        """

        sds = []
        for ticker in tickers:
            sd = SymbolData(fromdate='2010-01-01')
            sd.symbol = Symbol.get_by_ticker(ticker)
            sds.append(sd)


        self.strategy = strategy

        for sd in sds:
            self.symboldata = sd
            self.run_strategy()
            self.print_report(output='file', file_name=sd.symbol.ticker + 'report.json')

        # TODO 生成文件


@listener(Monitor)
def _test_run_strategy():
    strategy = strat.CrossOver3

    sd = SymbolData(fromdate='2010-01-01')
    sd.symbol = Symbol.get_by_ticker('000001', index=True)


    bt = Backtest()
    bt.strategy = strategy
    bt.symboldata = sd

    bt.run_strategy()
    bt.print_report(output='file')




def _test_strat_with_symbol_list():
    """
    回测一个确定策略对于一组symbol的结果


    :return:
    """

    strategy = strat.CrossOver3
    tickers = ['601318', '600887', '601800']
    bt = Backtest()
    bt.backtest_strat_with_tickers(strategy, tickers)



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
    # _test_strat_with_symbol_list()


    print('=====END=======')