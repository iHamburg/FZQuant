#!/usr/bin/env python
# coding: utf8


import tushare as ts


from pyquant.db_models import Symbol
from pyquant.db_models import DailyPrice

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("mysql+pymysql://root:root@121.42.26.144/fzquant?charset=utf8")

# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)
session = DBSession()
query = session.query(DailyPrice)



def insert_daily_price(symbol, fromdate='1900-01-01'):
    """批量插入数据"""
    print('begin insert', symbol)
    index = (True if symbol.instrument == 'index' else False)
    df = ts.get_k_data(symbol.ticker, index = index, start=fromdate)
    print('下载数据完备',symbol.ticker)
    daily_prices = []

    for indexs in df.index:
        arr = df.loc[indexs].values

        daily_prices.append(dict(symbol_id=symbol.id, price_date=arr[0], open_price=float(arr[1]), close_price=float(arr[2]),
                  high_price=float(arr[3]), low_price=float(arr[4]), volume=int(arr[5])))

    session.execute(
        DailyPrice.__table__.insert(),
        daily_prices
    )
    session.commit()

    print('after insert', symbol)



def get_latest_daily_price_by_symbol_id():
    return  session.query(DailyPrice).order_by(DailyPrice.symbol_id.desc()).first()


def main():

    for symbol in session.query(Symbol).filter(Symbol.id>820).all():
        insert_daily_price(symbol)






if __name__ == '__main__':
    """"""
    # update_tick()
    # download_index()
    # insert_index_to_symbol()
    # insert_daily_price()

    # symbol = session.query(Symbol).get(20)
    # insert_daily_price(symbol)

    # print(get_latest_symbol())
    # daily_price = get_latest_symbol()
    # delete_symbol_id

    # main()

