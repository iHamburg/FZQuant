#!/usr/bin/env python
# coding: utf8



from pyquant.db_models import *


def import_sz50():
    """
    根据 '../datas/上证50_000016.txt'
    import
    :return:
    """
    file_path = '../datas/上证50_000016.txt'
    with open(file_path, 'r', encoding='utf') as f:
        for line in f:
            obj = json.loads(line)
            if not Symbol.get_by_ticker(obj['ticker']):
                print('需要insert', obj)
                symbol = Symbol(ticker=obj['ticker'], name=obj['name'], instrument='stock')
                session.add(symbol)

        session.commit()

    print('上证50导入完成')


def import_sz180():
    """
    根据 '../datas/上证50_000016.txt'
    import
    :return:
    """
    file_path = '../datas/上证180_000010.txt'
    with open(file_path, 'r', encoding='utf') as f:
        for line in f:
            obj = json.loads(line)
            if not Symbol.get_by_ticker(obj['ticker']):
                print('需要insert', obj)
                symbol = Symbol(ticker=obj['ticker'], name=obj['name'], instrument='stock')
                session.add(symbol)

        session.commit()

    print('上证180导入完成')



def import_symbol(file_path):
    """
    根据 file_path 导入symbol
    import
    :return:
    """
    # file_path = '../datas/上证180_000010.txt'
    with open(file_path, 'r', encoding='utf') as f:
        for line in f:
            obj = json.loads(line)
            if not Symbol.get_by_ticker(obj['ticker']):
                print('需要导入', obj)
                symbol = Symbol(ticker=obj['ticker'], name=obj['name'], instrument='stock')
                session.add(symbol)

        session.commit()

    print(file_path,'导入完成')

if __name__ == '__main__':
    """"""
    # update_tick()
    # download_index()
    # insert_index_to_symbol()

    # import_sz180()
    import_symbol('../datas/沪深300_000300.txt')