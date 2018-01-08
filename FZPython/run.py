from flask import Flask, url_for, request,abort,Response
from flask_restful import Resource, Api
# from routes import SymbolRouter, SymbolsRouter, SymbolDailyPricesRouter,
from routes import *

app = Flask(__name__)
api = Api(app)

# @app.route('/')
# def hello_world():
#     return 'Hello, World!'



# 同一个route可以接受不同的protocol
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         return 'POST request'
#     else:
#         return 'GET request'

# Add Router

api.add_resource(UserRouter, '/api/users/<uid>')  #
api.add_resource(SymbolRouter, '/api/symbols/<_id>','/api/symbols/', '/api/symbolgroups/<symbolgroup_id>/symbols')
api.add_resource(DailyPriceRouter, '/api/daily_price/','/api/daily_price/<_id>','/api/symbols/<symbol_id>/daily_price/')
api.add_resource(SymbolGroupsRouter, '/api/symbolgroups/', '/api/symbolgroups/<_id>',)  #股票指数
api.add_resource(StockIndexRouter, '/api/stock_indexes', '/api/stock_indexes/<_id>')  #股票指数


if __name__ == '__main__':
    print('____main____')
    app.run(debug=True,host='0.0.0.0')