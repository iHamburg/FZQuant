import pyquant.libs.mongolib as mongolib
import pyquant.libs.tusharelib as tusharelib
from pyquant.models.security import *

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
    def __init__(self,security, time_type='D', **kwargs):
        self.security = security
        self.time_type = time_type

        if 'fromdate' in kwargs.keys():
            self.fromdate = kwargs['fromdate']

        if 'todate' in kwargs.keys():
            self.todate = kwargs['todate']

    @property
    def collection_name(self):
        return 's' + self.security.code

    @property
    def api_values(self):
        return [[item['date'], item['open'], item['close'],item['high'], item['low'], item['volume']] for item in self.values]

    def get_values_from_mongo(self):
        data = mongolib.get_data(self.collection_name, fromdate = self.fromdate, todate=self.todate)

        self.date = [item['date'] for item in data]
        self.volume = [item['volume'] for item in data]
        self.values = data

    def get_values_from_tushare(self):
        self.df = tusharelib.get_data_df(self.security.code, False)

    def insert_values_to_mongo(self):
        mongolib.insert_data(self.security.code, self.df, False)
