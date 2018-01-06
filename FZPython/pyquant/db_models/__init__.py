#!/usr/bin/env python
# coding: utf8


from sqlalchemy import Column, String,Integer, Float, DateTime
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from pyquant.libs.mysqllib import session, Base
import pandas as pd


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    fullname = Column(String)
    password = Column(String)

    def __repr__(self):
        return "<User(name='%s', fullname='%s', password='%s')>" % (
            self.name, self.fullname, self.password)


class Symbol(Base):

    __tablename__ = 'symbol'
    __table_args__ = {
        'mysql_engine': 'InnoDB',
        'mysql_charset': 'utf8'
    }

    id = Column(Integer, primary_key=True)
    exchange_id = Column(Integer)
    ticker = Column(String)
    instrument = Column(String)
    name = Column(String)
    sector = Column(String)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __repr__(self):
        return "<Symbol(id='%s', exchange_id='%s', ticker='%s', instrument='%s', name='%s', sector='%s')>" % (
            self.id, self.exchange_id, self.ticker, self.instrument, self.name, self.sector)

    @staticmethod
    def get(_id):
        return session.query(__class__).get(_id)

    @staticmethod
    def query():
        return session.query(__class__)

    @staticmethod
    def find_all(limit=30, offset=0):
        # return session.query(__class__).filter(filter_context).limit(limit).offset(offset).all()
        return session.query(__class__).limit(limit).offset(offset).all()


    @staticmethod
    def get_by_ticker(ticker, index=False):
        """
        返回ticker的symbol
        :param ticker:
        :param index:
        :return:
        """
        return session.query(__class__).filter(Symbol.ticker == ticker,
                                               Symbol.instrument == ('index' if index else 'stock')).first()


class DailyPrice(Base):
    __tablename__ = 'daily_price'

    id = Column(Integer, primary_key=True)
    symbol_id = Column(Integer, ForeignKey('symbol.id'))
    price_date = Column(DateTime)
    open_price = Column(Float)
    high_price = Column(Float)
    low_price = Column(Float)
    close_price = Column(Float)
    volume = Column(Integer)
    symbol = relationship("Symbol",back_populates="daily_price")


    def __repr__(self):
        return "<Daily_price( symbol_id='%s', price_date='%s', o='%s', h='%s', l='%s', c='%s', v=='%s')>" % (
            self.symbol_id, self.price_date, self.open_price, self.high_price, self.low_price, self.close_price, self.volume)

    def to_dict(self):
        obj = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        obj['price_date'] = str(obj['price_date'])
        # obj['symbol'] = self.symbol
        return  obj


    @staticmethod
    def get_by_symbol_id(symbol_id, fromdate=None, todate=None, output = 'dict'):
        """
        根据symbol_id 查daily price

        :param symbol_id:
        :param fromdate:
        :param todate:
        :param output:
        :return:
        """
        where = []

        where.append(DailyPrice.symbol_id == symbol_id)

        if fromdate:
            where.append(DailyPrice.price_date >= fromdate)

        if todate:
            where.append(DailyPrice.price_date < todate)

        # print(where)

        if output == 'df':
            df = pd.read_sql(session.query(DailyPrice).filter(*where).statement, session.bind)
            del df['id']
            del df['symbol_id']
            df = df.set_index('price_date')
            df.columns =  ['open', 'high',  'low','close', 'volume']
            cols = ['open', 'high', 'close', 'low', 'volume']
            df = df.ix[:, cols]
            return df
        else:

            return [row.to_dict() for row in session.query(DailyPrice).filter(*where).all()]

    @staticmethod
    def get(id):
        return session.query(DailyPrice).get(id)

Symbol.daily_price = relationship("DailyPrice", back_populates="symbol")



def _get():
    s = Symbol.get(17)
    print(s.name)
    print(Symbol.get(17))

def _query():
    Symbol.query()


def _query_relation():

    query = session.query(DailyPrice).filter(DailyPrice.id == '7798525').all()
    pprint.pprint([row.to_dict() for row in query])


def _query_join():
    pprint.pprint(session.query(DailyPrice).join(Symbol).filter(Symbol.id == 2433).all())


def _symbol_find_all():
    # print(Symbol.find_all((Symbol.id > 200),10))
    print(Symbol.find_all(limit = 10))


if __name__ == '__main__':
    """"""
    import pprint
    # _query()
    #
    # _get()
    # print(Symbol.get_by_ticker('000001', True))
    # query_relation()
    # _query_join()
    # _symbol_find_all()
    # print(Symbol.query().limit(10).all())