#!/usr/bin/env python
# coding: utf8
import time
import functools

class Monitor:
    @staticmethod
    def start_monitor():
        # return time.clock();
        return time.time();

    @staticmethod
    def end_monitor():
        # return time.clock();
        return time.time();


def listener(listen):
    def log(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            startime=listen.start_monitor();
            f=func(*args, **kw);
            endtime=listen.end_monitor();
            print("运行【%s】 total time is 【%s】" % (func.__name__, (endtime - startime)));
            return  f;
        return wrapper;
    return log;

# if __name__=='__main__':

