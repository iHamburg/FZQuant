# -*- coding: utf-8 -*-
##

import tushare as ts


def get_data_df(code, index=False):
    """
    从 tushare 下载 股票 日数据
    :param code:
    :return:
    """
    print('从tushare下载',code,index)

    df = ts.get_k_data(code, index=index, start="1990-1-1")

    return df
