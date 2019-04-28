
socketio = {
'host' : '121.42.26.144',
'port' : 3020
}

mongodb = dict(
    # host='121.42.26.144',
    host='localhost',
    port=27017
)

mysql = dict(
    host='121.42.26.144',
    user='root',
    password='root',
    db='fzquant'
)

cerebro = dict(
    cash = 1000000,
    commission = 0.0015
)

stock_index = [
    {
        'name':'上证指数',
        "ticker":'000001',
        "symbol_id":2408,
        "symbol_file":''

    },
    {
        'name':'上证50',
        "ticker":'000016',
        "symbol_id":2416,
        "symbol_file":'datas/上证50_000016.txt'

    }
]