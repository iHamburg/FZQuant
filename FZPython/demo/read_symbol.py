#!/usr/bin/env python
# coding: utf8


import tushare as ts
import pandas as pd

from pyquant.libs.mysqllib import session

from pyquant.db_models import Symbol



query_symbol = session.query(Symbol)

def read_symbol():

    for row in query_symbol.limit(10):
        print(row)

if __name__ == '__main__':
    """"""
    read_symbol()
    # download_index()
    # insert_index_to_symbol()

