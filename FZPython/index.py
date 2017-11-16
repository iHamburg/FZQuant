from eve import Eve

app = Eve()

@app.route('/hello')
def hello_world():
    return 'Hello, World!111'

if __name__ == '__main__':
    app.run(host='0.0.0.0')