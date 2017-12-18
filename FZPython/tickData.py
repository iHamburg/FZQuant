# coding: utf8
import tushare as ts
import pandas as pd
from pymongo import MongoClient
import time
import json

conn = MongoClient('121.42.26.144', 27017)

from socketIO_client import SocketIO, LoggingNamespace
socketIO = SocketIO('localhost', 3020, LoggingNamespace)

# TODO: 从哪里获得stockList？
stockList = ['600196','601933','600703']

def run(stocklist):
    df = ts.get_realtime_quotes(stocklist)

    # TOOD: 可以先缓存到本地文件。定时一起处理存到mongodb里
    # data = df['time'][0] + '  ' + df['volume'][0]
    # print(data)
    # 往socket服务器发送消息
    socketIO.emit('tickDataNotification', json.loads(df.to_json(orient='records')))


    # 往数据库里写数据
    # conn.db.tickdata.insert(json.loads(df.to_json(orient='records')))


if __name__ == '__main__':

    # df = ts.get_realtime_quotes('600196')
    #
    # print('json.loads',json.loads(df.to_json(orient='records')))


    # run(stockList)
    while True:
        # 每隔3秒执行一次数据
        time.sleep(3)
        run(stockList)
