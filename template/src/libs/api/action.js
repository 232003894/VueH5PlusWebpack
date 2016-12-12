import * as utils from './utils'

var hooks = {}

/**
 * 执行指定类型的action
 * @export
 * @param {String} type action类型
 * @param {Function} callback 回调
 */
export function doAction(type, callback) {
  if (type.trim() === '') {
    return
  }
  if (utils.isFunction(callback)) {
    // 指定了callback
    hooks[type] && hooks[type].every(callback)
  } else {
    // 未指定callback，直接执行
    hooks[type] && hooks[type].every(function (hook, index) {
      return hook.handle() !== false
    })
  }
}

/**
 * 添加指定类型action的钩子
 * handel返回false代表中断后续钩子,反之则继续后续钩子
 * @export
 * @param {String} type action类型
 * @param {Object} hook 处理钩子
 * @returns {Array} 该类型的钩子集合
 */
export function addAction(type, hook) {
  if (type.trim() === '') {
    return
  }
  var _hooks = hooks[type]
  if (!_hooks) {
    _hooks = []
  }
  hook.index = hook.index || 1000

  // unshift push
  _hooks.unshift(hook)
  _hooks.sort(function (a, b) {
    return a.index - b.index
  })
  hooks[type] = _hooks
  return hooks[type]
}

/**
 * 删除指定类型action的钩子
 * @export
 * @param {String} type action类型
 * @param {Object} hook 处理钩子
 * @returns {Array} 该类型的钩子集合
 */
export function removeAction(type, hook) {
  if (type.trim() === '') {
    return
  }
  var _hooks = hooks[type]
  if (!_hooks) {
    return
  }
  var arr = []
  _hooks.forEach(function (_hook, index) {
    // if (utils.equals(hook, _hook, 'name,index')) {
    if (utils.equals(hook, _hook)) {
      arr.unshift(index)
    }
  })
  arr.forEach(function (no) {
    _hooks.removeAt(no)
  })

  return hooks[type]
}
