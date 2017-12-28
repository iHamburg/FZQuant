# -*- coding: utf-8 -*-
##

import tushare as ts
import json

def get_df(code, index=False,  **kwargs):
    """
    从 tushare 下载 股票 日数据
    :param code:
    :return:
    """
    print('从tushare下载',code,index)

    df = ts.get_k_data(code, index=index, start="1990-1-1")

    return df

def get_list(code, index=False,  **kwargs):
    """
    从 tushare 下载 股票 日数据
    :param code:
    :return:
    """
    print('从tushare下载',code,index)

    df = ts.get_k_data(code, index=index, start="1990-1-1")

    value_list = json.loads(df.to_json(orient='records'))

    return value_list

def get_data(code, index=False, output='df', **kwargs):
    """
    从 tushare 下载 股票 日数据
    :param code:
    :return:
            list: OCLH
    """
    print('从tushare下载',code,kwargs)

    if 'fromdate' in kwargs.keys():
        start = kwargs['fromdate']
    else:
        start = '1990-1-1'


    df = ts.get_k_data(code, index=index, start=start)

    if output == 'df':
        return df
    elif output == 'obj':
        return json.loads(df.to_json(orient='records'))
    elif output == 'list':
        obj_list = json.loads(df.to_json(orient='records'))
        return   [[ item['date'],item['open'], item['close'],item['low'],item['high'],item['volume']] for item in obj_list]



if __name__ == '__main__':

    print(get_data('600193',output='list'))