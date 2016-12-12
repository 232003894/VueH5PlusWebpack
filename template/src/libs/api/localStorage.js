import * as utils from './utils'

/**
 * 获取当前状态
 * @export
 * @returns
 */
export function getState() {
  var state = JSON.parse(localStorage.getItem('$state') || '{}')
  state = utils.mix(true, {
    t: '',
    s: ''
  }, state)
  return state
}

/**
 * 设置当前状态
 * @export
 * @param {any} state
 */
export function setState(state) {
  state = state || {}
  localStorage.setItem('$state', JSON.stringify(state))
}

/**
 * 获取应用本地配置
 * @export
 * @returns
 */
export function getSettings() {
  var settings = JSON.parse(localStorage.getItem('$settings') || '{}')
  settings = utils.mix(true, {}, settings)
  return settings
}

/**
 * 设置应用本地配置
 * @export
 * @param {any} settings
 */
export function setSettings(settings) {
  settings = settings || {}
  localStorage.setItem('$settings', JSON.stringify(settings))
}
