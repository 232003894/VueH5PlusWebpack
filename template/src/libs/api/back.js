import * as utils from './utils'
import * as act from './action'

/**
 * 增加back执行流程
 * @export
 * @param {type} back
 * @returns {$.gestures}
 */
export function addBack(back) {
  return act.addAction('backs', back)
}

/**
 * 默认处理-后退
 */
addBack({
  name: 'browser',
  index: 100,
  handle: function () {
    if (window.history.length > 1) {
      console.log('默认的后退 history.back')
      window.history.back()
      return true
    }
    return false
  }
})

/**
 * 执行后退
 */
export function back() {
  /**
   * 执行 beforeback 若返回false，则不再执行back()方法；
   * 否则（返回true或无返回值），继续执行back()方法；
   * @export
   * @param {Function} callback
   */
  if (utils.isFunction(_beforeback)) {
    if (_beforeback() === false) {
      return
    }
  }
  act.doAction('backs')
}

let _beforeback

/**
 * 设置 关闭之前再处理的一些其它业务逻辑
 * @export
 * @param {Function} bk 关闭之前再处理的一些其它业务逻辑的方法
 */
export function beforeback(bk) {
  _beforeback = bk
}
