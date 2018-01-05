#!/usr/bin/env python
# coding: utf8


import tushare as ts
import pandas as pd


from pyquant.dbModels.symbol import Symbol

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("mysql+pymysql://root:root@121.42.26.144/fzquant?charset=utf8")

# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)
session = DBSession()



def download_instutry_classfied():
    """下载工业数据"""
    df = ts.get_industry_classified()
    df.to_excel('industry_classified.xlsx')

def insert_symbol_table():
    df = pd.read_excel('industry_classified.xlsx', sheet_name='Sheet1')

    for indexs in df.index:
        arr = df.loc[indexs].values
        print(arr[0])
        symbol = Symbol(ticker=str(arr[0]), instrument='stock', name=arr[1], sector=arr[2])
        # 添加到session:
        session.add(symbol)
        # 提交即保存到数据库:
        session.commit()

def batch_insert_symbol_table():
    df = pd.read_excel('industry_classified.xlsx', sheet_name='Sheet1')

    for indexs in df.index:
        arr = df.loc[indexs].values
        print(arr[0])
        symbol = Symbol(ticker=str(arr[0]), instrument='stock', name=arr[1], sector=arr[2])
        # 添加到session:
        session.add(symbol)

    # 提交即保存到数据库:
    session.commit()


def update_tick():
    """tick 需要补零"""
    for instance in session.query(Symbol).filter(Symbol.ticker < 10000):
        ticker = instance.ticker
        new_ticker = ''
        for i in range(6-len(ticker)):
            new_ticker += '0'
        new_ticker += ticker
        instance.ticker = new_ticker
        print(ticker, new_ticker)

    session.commit()

def download_index():
    """下载指数"""
    df = ts.get_index()
    df.to_excel('index.xlsx')

def insert_index_to_symbol():
    df = pd.read_excel('index.xlsx', sheet_name='Sheet1')
    for indexs in df.index:
        arr = df.loc[indexs].values
        print(arr)
        ticker = str(arr[0])
        new_ticker = ''
        for i in range(6 - len(ticker)):
            new_ticker += '0'
        new_ticker += ticker

        symbol = Symbol(ticker=new_ticker, instrument='index', name=arr[1])
        session.add(symbol)

    session.commit()

if __name__ == '__main__':
    """"""
    # update_tick()
    # download_index()
    # insert_index_to_symbol()

