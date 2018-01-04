# -*- coding: utf-8 -*-

from flask_restful import Resource, Api,reqparse

import json

from pyquant.dbModels.daily_price import Daily_price
from pyquant.libs.mysqllib import session

import pyquant.libs.utillib as utillib
parser = reqparse.RequestParser()

parser.add_argument('symbol_id', )
parser.add_argument('ticker')
parser.add_argument('fromdate', default='2017-01-01')
parser.add_argument('todate')

query = session.query(Daily_price)

class SearchDailyPrice(Resource):
    def get(self):
        """

        :param code:
        :param fromdate:
        :return:
        """
        args = parser.parse_args()

        arr = []

        if args.symbol_id:
            # search symbol_id
            # where = (Daily_price.symbol_id == args.symbol_id, Daily_price.price_date > '2018-01-01')
            where = []
            where.append(Daily_price.symbol_id == args.symbol_id)
            where.append( Daily_price.price_date > '2018-01-01')
            print(where)
            for row in query.filter(*where).all():
                print('dict ', row.as_dict())
                arr.append(row.as_dict())


        response = {'resCode': '00100000', 'obj':arr};
        print('response', response)
        return response, 200,{'Access-Control-Allow-Origin': '*'}



