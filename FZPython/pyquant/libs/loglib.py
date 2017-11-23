# coding: utf8

from logbook import Logger, StreamHandler, FileHandler
import sys
# import os
# StreamHandler(sys.stdout).push_application()
# FileHandler('./pyquant/logs/app.log').push_application()  # 会覆盖上一个Handler

# logger = Logger('fzquant')
# log.info('Hello, World!')
# log.error('it is err')


try:
    from logbook import Logger
except ImportError:
    class Logger(object):
        def __init__(self, name, level=0):
            self.name = name
            self.level = level
        debug = info = warn = warning = notice = error = exception = \
            critical = log = lambda *a, **kw: None

log = Logger('pyquant')


if __name__ == '__main__':
    pass