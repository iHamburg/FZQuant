/**
 * Created by zhangyiqing on 2017/11/23.
 */

let io;
function onDisconnect () {
  console.log('client disconnect ');
}
module.exports = {

  init: function (_io) {
    io = _io
    io.on('connection', function (client) {
      console.log('onConnect hello');

      client.on('aaa', function (data, callback) {
        console.log('client send aaa' + data);
        client.emit('aaa_response', 'helloworld')
        if (callback) { callback('callback from server :abcded') }
      });
      client.on('bbb', function (data, callback) {
        console.log('vue send bbb' + data);
        client.emit('test', data)
        client.emit('aaa_response', data)
        client.emit('tickDataNotification', data)
      });

      client.on('tickDataNotification', data => {
        console.log('get tick Notification ' + data);
        io.emit('tickDataNotification', data)
      })

      client.on('disconnect', onDisconnect);
    })
  },
}
