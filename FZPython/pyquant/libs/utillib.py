#!/usr/bin/env python
# coding: utf8

import time
import datetime
import pyquant.libs.tusharelib as tusharelib
import pyquant.libs.mongolib as mongolib
# from pyquant.models.datasource import MongoSource


# def fill_data(code,index):
#     """
#     从tushare下载数据到mongolib
#     :return:
#     """
#
#     df = tusharelib.get_data(code, index)
#     col_name = MongoSource.get_col_name(code)
#     mongolib.insert_data(col_name,df)
#
#     return

def get_today():
    today = datetime.datetime.now().strftime('%Y-%m-%d')
    return today


def list_to_string(l):
    l = [str(item) for item in l]
    return "".join(l)


if __name__ == '__main__':
    """"""

    from pyquant.db_models import Symbol as m_symbol
    from pyquant.libs.mysqllib import session, engine

    query = session.query(m_symbol)

