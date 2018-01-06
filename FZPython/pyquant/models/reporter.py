# import pyquant.libs.mongolib as mongolib
# import pyquant.libs.tusharelib as tusharelib
# from pyquant.models.security import *
# from pyquant.models.datasource import *


class Reporter(object):
    """

    """

    _backtest = None
    fromdate = None
    todate = None
    strategy = None
    starting_cash = 1000
    end_cash = 1000
    commission = 0
    end_cash = 0
    total_value = 0
    strategy_name = None
    strategy_params = None
    symbol_ticker = None
    symbol_name = None
    total_returns = 0
    sharpe_ratio = 0



    def __init__(self, backtest, **kwargs):
        """
        ?? 需要symbol还是symbol_id?
        :param security:
        :param _datasource: 类名
        :param kwargs:
        """
        self._backtest = backtest

    # def to_dict(self):
    #     return {c.name: getattr(self, c.name) for c in self.__dict__}


if __name__ == '__main__':
    """
    """
    rep = Reporter(None)
    rep.commission = 12
    print(rep.__dict__)