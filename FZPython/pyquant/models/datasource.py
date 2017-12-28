
import pyquant.libs.tusharelib as tusharelib
import pyquant.libs.mongolib as mongolib
class Datasource(object):
    """

    """
    type = None
    def __init__(self, type,  **kwargs):
        self.type = type


    def get_df(self, code, **kwargs):
        pass

    def get_list(self, code, **kwargs):
        pass

    def get_data(self, code, output='df', **kwargs):
        raise NotImplementedError


class TushareSource(Datasource):
    """
    Tushare 数据源
    """
    def __init__(self, **kwargs):
        super(TushareSource, self).__init__('tushare', **kwargs)

    def get_df(self, code, **kwargs):
        df = tusharelib.get_df(code)
        return  df

    def get_list(self, code, **kwargs):
        pass

    def get_data(self, code, output='df', **kwargs):

        return tusharelib.get_data(code,False, output, **kwargs)


class MongoSource(Datasource):

    def __init__(self, **kwargs):
        super(MongoSource, self).__init__('mongodb', **kwargs)

    def get_df(self, code, **kwargs):
        df = mongolib.get_df('s'+code, **kwargs)

        return  df

    def get_data(self, code, output='df', **kwargs):
        return mongolib.get_data('s'+code,output,**kwargs)