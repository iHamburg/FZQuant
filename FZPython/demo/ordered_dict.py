#!/usr/bin/env python
# coding: utf8

import collections
# 通过OrderedDict类创建的字典是有序的
dic = collections.OrderedDict()
dic['k1'] = 'v1'
dic['k2'] = 'v2'
dic['k3'] = 'v3'
print(dic)

print(dic.keys())
print(dic.values())
print(dic.items())

for k,v in dic.items():
    print(k,v)