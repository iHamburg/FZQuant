/**
 * Created by 张怡清 on 17/4/6.
 */

/**
 * 请求集中在这个文件中
 *
 * 请求基于api
 */
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.emulateJSON = true

// 生产
// const baseUrl = 'http://10.201.128.216:24080'

// 测试 SIT
// const baseUrl = 'http://10.201.128.127/api';

// 开发
// const baseUrl = 'http://localhost/api'

const baseUrl = 'http://localhost:5000/api'
// const baseUrl = 'http://localhost:5000/'
/**
 * GET 请求
 * @param apiId
 * @param params
 * @returns {Promise}
 */

let get = function(url) {
  return new Promise(function (resolve, reject) {
    Vue.http.get(baseUrl + url).then(obj => {
      // console.log('data',obj);
      var data = obj.body || {};

      if (data.resCode == '00100000') {
        resolve(data.obj);
      } else if (data.msg) {
        reject('网络错误 ' + url + ' ' + data.msg);
      } else {
        reject('网络错误 ' + url + ' 没有msg');
      }
    }
    ).catch(() => {
      let msg = '网络错误 ' + url;
      console.log(msg);
      reject(msg);
    })
  });
};

/**
 * 调用接口
 *
 * @param apiId  1001
 * @param params
 * @return Promise {obj}
 */
let post = (url, params) => {
  return new Promise(function (resolve, reject) {
    Vue.http.post(baseUrl + url, params).then(obj => {
        // console.log('data',obj);

      var data = obj.body || {};

      if (data.resCode == '00100000') {
        resolve(data.obj);
      } else if (data.msg) {
        reject('网络错误 ' + url + ' ' + data.msg);
      } else {
        reject('网络错误 ' + url + ' 没有msg');
      }
    }, () => {
      let msg = '网络错误 ' + url;
      console.log(msg);
      reject(msg);
    }
    );
  });
};

let put = (url, params) => {
  return new Promise(function (resolve, reject) {
    Vue.http.put(baseUrl + url, params).then(obj => {
        // console.log('data',obj);

      var data = obj.body || {};

      if (data.resCode == '00100000') {
        resolve(data.obj);
      } else if (data.msg) {
        reject('网络错误 ' + url + ' ' + data.msg);
      } else {
        reject('网络错误 ' + url + ' 没有msg');
      }
    }, () => {
      let msg = '网络错误 ' + url;
      console.log(msg);
      reject(msg);
    }
    );
  });
};

let deleteapi = (url) => {
  return new Promise(function (resolve, reject) {
    Vue.http.delete(baseUrl + url).then(obj => {
        // console.log('data',obj);

      var data = obj.body || {};

      if (data.resCode == '00100000') {
        resolve(data.obj);
      } else if (data.msg) {
        reject('网络错误 ' + url + ' ' + data.msg);
      } else {
        reject('网络错误 ' + url + ' 没有msg');
      }
    }, () => {
      let msg = '网络错误 ' + url;
      console.log(msg);
      reject(msg);
    }
    );
  });
}

export default {

  post,
  get,
  put,
  deleteapi,

}

