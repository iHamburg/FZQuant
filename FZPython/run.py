from flask import Flask, url_for, request,abort,Response
from flask_restful import Resource, Api
from routes.data import (Data, DataBt)
from routes.symbol import Symbol, Symbols
from routes.search_daily_price import SearchDailyPrice

app = Flask(__name__)
api = Api(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'



# 同一个route可以接受不同的protocol
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return 'POST request'
    else:
        return 'GET request'

# Add Router

api.add_resource(Data, '/api/datas/<code>')
api.add_resource(DataBt, '/api/datas/<code>/bt/<strategyId>')
api.add_resource(Symbol, '/api/symbols/<id>')
api.add_resource(Symbols, '/api/symbols/')
api.add_resource(SearchDailyPrice, '/api/symbols/<symbol_id>/dailyprice/')

if __name__ == '__main__':
    print('____main____')
    app.run(debug=True,host='0.0.0.0')