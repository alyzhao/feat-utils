/**
 * 函数防抖
 * @param {Function} func, func 不能是 箭头函数, 否则 this 指向的是 window
 * @param {Number} wait 执行函数的等待毫秒数
 * @param {Boolean} immediate 是否立即执行
 */
function debounce(func, wait, immediate) {
  let timer = null
  let result = null
  return function(...args) {
    // 如果是立即执行, 即第一次执行时立即执行
    if (timer !== null) {
      clearTimeout(timer)
    }
    if (immediate) {
      if (timer === null) {
        result = func.apply(this, args)
      }
      timer = setTimeout(() => {
        timer = null
      }, wait)
    } else {
      timer = setTimeout(() => {
        result = func.apply(this, args)
      }, wait)
    }

    return result
  }
}

/**
 * 函数节流
 *
 */
function throttle(func, wait, options = { leading: true, trailing: true }) {
  let timer = null
  let previous = 0

  function invokeFunc(...rest) {
    previous = options.leading === false ? 0 : new Date().getTime()
    timer = null
    func.apply(context, rest)
  }

  return function(...args) {
    let now = new Date().getTime()
    if (!previous && options.leading === false) {
      previous = now
    }
    let remaining = wait - (now - previous)
    if (remaining <= 0 || remaining > wait) {
      if (timer !== null) {
        clearTimeout(timer)
        timer = null
      }
      previous = now
      func.apply(this, args)
    }
  } else if (timer === null) {
    timer = setTimeout(invokeFunc.bind(this, args), remaining)
  }
}