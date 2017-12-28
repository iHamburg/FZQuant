#!/usr/bin/env python
# coding: utf8

from pyquant.models.security import *
from pyquant.models.securitydata import *
import pyquant.libs.datalib as datalib

a = Security('1','sh','stock')
print(a.market)

b = Stock('002119','sz')
print(b.type)

data = SecurityData(b)

data.get_values_from_tushare()
data.insert_values_to_mongo()
data.get_values_from_mongo()
print(data.date)
# print(datalib.get_security(b))