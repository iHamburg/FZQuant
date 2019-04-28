from flask import Flask, url_for, request,abort,Response
from flask_restful import Resource, Api
from routes import *

app = Flask(__name__)
api = Api(app)



api.add_resource(UserRouter, '/api/users/<uid>')  #
api.add_resource(SymbolRouter, '/api/symbols/<_id>','/api/symbols/', '/api/symbolgroups/<symbolgroup_id>/symbols')
api.add_resource(DailyPriceRouter, '/api/daily_price/','/api/daily_price/<_id>','/api/symbols/<symbol_id>/daily_price/')
api.add_resource(SymbolGroupsRouter, '/api/symbolgroups/', '/api/symbolgroups/<_id>', '/api/users/<user_id>/symbolgroups')
api.add_resource(StockIndexRouter, '/api/stock_indexes', '/api/stock_indexes/<_id>')  #股票指数
api.add_resource(StragegyRouter, '/api/strategies', '/api/strategies/<_id>')
api.add_resource(StragegyRunRouter, '/api/strategies/<_id>/run')

api.add_resource(TodoList, '/todos')

if __name__ == '__main__':
    print('____main____')
    app.run(debug=True,host='0.0.0.0')