#!/usr/bin/env python

"""
根据 symbol表，
获得 每个symbol的latest的dailyprice的日期

if latest trading date < latest trading date：
    download dailyprice from latest daily price to latest trading date from tushare
    insert the

"""


#=========== 实现脚本运行操作 ============
import os
import sys
module_path = os.path.abspath(os.getcwd())
if module_path not in sys.path:
    sys.path.append(module_path)


#=========== 实现脚本运行操作 ============

from pyquant.managers.data_manager import update_all_dailyprice
from pyquant.libs.loglib import log


log.info('begin update daily price')

update_all_dailyprice()

log.info('finished update daily price')