#!/usr/bin/env python
# 定期往数据库写入信息

#=========== 实现脚本运行操作 ============
import os
import sys
module_path = os.path.abspath(os.getcwd())
if module_path not in sys.path:
    sys.path.append(module_path)
#=========== 实现脚本运行操作 ============

import tushare as ts
import pyquant.libs.mongolib as mongolib
import pyquant.libs.socketioclient as sio
import pyquant.utils.utils as utils
import argparse


def run(stocklist):
    print('下载 stocklist', stocklist)
    df = ts.get_realtime_quotes(stocklist)
    # print(data)
    # 往socket服务器发送消息
    sio.emitTickData(df)
    # 往数据库里写数据
    mongolib.insertTickData(df)

def _parse_args():
    parser = argparse.ArgumentParser(
        description='Showcase for Order Execution Types')

    parser.add_argument('--stocklist','-s',
                        default=['600196','601933','600703'],
                        help='stock list')

    parser.add_argument('--interval', '-i',
                        default=0,
                        help='循环时间间隔')


    return parser.parse_args()

def main():

    args = _parse_args()
    utils.looprun(args.interval,run,stocklist=args.stocklist)

if __name__ == '__main__':
    main()