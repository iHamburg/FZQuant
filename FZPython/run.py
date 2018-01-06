from flask import Flask, url_for, request,abort,Response
from flask_restful import Resource, Api
from routes import SymbolRouter, SymbolsRouter, SymbolDailyPriceRouter


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


api.add_resource(SymbolRouter, '/api/symbols/<id>')
api.add_resource(SymbolsRouter, '/api/symbols/')
api.add_resource(SymbolDailyPriceRouter, '/api/symbols/<symbol_id>/dailyprices/')

if __name__ == '__main__':
    print('____main____')
    app.run(debug=True,host='0.0.0.0')