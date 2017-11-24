# coding: utf8

from pyquant.configs.socketio import config


from socketIO_client import SocketIO, LoggingNamespace
def on_connect():
    print('on connect')

def on_disconnect():
    print('disconnect')

def on_reconnect():
    print('reconnect')

def on_aaa_response(*args):
    print('on_aaa_response', args)



socketIO = SocketIO(config.host, config.port, LoggingNamespace)
socketIO.on('connect', on_connect)
socketIO.on('disconnect', on_disconnect)
socketIO.on('reconnect', on_reconnect)
#
# # Listen
socketIO.on('aaa_response', on_aaa_response)
socketIO.emit('aaa',12, on_aaa_response)
socketIO.emit('aaa',{'a':'b'},on_aaa_response)
socketIO.emit('dataFromPython', 'abc')
# socketIO.wait_for_callbacks(seconds=5)


socketIO.wait(seconds=1)



if __name__ == '__main__':
    pass