# import pyquant.libs.mongolib as mongolib
# import pyquant.libs.tusharelib as tusharelib
# from pyquant.models.security import *
# from pyquant.models.datasource import *

from pyquant.db_models import (Symbol, DailyPrice)
# from pyquant.models.datasource import *


class SymbolData(object):
    """
    封装
    datasource
    values
    fromedate
    todate

    """

    symbol = None
    symbol_id = None
    fromdate = None
    todate = None
    time_type = 'D'

    date = []
    values = []
    volume = []
    df = None
    # datasource = None

    def __init__(self, symbol_id, **kwargs):
        """
        ?? 需要symbol还是symbol_id?
        :param security:
        :param _datasource: 类名
        :param kwargs:
        """
        self.symbol_id = symbol_id
        self.symbol = Symbol.get_by_id(symbol_id)
        # self.datasource = _datasource()

        if 'fromdate' in kwargs.keys():
            self.fromdate = kwargs['fromdate']

        if 'todate' in kwargs.keys():
            self.todate = kwargs['todate']

        if 'time_type' in kwargs.keys():
            self.time_type = kwargs['time_type']

    def get_daily_price(self, output='dict'):
        return DailyPrice.get_by_symbol_id(self.symbol_id, fromdate=self.fromdate, todate=self.todate, output=output)




def _test_get_daily_price():
    # symbol = Symbol.get(17)
    sd = SymbolData(17)
    print(sd.get_daily_price())



if __name__ == '__main__':
    """
    """
    # stock = Stock('002119')
    # sd = SecurityData(stock, TushareSource, fromdate='2017-01-01')
    # print(sd.get_data())
    _test_get_daily_price()