##

import json
import datetime
import tushare as ts
import pandas as pd
from pyquant.libs.cachelib import cache


def get_daily_data(ticker, index=False, output='df', fromdate=None, todate=None, isCache=True, **kwargs):
    """
    从 tushare 下载 股票 日数据

    光从code不能判断是否是index，要用code+market

    tusharelib 需要知道code， index

    :param ticker:
    :param output:
        df:
        list
        obj
    :return:
            list: OCLH
    """


    start = fromdate if fromdate else '1990-1-1'
    end = todate if todate else str(datetime.date.today())


    cache_key = '%s-%s-%s-%s-%s-%s-%s' % ('tusharelib','get_data',ticker, index, output, start, end)
    # print('cache key', cache_key)

    if isCache:  # 用cache
        cache_value = cache.get(cache_key)
        if isinstance(cache_value, pd.DataFrame):
            if not cache_value.empty:
                return cache_value

        if cache_value: #如果有缓存，直接返回缓存
            return cache_value

    print('从tushare下载',ticker,kwargs)

    df = ts.get_k_data(ticker, index=index, start=start, end=end)

    if output == 'df':
        del df['code']
        # 设置index
        df['date'] = df['date'].astype('datetime64')
        df = df.set_index('date')
        # 更换columns顺序
        cols = ['open', 'high', 'close', 'low', 'volume']
        objs = df.ix[:, cols]

    elif output == 'obj' or output == 'dict':
        objs = json.loads(df.to_json(orient='records'))

    elif output == 'list':
        obj_list = json.loads(df.to_json(orient='records'))
        objs = [[ item['date'],item['open'], item['close'],item['low'],item['high'],item['volume']] for item in obj_list]

    cache.set(cache_key, objs)

    return objs

if __name__ == '__main__':

    print(get_daily_data('600193', output='list', fromdate='2018-01-01'))