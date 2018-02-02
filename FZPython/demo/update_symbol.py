#!/usr/bin/env python
# coding: utf8



from pyquant.db_models import *

def add_exchange_id():
    """ 0开头的添加 exchangeId: SZ
        6开头添加 exchangeId: SH
    """

    for symbol in Symbol.get_all( limit=0):
        # print(symbol)
        if symbol.ticker.startswith('6'):
            symbol.exchange_id = 'SH'
        else:
            symbol.exchange_id = 'SZ'

    session.commit()




if __name__ == '__main__':
    """"""
    # update_tick()
    # download_index()
    # insert_index_to_symbol()

    # import_sz180()
    # import_symbol('../datas/沪深300_000300.txt')
    # add_exchange_id()

    # ticker1 = '6001'
    # ticker2 = '0002'
    # print(ticker1.startswith('6'))
    # print(ticker2.startswith('6'))