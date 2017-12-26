# -*- coding: utf-8 -*-
##
# @brief

import pyquant.libs.mongolib as mongolib
import pyquant.libs.tusharelib as tusharelib
import json
from bson.json_util import dumps


def get_api_data(code, index=False, **kwargs):
    """返回api 需要的data数据
        date, OCLH,volume
    """
    data = mongolib.get_data(code,index,**kwargs)

    data = [[ item['date'],item['open'], item['close'],item['low'],item['high'],item['volume']] for item in data]
    #  要区分压根没有code和加上搜索参数后没有数据的区别！
    # data = json.loads(dumps(data))
    return data

def insert_data(code,index=False, **kwargs):
    """ 从tushare拉数据，存入mongodb"""
    print('insert index', index)
    df = tusharelib.get_data_df(code,index)
    mongolib.insert_data(code,df,index)
    return

