# -*- coding: utf-8 -*-

from flask_restful import Resource, Api,reqparse
import pyquant.libs.datalib as datalib
from pyquant.models.security import *
from pyquant.models.data import *
parser = reqparse.RequestParser()

parser.add_argument('fromdate')
parser.add_argument('todate')
parser.add_argument('market')
parser.add_argument('index', default=False)


class Data(Resource):
    def get(self, code):
        """

        :param code:
        :param fromdate:
        :return:
        """
        args = parser.parse_args()

        # 构建Security

        security = Security(code,args.market,'STOCK')
        data = SecurityData(security, fromdate=args.fromdate)
        data.get_values_from_mongo()
        values = data.api_values
        # print('values',values)

        response = {'resCode': '00100000', 'obj':{"list":values}};

        # print('response', response)
        return response, 200,{'Access-Control-Allow-Origin': '*'}

    def post(self, code):
        args = parser.parse_args()
        # print('query code from tushare to mongo', code, args)
        datalib.insert_data(code, args['index'])
        response = {'resCode': '00100000'};
        return response, 200, {'Access-Control-Allow-Origin': '*'}