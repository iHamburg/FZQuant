import tushare as ts
from pymongo import MongoClient
import json
import time

stockList = ['600196','601933','600703']
df = ts.get_realtime_quotes(stockList) #Single stock symbol
# print(df)


conn = MongoClient('121.42.26.144', 27017)

while True:
    # 每隔3秒执行一次数据
    time.sleep(3)
    df = ts.get_realtime_quotes(stockList) #Single stock symbol
    print(df)
    conn.db.tickdata.insert(json.loads(df.to_json(orient='records')))