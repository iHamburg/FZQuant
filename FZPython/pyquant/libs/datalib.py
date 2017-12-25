# -*- coding: utf-8 -*-
##
# @brief

import tushare as ts
import pyquant.libs.mongolib as mongolib
import json
from bson.json_util import dumps

def get_data_df(code, index=False):
    """
    从 tushare 下载 股票 日数据
    :param code:
    :return:
    """
    print('从tushare下载',code,index)

    df = ts.get_k_data(code, index=index, start="1990-1-1")

    return df

def get_api_data(code, index=False, **kwargs):
    """返回api 需要的data数据"""
    data = mongolib.get_data(code,index,**kwargs)

    #  要区分压根没有code和加上搜索参数后没有数据的区别！
    data = json.loads(dumps(data))
    return data