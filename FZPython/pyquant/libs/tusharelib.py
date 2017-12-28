# -*- coding: utf-8 -*-
##

import tushare as ts
import json


def get_data(code, index=False, output='df', **kwargs):
    """
    从 tushare 下载 股票 日数据

    光从code不能判断是否是index，要用code+market

    tusharelib 需要知道code， index

    :param code:
    :param output:
        df:
        list
        obj
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
        del df['code']
        df['date'] = df['date'].astype('datetime64')
        df = df.set_index('date')
        cols = ['open', 'high', 'close', 'low', 'volume']
        df = df.ix[:, cols]
        return df
    elif output == 'obj':
        return json.loads(df.to_json(orient='records'))
    elif output == 'list':
        obj_list = json.loads(df.to_json(orient='records'))
        return   [[ item['date'],item['open'], item['close'],item['low'],item['high'],item['volume']] for item in obj_list]



if __name__ == '__main__':

    print(get_data('600193',output='list'))