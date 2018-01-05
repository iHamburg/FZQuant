#!/usr/bin/env python
# coding: utf8

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String,Integer, DateTime, Float
Base = declarative_base()

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



if __name__ == '__main__':
    """"""
    from sqlalchemy import create_engine
    from sqlalchemy.orm import sessionmaker

    engine = create_engine("mysql+pymysql://root:root@121.42.26.144/fzquant?charset=utf8")

    # 创建DBSession类型:
    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    for instance in session.query(Daily_price).filter(Daily_price.symbol_id == '1'):
        print(instance)

