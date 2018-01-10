#!/usr/bin/env python
# coding: utf8
import time
import functools

class Monitor:
    @staticmethod
    def startmonitor():
        return time.clock();

    @staticmethod
    def endmonitor():
        return time.clock();


def listener(listen):
    def log(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            startime=listen.startmonitor();
            f=func(*args, **kw);
            endtime=listen.endmonitor();
            print("运行【%s】 total time is 【%s】" % (func.__name__, (endtime - startime)));
            return  f;
        return wrapper;
    return log;

# if __name__=='__main__':

