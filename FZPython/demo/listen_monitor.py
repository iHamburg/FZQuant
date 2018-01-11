#!/usr/bin/env python
# coding: utf8

from pyquant.utils.monitor import listener, Monitor

@listener(Monitor)
def getinfo():
    print("hello ,welcome!");



if __name__ == '__main__':
    getinfo()