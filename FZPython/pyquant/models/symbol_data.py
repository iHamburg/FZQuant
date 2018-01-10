# import pyquant.libs.mongolib as mongolib
# import pyquant.libs.tusharelib as tusharelib
# from pyquant.models.security import *
# from pyquant.models.datasource import *

from pyquant.db_models import (Symbol, DailyPrice)


class SymbolData(object):
    """
    封装
    datasource
    values
    fromedate
    todate

    """

    _symbol = None
    # symbol_id = None
    fromdate = None
    todate = None
    time_type = 'D'

    date = []
    values = []
    volume = []
    _df = None


    def __init__(self, symbol_id = None, ticker=None, index=False,**kwargs):
        """
        ?? 需要symbol还是symbol_id?
        :param security:
        :param _datasource: 类名
        :param kwargs:
        """


        if ticker:
            self._symbol = Symbol.get_stock_by_ticker(ticker, index=index)
        elif symbol_id:
            self._symbol = Symbol.get_by_id(symbol_id)

        # self.datasource = _datasource()

        if 'fromdate' in kwargs.keys():
            self.fromdate = kwargs['fromdate']

        if 'todate' in kwargs.keys():
            self.todate = kwargs['todate']

        if 'time_type' in kwargs.keys():
            self.time_type = kwargs['time_type']

    @property
    def df(self):
        if not self._df:
            self._df = self.get_daily_price(output='df')
        return self._df

    @property
    def symbol(self):
        return self._symbol

    @symbol.setter
    def symbol(self, value):
        self._symbol = value

    @property
    def symbol_id(self):
        return self._symbol.id

    @symbol_id.setter
    def symbol_id(self, value):
        self._symbol = Symbol.get_by_id(value)


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