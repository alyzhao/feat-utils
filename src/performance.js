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
 * @param {Function} func, 需要执行的函数
 * @param {Number} wait 执行函数的间隔
 * @param {Object} options, 选项: leading 如果为 false, 则禁用第一次执行, 也就是说用定时器执行
 * @param {Object} options, 选项: trailing 如果为 false, 则禁用最后一次的回调, 也就是说用时间差来执行
 * @param {Object} options, leading 和 trailing 默认为 true, 即第一次立即执行, 最后一次也会执行回调, 两者不能同时为 false  
 */
function throttle(func, wait, { leading = true, trailing = true } = {}) {
  let timer = null
  let previous = 0

  function invokeFunc(...rest) {
    previous = !leading ? 0 : new Date().getTime()
    timer = null
    func.apply(this, rest)
  }

  return function(...args) {

    let now = new Date().getTime()
    if (!previous && !leading) {
      previous = now
    }
    let remaining = wait - (now - previous)
    if (remaining <= 0 || remaining > wait) {
      // 如果修改了系统时间
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      previous = now
      func.apply(this, args)
    } else if (timer === null && trailing) {
      timer = setTimeout(invokeFunc.bind(this, ...args), remaining)
    }
  }
}

export {
  debounce,
  throttle,
}