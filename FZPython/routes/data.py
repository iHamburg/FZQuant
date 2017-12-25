# -*- coding: utf-8 -*-

from flask_restful import Resource, Api,reqparse
import pyquant.libs.datalib as datalib

parser = reqparse.RequestParser()

# parser.add_argument('fromdate', default=False)
# parser.add_argument('todate', default=False)
parser.add_argument('fromdate')
parser.add_argument('todate')
parser.add_argument('index', default=False)


class Data(Resource):
    def get(self, code):
        """

        :param code:
        :param fromdate:
        :return:
        """
        args = parser.parse_args()
        # print('begin get api data', code)
        data = datalib.get_api_data(code, **args)
        # print('data', data)
        response = {'resCode': '00100000', 'obj':{"list":data}};
        # response = {'resCode': '00100000', 'obj': {"list": 123}};
        # print('response', response)
        return response, 200,{'Access-Control-Allow-Origin': '*'}

    def post(self, code):
        args = parser.parse_args()
        # print('query code from tushare to mongo', code, args)
        datalib.insert_data(code, args['index'])
        response = {'resCode': '00100000'};
        return response, 200, {'Access-Control-Allow-Origin': '*'}