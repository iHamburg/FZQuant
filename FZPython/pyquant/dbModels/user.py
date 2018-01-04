#!/usr/bin/env python
# coding: utf8

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String,Integer
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    fullname = Column(String)
    password = Column(String)

    def __repr__(self):
        return "<User(name='%s', fullname='%s', password='%s')>" % (
            self.name, self.fullname, self.password)


if __name__ == '__main__':
    """"""
    from sqlalchemy import create_engine
    from sqlalchemy.orm import sessionmaker

    engine = create_engine("mysql+pymysql://root:root@121.42.26.144/fzquant?charset=utf8")

    # 创建DBSession类型:
    DBSession = sessionmaker(bind=engine)
    session = DBSession()
    user = session.query(User).filter(User.id == '1').one()
    # print('type:', type(user))
    print(user)