
export default {
  bind: function (el, binding) {
    let ducDiv = document.createElement('div')
    let winHeight = document.documentElement.clientHeight
    let oEl = binding.modifiers.window ? document.body : el
    let fnToggleShow = () => {
      let thisScrollTop = oEl.scrollTop
      if (thisScrollTop > winHeight) {
        ducDiv.style.display = 'block'
      } else {
        ducDiv.style.display = 'none'
      }
    }
    ducDiv.className = 'gotop'
    ducDiv.style.display = 'none'
    if (el.parentNode && !binding.modifiers.window) {
      el.parentNode.appendChild(ducDiv)
    } else {
      el.appendChild(ducDiv)
    }
    ducDiv.addEventListener('click', function() {
      window.ScrollTo.top(oEl, 0)
    })
    if (binding.modifiers.window) {
      window.addEventListener('scroll', fnToggleShow, false)
    } else {
      oEl.addEventListener('scroll', fnToggleShow, false)
    }
  }
}
