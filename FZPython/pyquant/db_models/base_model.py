#!/usr/bin/env python
# coding: utf8

from pyquant.libs.mysqllib import  Base


class BaseModel2(Base):
    """"""
    __abstract__ = True
    # __table_args__ = { # 可以省掉子类的 __table_args__ 了
    #     'mysql_engine': 'InnoDB',
    #     'mysql_charset': 'utf8'
    # }
    #
    # @classmethod
    # def query(cls):
    #     """该类的query"""
    #     return session.query(cls)
    #
    # @classmethod
    # def get(cls, _id):
    #     return session.query(cls).get(_id)
    #
    # def to_dict(self):
    #     return {c.name: getattr(self, c.name) for c in self.__table__.columns}