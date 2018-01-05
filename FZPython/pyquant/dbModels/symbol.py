#!/usr/bin/env python
# coding: utf8

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String,Integer
Base = declarative_base()

from pyquant.libs.mysqllib import session

# query = session.query(Symbol)

class Symbol(Base):
    __tablename__ = 'symbol'

    id = Column(Integer, primary_key=True)
    exchange_id = Column(Integer)
    ticker = Column(String)
    instrument = Column(String)
    name = Column(String)
    sector = Column(String)



    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __repr__(self):
        return "<Symbol(id='%s', exchange_id='%s', ticker='%s', instrument='%s', name='%s', sector='%s')>" % (
            self.id, self.exchange_id, self.ticker, self.instrument, self.name, self.sector)

    @staticmethod
    def get(id):
        return session.query(Symbol).get(id)



if __name__ == '__main__':
    """"""
    # for instance in session.query(Symbol).filter(Symbol.ticker < 10000):
    #     print(instance)
    print(Symbol.get_by_id(17))
