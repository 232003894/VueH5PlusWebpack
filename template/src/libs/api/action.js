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
    hooks[type] && hooks[type].forEach(callback)
  } else {
    // 未指定callback，直接执行
    hooks[type] && hooks[type].forEach(function (hook, index) {
      return !hook.handle()
    })
  }
}

/**
 * 添加指定类型action的钩子
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
  _hooks.push(hook)
  _hooks.sort(function (a, b) {
    return a.index - b.index
  })
  hooks[type] = _hooks
  return hooks[type]
}
