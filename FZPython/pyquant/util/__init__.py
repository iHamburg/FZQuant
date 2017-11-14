
# -*- coding: utf8 -*-


import time
import datetime
import logbook
import sys
import os

logbook.StreamHandler(sys.stdout).push_application()

dlogger = logbook.Logger('data')
elogger = logbook.Logger('engine')


# fzpyquant
project_dir = os.path.abspath(os.path.dirname(os.path.abspath(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))))
# fzpyquant/pyquant
source_dir = os.path.abspath(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

def time2int(t):
    """ datetime转化为unix毫秒时间。 """
    epoch = int(time.mktime(t.timetuple()) * 1000)
    return epoch


def int2time(tf):
    """ unix毫秒时间转化为time"""
    return datetime.datetime.fromtimestamp(float(tf) / 1000)