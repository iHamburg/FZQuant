#!/usr/bin/env python
# coding: utf8

import pyquant.utils.utils as utils

print(range(10))

squares = [x for x in range(10) if x > 9]
print(squares)

from pyquant.db_models import Symbol, User

print(Symbol.get_by_ticker('600080'))
print(Symbol.find_all(limit=10))



