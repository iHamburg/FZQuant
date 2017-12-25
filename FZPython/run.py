from flask import Flask, url_for, request,abort,Response
from flask_restful import Resource, Api,reqparse
import pyquant.libs.datalib as datalib

app = Flask(__name__)
api = Api(app)
parser = reqparse.RequestParser()

parser.add_argument('fromdate')
parser.add_argument('todate')

class Data(Resource):
    def get(self, code):
        """

        :param code:
        :param fromedate:
        :return:
        """

        args = parser.parse_args()
        print('fromdate',args['fromdate'])

        # 查询code 的数据
        params = ['fromdate','todate']
        kwargs = {}
        for param in params:
            if args[param]:
                kwargs[param] = args[param]

         # TODO: 或者清除args内的None，就可以直接传**args，不需要处理kwargs了
        data = datalib.get_api_data(code, **kwargs)

        # print('data', data)
        response = {'resCode': '00100000', 'obj':{"list":data}};
        return response, 200,{'Access-Control-Allow-Origin': '*'}




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

api.add_resource(Data, '/api/datas/<code>')


if __name__ == '__main__':
    print('____main____')
    app.run(debug=True,host='0.0.0.0')