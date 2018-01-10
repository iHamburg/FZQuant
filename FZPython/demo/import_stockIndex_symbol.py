#!/usr/bin/env python
# coding: utf8


import tushare as ts
import pandas as pd


from pyquant.db_models import Symbol

def download_gz50s():
    """下载上证50"""
    df = ts.get_sz50s()

    # df = ts.get_gem_classified()

    print(df)


def download_gem():
    """下载创业板"""

    df = ts.get_gem_classified()
    for indexs in df.index:
        row = df.loc[indexs].values
        ticker = row[0]
        s = Symbol.get_stock_by_ticker(ticker)
        print(s)
        if not s:
            print('ticker', ticker)

    # print(df)

if __name__ == '__main__':
    """"""
    # update_tick()
    # download_index()
    # insert_index_to_symbol()
    # download_gem()
    # print(ts.get_k_data('300067'))
    download_gz50s()
    # print(ts.get_hs300s())
