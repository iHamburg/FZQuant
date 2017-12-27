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

    # def get_values_from_mongo(self):
    #     data = mongolib.get_data(self.collection_name, fromdate = self.fromdate, todate=self.todate)
    #
    #     self.date = [item['date'] for item in data]
    #     self.volume = [item['volume'] for item in data]
    #     self.values = data
    #
    # def get_values_from_tushare(self):
    #     self.df = tusharelib.get_data_df(self.security.code, False)
    #
    # def insert_values_to_mongo(self):
    #     mongolib.insert_data(self.security.code, self.df, False)

    def get_df(self):
        return self.datasource.get_df(self.security.code)

    def get_list(self):pass



if __name__ == '__main__':
    stock = Stock('002119')
    sd = SecurityData(stock, TushareSource)
    print(sd.get_df())