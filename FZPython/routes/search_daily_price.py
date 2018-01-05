# -*- coding: utf-8 -*-

from flask_restful import Resource, Api,reqparse

import json

from pyquant.dbModels.daily_price import Daily_price
from pyquant.libs.mysqllib import session, query_to_obj

import pyquant.libs.utillib as utillib
parser = reqparse.RequestParser()

parser.add_argument('symbol_id', )
# parser.add_argument('ticker')
parser.add_argument('fromdate')
parser.add_argument('todate')

query = session.query(Daily_price)

class SearchDailyPrice(Resource):
    def get(self, symbol_id):
        """

        :param symbol_id:
        :return:
        """
        args = parser.parse_args()

        arr = Daily_price.get_by_symbol_id(symbol_id,fromdate=args.fromdate, todate = args.todate)

        response = {'resCode': '00100000', 'obj':arr};
        # print('response', response)
        return response, 200,{'Access-Control-Allow-Origin': '*'}



