/**
 * Created by zhangyiqing on 2017/11/23.
 */

let io;

function onDisconnect () {
  console.log('client disconnect ');
}

function onTickDataNotification (data, callback) {
  console.log('get tick Notification ' + data);
  //往所有client发送相关feeds
  console.log('data', typeof(data));
  data.forEach((item) => {
    console.log('item', item);
  })
  io.emit('tickDataNotification', data)
}

module.exports = {

  init: function (_io) {
    io = _io
    // 收到登录消息
    io.on('connection', function (client) {
      console.log('onConnect hello');

      client.on('tickDataNotification',onTickDataNotification);

      client.on('disconnect', onDisconnect);
    })
  },
}
