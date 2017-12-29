# -*- coding: utf-8 -*-

from flask_restful import Resource, Api,reqparse

# import json
# from pyquant.models.security import *
from pyquant.models.securitydata import *
import pyquant.libs.utillib as utillib
import pyquant.libs.btlib as btlib

parser = reqparse.RequestParser()

parser.add_argument('fromdate', default='2017-01-01')
parser.add_argument('todate')
parser.add_argument('market')
parser.add_argument('strategyId')
parser.add_argument('index', default=False)


class Strategy(Resource):
    def get(self, code):
        """

        :param code:
        :param fromdate:
        :return:
        """
        args = parser.parse_args()

        stock = Stock(code)

        sd = SecurityData(stock, MongoSource, fromdate=args.fromdate)
        value_list = sd.get_data('list')
        # print(value_list)

        response = {'resCode': '00100000', 'obj':{"list":value_list}};

        print('response', response)
        return response, 200,{'Access-Control-Allow-Origin': '*'}

    def post(self, code):
        args = parser.parse_args()
        # print('query code from tushare to mongo', code, args)

        utillib.fill_data(code,False)
        response = {'resCode': '00100000'};
        return response, 200, {'Access-Control-Allow-Origin': '*'}


class Backtest(Resource):
    def post(self):
        args = parser.parse_args()


