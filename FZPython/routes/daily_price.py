# -*- coding: utf-8 -*-

from flask_restful import Resource, Api,reqparse


from pyquant.models.securitydata import *
import pyquant.libs.utillib as utillib
parser = reqparse.RequestParser()




class DailyPrice(Resource):
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

        utillib.fill_data(code,False)
        response = {'resCode': '00100000'};
        return response, 200, {'Access-Control-Allow-Origin': '*'}
