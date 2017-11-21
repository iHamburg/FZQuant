
const localStorage = window.localStorage;

export default {
  /**
   * 根据name取出LocalStorage里的value
   * @param name
   * @return 返回json对象
   */
  storageGet(name) {
    let value = localStorage.getItem(name)
    // console.log(' utils.dbget ',value);
    if (/^\{.*\}$/.test(value)) value = JSON.parse(value) || {}
    return value
  },

  /**
   * 存入LocalStorage
   * @param name
   * @param value  可以是json对象，也可以是字符串
   */
  storageSet(name, value) {
    if (typeof value === typeof {}) value = JSON.stringify(value)
    return localStorage.setItem(name, value)
  },

  /**
   * 根据name删除LocalStorage
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  storageRemove(name) {
    return localStorage.removeItem(name)
  },
}
