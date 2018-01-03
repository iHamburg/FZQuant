#!/usr/bin/env python
# coding: utf8
import pymysql.cursors
from pyquant.configs.configs import mysql as config

# Connection
connection = pymysql.connect(host = config['host'],
                             user = config['user'],
                             password= config['password'],
                             db= config['db'],
                             charset='utf8',
                             cursorclass=pymysql.cursors.DictCursor)


#Insert

def execute_sql(sql, param = None):
    with connection.cursor() as cursor:
        # Create a new record
        cursor.execute(sql, param)

        # connection is not autocommit by default. So you must commit to save
        # your changes.
        connection.commit()

        return cursor



def insert_daily_price(param):
    sql = "INSERT INTO `daily_price` (`symbol_id`,  `price_date`, `open_price`, `high_price`, `low_price`, `close_price`, `volume`) VALUES " \
          "(%s, %s, %s, %s, %s, %s, %s)"

    return execute_sql(sql,param)

def insert_symbol(param):
    """

    :param param:
    :return:
    """
    sql = "INSERT INTO `symbol` (`exchange_id`, `ticker`, `instrument`,`name`) VALUES (%s, %s, %s, %s)"

    return execute_sql(sql,param)



# Delete
def delete():
    with connection.cursor() as cursor:
        # Create a new record
        sql = "delete from `daily_price` where id=%s"
        cursor.execute(sql, ('2'))

    # connection is not autocommit by default. So you must commit to save
    # your changes.
    connection.commit()


def read_daily_price_by_symbol_id(symbol_id):
    """"""

    sql = "select * from `daily_price` where symbol_id=%s"
    cursor = execute_sql(sql, (symbol_id))

    return cursor.fetchall()


if __name__ == '__main__':
    """"""
    # insert()
    # update()
    # delete()
    # read()
    # insert_daily_price(('1', '12.9','2017-01-01'))
    # cursor = insert_symbol(('1','6001213','stock','我也不知道'))
    # cursor = insert_daily_price(('2','2017-01-02','11','12','13','14','11111'))
    print(read_daily_price_by_symbol_id(1))