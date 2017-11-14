/**
 * Created by zhangyiqing on 2017/9/20.
 */
export default{
  install(Vue, options) {
    Vue.prototype.$myName = "Forest Zhang";

    Vue.prototype.$foo = function(input) {
      console.log('foo ', input);
    }
  }
}
