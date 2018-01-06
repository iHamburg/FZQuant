import pyquant.libs.mongolib as mongolib
import pyquant.libs.tusharelib as tusharelib
from pyquant.models.security import *
from pyquant.models.datasource import *


class SecurityData(object):
    """
    包括
    security
    datasource
    values
    fromedate
    todate

    """

    symbol = None
    fromdate = None
    todate = None
    time_type = 'D'
    date = []
    values = []
    volume = []
    df = None
    security = None
    datasource = None

    def __init__(self, security, _datasource, **kwargs):
        """

        :param security:
        :param _datasource: 类名
        :param kwargs:
        """
        self.security = security
        self.datasource = _datasource()

        if 'fromdate' in kwargs.keys():
            self.fromdate = kwargs['fromdate']

        if 'todate' in kwargs.keys():
            self.todate = kwargs['todate']

        if 'time_type' in kwargs.keys():
            self.time_type = kwargs['time_type']

    def get_data(self, output='df'):
        return self.datasource.get_data(self.security.code,
                                        output,fromdate=self.fromdate,todate = self.todate)

    def get_daily_price(self, output = 'df'):
        return self.datasource.get_daily_price()


if __name__ == '__main__':
    stock = Stock('002119')
    sd = SecurityData(stock, TushareSource, fromdate='2017-01-01')
    print(sd.get_data())