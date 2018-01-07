/**
 * Created by zhangyiqing on 2017/11/23.
 */

// function onDisconnect () {
//   console.log('client disconnect ');
// }

module.exports = {

  // onConnection: function (client) {
  //   console.log('onConnect');
  //   client.on('event', function(data) {
  //     console.log(' client get event' + data);
  //   });
  //   client.on('aaa', function (data, callback) {
  //     console.log('client send aaa' + data);
  //     client.emit('aaa_response', 'helloworld')
  //     callback('callback from server :abcded')
  //   });
  //   client.on('bbb', function (data, callback) {
  //     console.log('vue send bbb' + data);
  //     client.emit('aaa_response', 'helloworld')
  //   });
  //   client.on('dataFromPython', function (data) {
  //     console.log('get data from python ' + data);
  //     // client.emit('dataFromPython', data)
  //     client.emit('aaa_response', 'helloworld')
  //   });
  //
  //   client.on('disconnect', onDisconnect);
  // }
}
