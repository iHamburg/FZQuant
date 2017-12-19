# -*- coding: utf-8 -*-

import tushare as ts
from pymongo import MongoClient
import json
import time
import pyquant.libs.mongolib as mongolib

def simpleInsert():

    table='s601933'

    df = ts.get_k_data('601933',index=False,start='2017-01-01')

    print(df)


    conn = MongoClient('localhost', 27017)
    db = conn.fzquant
    table = db[table]
    table.insert(json.loads(df.to_json(orient='records')))

def mongolibInsert():
    df = ts.get_k_data('601933', index=False)
    mongolib.insertStock('601933',df)

if __name__ == '__main__':
    mongolibInsert()
