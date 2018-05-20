#!/usr/bin/env python
# coding: utf8

import time
import datetime



def get_today():
    today = datetime.datetime.now().strftime('%Y-%m-%d')
    return today


def list_to_string(l):
    l = [str(item) for item in l]
    return "".join(l)


if __name__ == '__main__':
    """"""

    from pyquant.db_models import Symbol as m_symbol
    from pyquant.libs.mysqllib import session, engine

    query = session.query(m_symbol)

