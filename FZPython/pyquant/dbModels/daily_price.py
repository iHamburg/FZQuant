#!/usr/bin/env python
# coding: utf8

import pandas as pd
import json
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String,Integer, DateTime, Float
Base = declarative_base()
from pyquant.libs.mysqllib import session


class Daily_price(Base):
    __tablename__ = 'daily_price'

    id = Column(Integer, primary_key=True)
    symbol_id = Column(Integer)
    price_date = Column(DateTime)
    open_price = Column(Float)
    high_price = Column(Float)
    low_price = Column(Float)
    close_price = Column(Float)
    volume = Column(Integer)

    def __repr__(self):
        return "<Daily_price( symbol_id='%s', price_date='%s', o='%s', h='%s', l='%s', c='%s', v=='%s')>" % (
            self.symbol_id, self.price_date, self.open_price, self.high_price, self.low_price, self.close_price, self.volume)

    def as_dict(self):
        obj = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        obj['price_date'] = str(obj['price_date'])
        return  obj


    @staticmethod
    def get_by_symbol_id(symbol_id, fromdate=None, todate=None, output = 'json'):
        """
        根据symbol_id 查daily price

        :param symbol_id:
        :param fromdate:
        :param todate:
        :param output:
        :return:
        """
        where = []

        where.append(Daily_price.symbol_id == symbol_id)

        if fromdate:
            where.append(Daily_price.price_date >= fromdate)

        if todate:
            where.append(Daily_price.price_date < todate)

        # print(where)

        if output == 'df':
            df = pd.read_sql(session.query(Daily_price).filter(*where).statement,session.bind)
            del df['id']
            del df['symbol_id']
            df = df.set_index('price_date')
            df.columns =  ['open', 'high',  'low','close', 'volume']
            cols = ['open', 'high', 'close', 'low', 'volume']
            df = df.ix[:, cols]
            return df
        else:
            arr = []
            for row in session.query(Daily_price).filter(*where).all():
                arr.append(row.as_dict())

            # print('arr', arr)
            return arr

    @staticmethod
    def get(id):
        return session.query(Daily_price).get(id)


def test_get_by_symbol_id():
    print(Daily_price.get_by_symbol_id(17,output='df', fromdate='2018-01-01'))


def test_get_by_id():
    print(Daily_price.get(2762641))

if __name__ == '__main__':
    """"""
    # test_get_by_symbol_id()
    # test_get_by_id()

    # from pyquant.libs.mysqllib import session
    # for instance in session.query(Daily_price).filter(Daily_price.symbol_id == '17'):
    #     print(instance)

    test_get_by_symbol_id()