# -*- coding: utf-8 -*-

from flask_restful import Resource, Api,reqparse
import pyquant.libs.datalib as datalib
import json
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

        stock = Stock(code)
        sd = SecurityData(stock, TushareSource, fromdate='2017-01-01')
        df = sd.get_df()
        print(df)


        l = json.loads(df.to_json(orient='records'))

        response = {'resCode': '00100000', 'obj':{"list":l}};

        print('response', response)
        return response, 200,{'Access-Control-Allow-Origin': '*'}

    def post(self, code):
        args = parser.parse_args()
        # print('query code from tushare to mongo', code, args)
        datalib.insert_data(code, args['index'])
        response = {'resCode': '00100000'};
        return response, 200, {'Access-Control-Allow-Origin': '*'}