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

def query_to_json(query):
    arr = []
    for row in query:
        arr.append(row.as_dict())

    return arr

if __name__ == '__main__':
    """"""

    from pyquant.dbModels.symbol import Symbol as m_symbol
    from pyquant.libs.mysqllib import session, engine

    query = session.query(m_symbol)

    print(query_to_json(query.all()))