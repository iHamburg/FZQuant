#!/usr/bin/env python
# coding: utf8

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String,Integer
Base = declarative_base()

class Symbol(Base):
    __tablename__ = 'symbol'

    id = Column(Integer, primary_key=True)
    exchange_id = Column(Integer)
    ticker = Column(String)
    instrument = Column(String)
    name = Column(String)
    sector = Column(String)


    def __repr__(self):
        return "<Symbol(id='%s', exchange_id='%s', ticker='%s', instrument='%s', name='%s', sector='%s')>" % (
            self.id, self.exchange_id, self.ticker, self.instrument, self.name, self.sector)


if __name__ == '__main__':
    """"""
    from sqlalchemy import create_engine
    from sqlalchemy.orm import sessionmaker

    engine = create_engine("mysql+pymysql://root:root@121.42.26.144/fzquant?charset=utf8")

    # 创建DBSession类型:
    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    for instance in session.query(Symbol).filter(Symbol.ticker < 10000):
        print(instance)