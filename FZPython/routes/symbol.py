# -*- coding: utf-8 -*-

from flask_restful import Resource, Api,reqparse

import json

from pyquant.dbModels.symbol import Symbol as m_symbol
from pyquant.libs.mysqllib import session

import pyquant.libs.utillib as utillib
parser = reqparse.RequestParser()

parser.add_argument('limit', default=30)
parser.add_argument('offset')

query = session.query(m_symbol)

class Symbols(Resource):
    def get(self):
        """

        :param code:
        :param fromdate:
        :return:
        """
        args = parser.parse_args()

        arr = []
        # print(value_list)
        for row in query.limit(args.limit).offset(args.offset):
            # print(json.dumps(row))
            arr.append(row.as_dict())

        response = {'resCode': '00100000', 'obj':arr};
        # print('response', response)
        return response, 200,{'Access-Control-Allow-Origin': '*'}

    def post(self, code):
        args = parser.parse_args()

        utillib.fill_data(code,False)
        response = {'resCode': '00100000'};
        return response, 200, {'Access-Control-Allow-Origin': '*'}


class Symbol(Resource):
    def get(self, id):
        """

        :param code:
        :param fromdate:
        :return:
        """
        args = parser.parse_args()

        symbol = query.get(id)
        # print(value_list)
        response = {'resCode': '00100000', 'obj':symbol.as_dict()};

        # print('response', response)
        return response, 200,{'Access-Control-Allow-Origin': '*'}