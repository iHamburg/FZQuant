#!/usr/bin/env python
# coding: utf8
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("mysql+pymysql://root:root@121.42.26.144/fzquant?charset=utf8")

# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)
session = DBSession()



if __name__ == '__main__':
    """"""
    # insert()
    # update()
    # delete()
    # read()
    # insert_daily_price(('1', '12.9','2017-01-01'))
    # cursor = insert_symbol(('1','6001213','stock','我也不知道'))
    # cursor = insert_daily_price(('2','2017-01-02','11','12','13','14','11111'))
