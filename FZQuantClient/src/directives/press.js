export default {
  bind: function (el, binding, vnode) {
    let timer = null
    el.addEventListener('touchstart', function(e) {
      // console.log(binding, vnode)
      timer = setTimeout(function() {
        vnode.context[binding.expression] = !vnode.context[binding.expression]
      }, 1000)
    }, false)
    el.addEventListener('touchend', function(e) {
      clearTimeout(timer)
    })
  }
}
