#!/usr/bin/env python
# coding: utf8



from pyquant.db_models import *
import pandas as pd


def import_sz50():
    """
    导入上证50数据
    :return:
    """

    file_path = '../datas/上证50_000016.txt'
    stock_index = StockIndex.get_by_id(2)
    with open(file_path, 'r', encoding='utf') as f:
        for line in f:
            obj = json.loads(line)
            symbol = Symbol.get_by_ticker(obj['ticker'])
            stock_index.symbol.append(symbol)

    session.commit()
    print('导入完成')

def import_stockindex_symbol(stockindex_id, file_path):
    """
    导入上证50数据
    :return:
    """

    # file_path = '../datas/上证50_000016.txt'
    stock_index = StockIndex.get_by_id(stockindex_id)

    with open(file_path, 'r', encoding='utf') as f:
        for line in f:
            obj = json.loads(line)
            symbol = Symbol.get_by_ticker(obj['ticker'])
            stock_index.symbol.append(symbol)

    session.commit()
    print('导入完成')


def import_cyb():
    """
    导入创业板 sybmol
    :return:
    """

    file_path = '../datas/创业板.json'
    df = pd.read_json(file_path)
    stock_index = StockIndex.get_by_id(9)

    for row in df.values:
        symbol = Symbol.get_by_ticker(row[0])
        stock_index.symbol.append(symbol)

    session.commit()
    print('导入完成')



if __name__ == '__main__':
    """"""
    # update_tick()
    # download_index()
    # insert_index_to_symbol()
    # download_gem()
    # print(ts.get_k_data('300067'))
    # import_sz50()
    # import_stockindex_symbol(7, '../datas/中证500_000905.txt')
    # import_cyb()