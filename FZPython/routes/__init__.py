# -*- coding: utf-8 -*-


from flask_restful import Resource, reqparse
from pyquant.db_models import (Symbol, DailyPrice, User, SymbolGroup, StockIndex,)
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
# class DailyPriceRouter(Resource):
#     def get(self, code):
#         """
#
#         :param code:
#         :param fromdate:
#         :return:
#         """
#         args = parser.parse_args()
#
#
#         # print(value_list)
#
#         return send_response({"hello"})





class DailyPriceRouter(Resource):
    def get(self, _id=None, symbol_id=None):
        """

        :param symbol_id:
        :return:
        """
        args = parser.parse_args()
        if _id:
            response = DailyPrice.get_by_id(_id).to_dict()
        elif symbol_id:

            daily_prices = DailyPrice.get_by_symbol_id(symbol_id, fromdate=args.fromdate, todate = args.todate, output='dict')
            response = {"list": daily_prices}
        else:
            array = [row.to_dict() for row in DailyPrice.get_all()]
            response = {"list": array}

        return send_response(response)




class SymbolRouter(Resource):

    def get(self, _id=None, symbolgroup_id=None):
        """

        :return:
        """
        args = parser.parse_args()

        if _id:
            response = Symbol.get_by_id(_id).to_dict()
        elif symbolgroup_id: # 返回该symbolgroup下所有的symbol
            array = [row.to_dict() for row in Symbol.get_list_by_symbolgroup_id(symbolgroup_id)]
            response = dict(list=array)
        else:
            array = Symbol.find_all(limit=args.limit, offset=args.offset, output='dict')
            response = dict(list=array)

        return send_response(response)


class SymbolGroupsRouter(Resource):
    def get(self, _id=None):
        """
        :return:
        """

        # args = parser.parse_args()

        if _id:
            response = SymbolGroup.get_by_id(_id).to_dict()
        else:
            array = [row.to_dict() for row in SymbolGroup.get_all()]
            response = dict(list=array)

        return send_response(response)


class StockIndexRouter(Resource):

    def get(self, _id=None):
        """
        :return:
        """

        args = parser.parse_args()


        if _id:
            return send_response(StockIndex.get_by_id(_id).to_dict())
        else:
            array = StockIndex.get_all()
            array = [row.to_dict() for row in array]

            return send_response(dict(list= array))




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

