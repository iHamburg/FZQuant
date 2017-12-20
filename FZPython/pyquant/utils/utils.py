#!/usr/bin/env python
# coding: utf8

import datetime
import pandas as pd
import backtrader as bt
import tushare as ts
import time
import pyquant.libs.mongolib as mongolib

def printAnalysers(strats):
    """
     Params:

     """
    for strat in strats:
        print('--------------------------------------------------')
        if type(strat)==list: strat = strat[0]

        # strat = strat[0]  # 在opt中strat是列表
        print('Parameter: ', strat.p._getkwargs())
        for item in strat.analyzers:
            print(item.get_analysis())
        print('==================================================')



def looprun(interval=0,fcn=None, **kwargs):
    """
    定时循环运行方法

    :param interval: 时间间隔
    :param fcn: 函数名
    :param kwargs: 函数参数
    :return:
    """

    if interval > 0:
        while True:
            time.sleep(interval)
            fcn(**kwargs)
    else :
        fcn(**kwargs)


if __name__ == '__main__':
    print("======= Begin")
    # print(get_stock('600191'))
    # print(get_stock_df('600191'))


    # get_stock_from_tushare('600192')

    print('===== ENDE ====')