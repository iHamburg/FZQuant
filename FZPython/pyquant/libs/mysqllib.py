#!/usr/bin/env python
# coding: utf8
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pyquant.config import mysql as config
from pyquant.dbModels.symbol import Symbol

engine = create_engine("mysql+pymysql://%s:%s@%s/%s?charset=utf8" % (config['user'],config['password'],
                    config['host'],config['db']))
# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)
session = DBSession()


def query_to_obj(query):
    arr = []
    for row in query:
        arr.append(row.as_dict())

    return arr

def get_symbol_df(symbol):
    query = session.query(Symbol)


if __name__ == '__main__':
    """"""


    # insert()
    # update()
    # delete()
    # read()
    # insert_daily_price(('1', '12.9','2017-01-01'))
    # cursor = insert_symbol(('1','6001213','stock','我也不知道'))
    # cursor = insert_daily_price(('2','2017-01-02','11','12','13','14','11111'))
