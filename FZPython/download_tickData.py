#!/usr/bin/env python

# coding: utf8
# 定期往数据库写入信息

import tushare as ts
# import .pyquant.libs.mongolib as mongolib
import pyquant.libs.socketioclient as sio
from pyquant.libs.mongolib import mongolib
import time
import argparse

# TODO: 从哪里获得stockList？
stockList = ['600196','601933','600703']

def run(stocklist):
    df = ts.get_realtime_quotes(stocklist)
    # print(data)
    # 往socket服务器发送消息
    sio.emitTickData(df)
    # 往数据库里写数据
    mongolib.insertTickData(df)

def looprun(interval=0):
    """

    :param interval: 循环周期
    :return:
    """
    if interval > 0:
        while True:
            # 每隔3秒执行一次数据
            time.sleep(interval)
            run(stockList)
    else :
        run(stockList)




def _parse_args():
    parser = argparse.ArgumentParser(
        description='Showcase for Order Execution Types')

    parser.add_argument('stock',
                        default='../datas/stock/600398.csv',
                        help='stock list')


    return parser.parse_args()

def main():
    """

    :return:
    """


    args = _parse_args()
    print(args)


if __name__ == '__main__':
    main()