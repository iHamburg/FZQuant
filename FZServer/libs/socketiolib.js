/**
 * Created by zhangyiqing on 2017/11/23.
 */

function onDisconnect () {
  console.log('client disconnect ');
}

module.exports = {

  onConnection: function (client) {
    console.log('onConnect');
    client.emit('tickDataNotification')
    client.on('event', function(data) {
      console.log(' client get event' + data);
    });
    client.on('aaa', function (data, callback) {
      console.log('client send aaa' + data);
      client.emit('aaa_response', 'helloworld')
      if(callback)
        callback('callback from server :abcded')
    });
    client.on('bbb', function (data, callback) {
      console.log('vue send bbb' + data);
      client.emit('test', data)
      client.emit('aaa_response', data)
      client.emit('tickDataNotification', data)

    });
    client.on('dataFromPython', function (data) {
      console.log('get data from python ' + data);
      // client.emit('dataFromPython', data)
      client.emit('aaa_response', 'helloworld')
    });
    // client.on('tickDataNotification', data => {
    //   console.log('get tick Notification ' + data);
    //   client.emit('tickDataNotification')
    // })

    client.on('disconnect', onDisconnect);
  }
}
