#!/usr/bin/env python
# coding: utf8

from multiprocessing import (Pool, Process)
import pyquant.libs.tusharelib as tusharelib
from pyquant.libs.mysqllib import *
from pyquant.db_models import *
from pyquant.libs.loglib import log
import time
import threading
from multiprocessing import Process, Pool
import os

def update_daily_price(symbol_id):
    """
    更新给定symbol_id 的数据

    :param symbol_id:
    :return:
    """
    print('update_daily_price', symbol_id)
    latest_dp_date = get_latest_dailyprice_date_with_symbol_id(symbol_id)

    if not latest_dp_date: # 如果该symbol 还没有 dailyprice
        latest_dp_date = datetime.date(1900,1,1)

    latest_trading_date = datetime.date.today()
    # print('latest_dp_date', latest_dp_date,'latst_trading_date', latest_trading_date)


    if latest_dp_date >= latest_trading_date:
        print('===END',symbol_id,'  latest_dp_date >= latest_trading_date 不需操作')
        return

    # 读取tushare
    fromdate = str(latest_dp_date + datetime.timedelta(days=1))

    rows = get_tushare_daily_data_with_symbol_id(symbol_id, 'dict',fromdate=fromdate)

    if not rows:
        print('===END',symbol_id,'tushare没有下载数据')
        return

    daily_prices = []

    for obj in rows:
        dp = dict(symbol_id=symbol_id, price_date=obj['date'],
                  open_price=float(obj['open']), close_price=float(obj['close']),
                  high_price=float(obj['high']), low_price=float(obj['low']),
                  volume=int(obj['volume']))
        daily_prices.append(dp)


    session.execute(
        DailyPrice.__table__.insert(),
        daily_prices
    )
    print('commit insert date', symbol_id)
    session.commit()
    print('===END',symbol_id, ' update 结束')


def get_latest_dailyprice_date_with_symbol_id(symbol_id):
    """
    返回symbol latest的dailyprice 日期
    :param symbol_id:
    :return: date
    """
    sql = 'SELECT max(price_date) as ldate FROM dailyPrice AS dp WHERE dp.symbol_id=%s' % symbol_id

    result = session.execute(sql).first()


    return result[0]


def get_tushare_daily_data_with_symbol_id(symbol_id, output='df', **kwargs):
    """
    根据symbol id 下载数据

    :param symbol_id:
    :param output:
    :param kwargs:
    :return:
    """

    symbol = Symbol.get_by_id(symbol_id)
    return tusharelib.get_daily_data(symbol.ticker, index=symbol.index, output=output, **kwargs)

def update_all_dailyprice():
    """
    更新所有symbol的dailyprice
    """

    symbols =  Symbol.get_all(limit=None, columns='id')
    count = len(symbols)

    for index, symbol in enumerate(symbols):
        # print(index, symbol)
        symbol_id = symbol[0]
        update_daily_price(symbol_id)
        log.info('更新完成 %d/%d' % (index+1, count))





def update_daily_price2(symbol_id):
    """
    更新给定symbol_id 的数据

    :param symbol_id:
    :return:
    """
    print('update_daily_price', symbol_id,  os.getpid())


    latest_dp_date = get_latest_dailyprice_date_with_symbol_id(symbol_id)
    print('latest_dp_date', symbol_id,  os.getpid())

    if not latest_dp_date: # 如果该symbol 还没有 dailyprice
        latest_dp_date = datetime.date(1900,1,1)

    latest_trading_date = datetime.date.today()
    # print('latest_dp_date', latest_dp_date,'latst_trading_date', latest_trading_date)


    # if latest_dp_date >= latest_trading_date:
    #     print('===END',symbol_id,'  latest_dp_date >= latest_trading_date 不需操作',  os.getpid())
    #     return
    #
    # 读取tushare
    fromdate = str(latest_dp_date + datetime.timedelta(days=1))

    rows = get_tushare_daily_data_with_symbol_id(symbol_id, 'dict',fromdate='2017-06-01')
    #
    # if not rows:
    #     print('===END',symbol_id,'tushare没有下载数据')
    #     return
    #
    # daily_prices = []
    #
    # for obj in rows:
    #     dp = dict(symbol_id=symbol_id, price_date=obj['date'],
    #               open_price=float(obj['open']), close_price=float(obj['close']),
    #               high_price=float(obj['high']), low_price=float(obj['low']),
    #               volume=int(obj['volume']))
    #     daily_prices.append(dp)
    #
    #
    # session.execute(
    #     DailyPrice.__table__.insert(),
    #     daily_prices
    # )
    # log.info('before commit insert date', symbol_id)
    # session.commit()
    # log.info('end commit insert date', symbol_id)
    print('===END',symbol_id, ' update 结束', os.getpid())


def update_all_dailyprice2():
    """
    更新所有symbol的dailyprice
    """

    symbols =  Symbol.get_all(limit=1000, columns='id')
    # count = len(symbols)

    p = Pool(4)
    for index, symbol in enumerate(symbols):
        # print(index, symbol)
        symbol_id = symbol[0]
        p.apply_async(update_daily_price2, args=(symbol_id,))

    print('Waiting for all subprocesses done...')
    p.close()
    p.join()
    print('All subprocesses done.')

def update_all_dailyprice_thread():
    """
    更新所有symbol的dailyprice
    """

    symbols =  Symbol.get_all(limit=1000, columns='id')
    # count = len(symbols)

    p = Pool(4)
    for index, symbol in enumerate(symbols):
        # print(index, symbol)
        symbol_id = symbol[0]
        p.apply_async(update_daily_price2, args=(symbol_id,))

    print('Waiting for all subprocesses done...')
    p.close()
    p.join()
    print('All subprocesses done.')

def get_index_symbol_ticker(index_name):
    """
    返回index
    :return:
    """


def _test_get_max_date():
    print(get_latest_dailyprice_date_with_symbol_id(17))


if __name__ == '__main__':
    """"""
    # _test_get_max_date()
    # print(get_tushare_daily_data_with_symbol_id(17, fromdate='2018-01-01'))
    # update_daily_price(369)
    # update_all_dailyprice()
    # print(get_latest_dailyprice_date_with_symbol_id(999999))

    # update_daily_price2(17)
    # update_all_dailyprice()
    update_all_dailyprice2()
    # while True:
    #     pass

    print('End of program')