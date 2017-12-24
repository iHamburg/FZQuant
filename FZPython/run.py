from flask import Flask, url_for, request,abort,Response
from flask_restful import Resource, Api,reqparse
import tushare
import json
import pyquant.libs.mongolib as mongolib

app = Flask(__name__)
api = Api(app)
parser = reqparse.RequestParser()

class Data(Resource):
    def get(self, code):
        # 查询code 的数据
        data = mongolib.get_data(code)
        print('data', data)
        response = {'resCode': '00100000', 'obj':data};
        return response, 200,{'Access-Control-Allow-Origin': '*'}



class Parser(Resource):
    def get(self, todo_id):
        # return {todo_id: todos[todo_id]}
        df = tushare.get_k_data('000001', index=True, start="2017-1-1")
        response = {'resCode': '00100000', 'obj': json.loads(df.to_json(orient='records'))};

        return response, 200,{'Access-Control-Allow-Origin': '*'}



#接收一个字符串
def response_headers(content):
    resp = Response(content)
    #返回数据添加头部信息
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/')
def hello_world():
    return 'Hello, World!11123'



@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return 'User %s' % username

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id

# 同一个route可以接受不同的protocol
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return 'POST request'
    else:
        return 'GET request'

@app.route('/login2')
def login2():
    abort(401)
    # this_is_never_executed()



@app.errorhandler(404)
def page_not_found(error):
    print('404')
    return error

@app.route('/log')
def log():
    app.logger.debug('A value for debugging')
    app.logger.warning('A warning occurred (%d apples)', 42)
    app.logger.error('An error occurred')
    return 'log'

api.add_resource(Data, '/datas/<code>')


if __name__ == '__main__':
    print('____main____')
    app.run(debug=True,host='0.0.0.0')