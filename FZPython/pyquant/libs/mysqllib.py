#!/usr/bin/env python
# coding: utf8
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pyquant.config import mysql as config
from sqlalchemy.ext.declarative import declarative_base


__all__ = [
    'session',
    'engine',
    'Base',
]

engine = create_engine("mysql+pymysql://%s:%s@%s/%s?charset=utf8" %
                       (config['user'], config['password'], config['host'], config['db']))
# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)
session = DBSession()

Base = declarative_base()



if __name__ == '__main__':
    """"""


