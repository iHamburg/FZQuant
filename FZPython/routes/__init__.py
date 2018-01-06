# -*- coding: utf-8 -*-


from flask_restful import Resource, reqparse
from pyquant.db_models import Symbol, DailyPrice
import pyquant.libs.utillib as utillib

parser = reqparse.RequestParser()
parser.add_argument('limit', default=30)
parser.add_argument('offset')
parser.add_argument('todate')
parser.add_argument('fromdate')

#
class DailyPriceRouter(Resource):
    def get(self, code):
        """

        :param code:
        :param fromdate:
        :return:
        """
        args = parser.parse_args()


        # print(value_list)

        response = {'resCode': '00100000', 'obj':{"list":''}};

        print('response', response)
        return response, 200,{'Access-Control-Allow-Origin': '*'}




class SymbolDailyPriceRouter(Resource):
    def get(self, symbol_id):
        """

        :param symbol_id:
        :return:
        """
        args = parser.parse_args()

        daily_prices = DailyPrice.get_by_symbol_id(symbol_id, fromdate=args.fromdate, todate = args.todate)


        response = {'resCode': '00100000', 'obj':daily_prices};
        # print('response', response)
        return response, 200,{'Access-Control-Allow-Origin': '*'}



class SymbolsRouter(Resource):
    def get(self):
        """

        :param code:
        :param fromdate:
        :return:
        """
        args = parser.parse_args()

        array = [row.to_dict() for row in Symbol.query().limit(args.limit).offset(args.offset)]

        response = {'resCode': '00100000', 'obj':array};

        return response, 200,{'Access-Control-Allow-Origin': '*'}



class SymbolRouter(Resource):
    def get(self, id):
        """

        :param code:
        :param fromdate:
        :return:
        """

        symbol = Symbol.get(id)

        response = {'resCode': '00100000', 'obj':symbol.to_dict()};

        # print('response', response)
        return response, 200,{'Access-Control-Allow-Origin': '*'}