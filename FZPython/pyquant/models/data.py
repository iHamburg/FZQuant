import pyquant.libs.mongolib as mongolib
import pyquant.libs.tusharelib as tusharelib
from pyquant.models.security import *
from pyquant.models.datasource import *

class SecurityData(object):

    fromdate = None
    todate = None
    time_type = 'D'
    collection_name = None
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

    @property
    def collection_name(self):
        return 's' + self.security.code

    @property
    def api_values(self):
        return [[item['date'], item['open'], item['close'],item['high'], item['low'], item['volume']] for item in self.values]


    def get_df(self):
        return self.datasource.get_df(self.security.code)

    def get_list(self):pass

    def get_data(self, output='df'):
        return self.datasource.get_data(self.security.code, output, fromdate = self.fromdate,
                                        todate = self.todate)



if __name__ == '__main__':
    stock = Stock('002119')
    sd = SecurityData(stock, TushareSource, fromdate='2017-01-01')
    print(sd.get_data())