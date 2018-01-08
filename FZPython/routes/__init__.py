# -*- coding: utf-8 -*-


from flask_restful import Resource, reqparse
from pyquant.db_models import Symbol, DailyPrice, User, SymbolGroup
import pyquant.libs.utillib as utillib

parser = reqparse.RequestParser()
parser.add_argument('limit', default=30)
parser.add_argument('offset')
parser.add_argument('todate')
parser.add_argument('fromdate')
parser.add_argument('index')

def send_response(obj=None, err=None):
    if obj:
        response = {'resCode': '00100000', 'obj': obj};
        return response, 200, {'Access-Control-Allow-Origin': '*'}

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

        return send_response({"hello"})





class SymbolDailyPricesRouter(Resource):
    def get(self, symbol_id):
        """

        :param symbol_id:
        :return:
        """
        args = parser.parse_args()

        daily_prices = DailyPrice.get_by_symbol_id(symbol_id, fromdate=args.fromdate, todate = args.todate)

        return send_response({"list": daily_prices})



class SymbolsRouter(Resource):
    def get(self, symbolgroup_id=None):
        """
        返回Symbol列表

        :param symbolgroup_id:
        :return:
        """
        args = parser.parse_args()

        # print('index', args.index)

        if symbolgroup_id: # 返回该symbolgroup下所有的symbol
            array = [row.to_dict() for row in Symbol.get_list_by_symbolgroup_id(symbolgroup_id)]
        elif args.index:
            array = [row.to_dict() for row in Symbol.get_index_list()]
        else:
            array = Symbol.find_all(limit=args.limit, offset=args.offset, output='dict')

        return send_response({"list":array})



class SymbolRouter(Resource):

    def get(self, id):
        """
        :param code:
        :param fromdate:
        :return:
        """
        symbol = Symbol.get(id)

        return send_response(symbol.to_dict())


class SymbolGroupsRouter(Resource):
    def get(self):
        """
        :return:
        """

        # args = parser.parse_args()

        array = [row.to_dict() for row in SymbolGroup.get_system_groups()]

        return send_response({"list":array})


#  ===========   User
class UserRouter(Resource):
    def get(self, uid):
        """
        :param code:
        :param fromdate:
        :return:
        """

        user = User.get(uid)

        return send_response(user.to_dict())

