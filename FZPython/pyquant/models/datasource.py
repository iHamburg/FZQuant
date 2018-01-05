
import pyquant.libs.tusharelib as tusharelib
import pyquant.libs.mongolib as mongolib
from pyquant.dbModels.daily_price import Daily_price

class Datasource(object):
    """
    Datasource 是对外模块的Wrapper

    """
    type = None
    def __init__(self, type = None,  **kwargs):
        self.type = type


    def get_data(self, code, output='df', **kwargs):
        """
        查询daily_price数据

        :param code:
        :param output:
        :param kwargs:
        :return:
        """
        raise NotImplementedError


    def get_daily_price(self, symbol_data):
        raise NotImplementedError

class TushareSource(Datasource):
    """
    Tushare 数据源
    """
    def __init__(self, **kwargs):
        super(TushareSource, self).__init__('tushare', **kwargs)

    @classmethod
    def is_code_index(cls,code):
        if code == '000001':
            return True

        return False

    def get_data(self, code, output='df', **kwargs):

        is_index = TushareSource.is_code_index(code)
        return tusharelib.get_data(code,is_index, output, **kwargs)


class MongoSource(Datasource):

    def __init__(self, **kwargs):
        super(MongoSource, self).__init__('mongodb', **kwargs)


    @classmethod
    def get_col_name(cls, code):
        return 's'+code

    def get_data(self, code, output='df', **kwargs):
        col_name = MongoSource.get_col_name(code)
        return mongolib.get_data(col_name,output,**kwargs)




class MySQLSource(Datasource):
    """
        从Mysql中操作数据
    """

    def get_daily_price(self, symbol_data):
        """
        用symbol_data的symbol，从mysql中获得daily_price 数据
        :param symbol_data:
        :return:
        """
        symbol = symbol_data.symbol
        # 根据symbol_id去查数据
        return Daily_price.get_by_symbol_id(symbol.id, output='df',fromdate = symbol_data.fromdate, todate = symbol_data.todate)



def test_mysql_get_daily_price():
    source = MySQLSource()
    print(source.get_daily_price())

if __name__ == '__main__':
    print("Begin")

    # source = MongoSource()
    source = TushareSource()
    print(source.get_data('002119'))


    print('===== ENDE ====')