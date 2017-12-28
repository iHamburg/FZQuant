#!/usr/bin/env python
# coding: utf8

import pyquant.libs.tusharelib as tusharelib
import pyquant.libs.mongolib as mongolib
from pyquant.models.datasource import MongoSource

def fill_data(code,index):
    """
    从tushare下载数据到mongolib
    :return:
    """

    df = tusharelib.get_data(code, index)
    col_name = MongoSource.get_col_name(code)
    mongolib.insert_data(col_name,df)

    return