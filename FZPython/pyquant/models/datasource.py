
import pyquant.libs.tusharelib as tusharelib
import pyquant.libs.mongolib as mongolib

class Datasource(object):
    """
    Datasource 是对外模块的Wrapper

    """
    type = None
    def __init__(self, type,  **kwargs):
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
    def get_data(self, code, output='df', **kwargs):
        col_name = MongoSource.get_col_name(code)
        return mongolib.get_data(col_name,output,**kwargs)


if __name__ == '__main__':
    print("Begin")

    # source = MongoSource()
    source = TushareSource()
    print(source.get_data('002119'))


    print('===== ENDE ====')