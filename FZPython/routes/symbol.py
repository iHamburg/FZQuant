# -*- coding: utf-8 -*-

from flask_restful import Resource, Api,reqparse

from pyquant.dbModels.symbol import Symbol as m_symbol
from pyquant.libs.mysqllib import session, engine, query_to_obj
query = session.query(m_symbol)

import pyquant.libs.utillib as utillib

parser = reqparse.RequestParser()

parser.add_argument('limit', default=30)
parser.add_argument('offset')



class Symbols(Resource):
    def get(self):
        """

        :param code:
        :param fromdate:
        :return:
        """
        args = parser.parse_args()

        arr = query_to_obj(query.limit(args.limit).offset(args.offset))

        response = {'resCode': '00100000', 'obj':arr};
        # print('response', response)
        return response, 200,{'Access-Control-Allow-Origin': '*'}



class Symbol(Resource):
    def get(self, id):
        """

        :param code:
        :param fromdate:
        :return:
        """
        args = parser.parse_args()

        symbol = query.get(id)

        response = {'resCode': '00100000', 'obj':symbol.as_dict()};

        # print('response', response)
        return response, 200,{'Access-Control-Allow-Origin': '*'}