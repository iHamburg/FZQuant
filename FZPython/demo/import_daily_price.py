#!/usr/bin/env python
# coding: utf8


import tushare as ts
import pandas as pd


from pyquant.dbModels.symbol import Symbol
from pyquant.dbModels.daily_price import Daily_price

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("mysql+pymysql://root:root@121.42.26.144/fzquant?charset=utf8")

# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)
session = DBSession()
query = session.query(Daily_price)



def insert_daily_price(symbol):
    print('begin insert', symbol)
    index = (True if symbol.instrument == 'index' else False)
    df = ts.get_k_data(symbol.ticker, index = index, start = '1918-01-01')
    # print(df.dtypes)
    for indexs in df.index:
        arr = df.loc[indexs].values
        # print(arr)

        session.add(Daily_price(symbol_id = symbol.id, price_date = arr[0], open_price = float(arr[1]), close_price=float(arr[2]),
                                high_price = float(arr[3]), low_price = float(arr[4]), volume = int(arr[5])))


    session.commit()
    print('after insert', symbol)

def get_latest_daily_price_by_symbol_id():
    return  session.query(Daily_price).order_by(Daily_price.symbol_id.desc()).first()

def delete_symbol_id(symbol_id):
    print('delete', symbol_id)
    query.filter(Daily_price.symbol_id == symbol_id).delete(synchronize_session=False)
    session.commit()



if __name__ == '__main__':
    """"""
    # update_tick()
    # download_index()
    # insert_index_to_symbol()
    # insert_daily_price()

    # symbol = session.query(Symbol).get()
    # insert_daily_price(symbol)

    # print(get_latest_symbol())
    # daily_price = get_latest_symbol()
    # delete_symbol_id(daily_price.symbol_id)

    for symbol in session.query(Symbol).filter(Symbol.id>17).limit(10):
        insert_daily_price(symbol)


