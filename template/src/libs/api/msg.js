import {
  os
} from './os'
import * as init from './init'
import * as utils from './utils'

/**
 * toast
 * opts obj 或 string
 * vAlign 垂直对齐 默认"center" "top"、"center"、"bottom"  plus.nativeUI.toast才用的
 * @export
 * @param {Object} opts
 * @param {string} vAlign 垂直对齐
 */
export function toast(opts, vAlign) {
  var _msg
  if (utils.getType(opts) === 'string') {
    _msg = opts
  } else {
    _msg = opts.text
  }

  if ((utils.getType(opts) === 'string' && os.plus) || !init.global.msg || !init.global.msg.toastOptions) {
    var verticalAlign = 'center'
    if (vAlign && utils.getType(vAlign) === 'string') {
      verticalAlign = vAlign
    }
    plus.nativeUI.toast(_msg, {
      verticalAlign: verticalAlign
    })
  } else if (init.global.msg && init.global.msg.toastOptions) {
    if (init.global.msg.toastOptions.show) {
      init.global.msg.toastOptions.show = false
    }
    utils.mix(true, init.global.msg.toastOptions, init.global.msg._toastOptions, opts)
    init.global.msg.toastOptions.show = true
  } else {
    alert(_msg)
  }
}
