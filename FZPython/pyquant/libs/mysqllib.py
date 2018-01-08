#!/usr/bin/env python
# coding: utf8
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pyquant.config import mysql as config
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

__all__ = [
    'session',
    'engine',
    'Base'
]

engine = create_engine("mysql+pymysql://%s:%s@%s/%s?charset=utf8" %
                       (config['user'], config['password'], config['host'], config['db']))

# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)
session = DBSession(autocommit=False)

# Base = declarative_base()


class ModelMixin(object):

    @classmethod
    def get_by_id(cls,  id, columns=None, lock_mode=None):
        if hasattr(cls, 'id'):
            scalar = False
            if columns:
                if isinstance(columns, (tuple, list)):
                    query = session.query(*columns)
                else:
                    scalar = True
                    query = session.query(columns)
            else:
                query = session.query(cls)
            if lock_mode:
                query = query.with_lockmode(lock_mode)

            query = query.filter(cls.id == id)

            if scalar:
                return query.scalar()
            return query.first()
        return None

    @classmethod
    def get_all(cls, columns=None, offset=None, limit=30, order_by=None, lock_mode=None):
        if columns:
            if isinstance(columns, (tuple, list)):
                query = session.query(*columns)
            else:
                query = session.query(columns)
                if isinstance(columns, str):
                    query = query.select_from(cls)
        else:
            query = session.query(cls)

        if order_by is not None:
            if isinstance(order_by, (tuple, list)):
                query = query.order_by(*order_by)
            else:
                query = query.order_by(order_by)
        if offset:
            query = query.offset(offset)

        if limit:
            query = query.limit(limit)

        if lock_mode:
            query = query.with_lockmode(lock_mode)

        return query.all()

    @classmethod
    def count_all(cls, lock_mode=None):
        query = session.query(func.count('*')).select_from(cls)
        if lock_mode:
            query = query.with_lockmode(lock_mode)
        return query.scalar()

    @classmethod
    def exist(cls,  id, lock_mode=None):
        if hasattr(cls, 'id'):
            query = session.query(func.count('*')).select_from(cls).filter(cls.id == id)
            if lock_mode:
                query = query.with_lockmode(lock_mode)
            return query.scalar() > 0
        return False

    @classmethod
    def set_attr(cls, id, attr, value):
        """设置单属性"""
        if hasattr(cls, 'id'):
            session.query(cls).filter(cls.id == id).update({
                attr: value
            })
            session.commit()

    @classmethod
    def set_attrs(cls, id, attrs):
        """设置多属性"""
        if hasattr(cls, 'id'):
            session.query(cls).filter(cls.id == id).update(attrs)
            session.commit()


    @classmethod
    def query(cls):
        return session.query(cls)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}




BaseModel = declarative_base(cls=ModelMixin)

if __name__ == '__main__':
    """"""


