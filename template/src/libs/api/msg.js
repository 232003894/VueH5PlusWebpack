/**
 * msg api 的前提 2选1
 * 1.调用了 c-msg 组件
 * 2.调用了 c-app 组件
 * 这2个组件2选一
 */

import {
  os
} from './os'
import * as init from './init'
import * as utils from './utils'
import * as back from './back'

/**
 * toast
 * opts obj 或 string
 * vAlign 垂直对齐 默认"center" "top"、"center"、"bottom"  plus.nativeUI.toast才用的
 * @export
 * @param {Object} opts
 * @param {string} vAlign 垂直对齐
 */
export function toast(opts, vAlign) {
  var isString = false
  if (utils.getType(opts) === 'string') {
    isString = true
    opts = {
      msg: opts || '消息'
    }
  }
  if ((isString || !init.msgOpts || !init.msgOpts.confirmOptions) && window.plus) {
    var verticalAlign = 'center'
    if (vAlign && utils.getType(vAlign) === 'string') {
      verticalAlign = vAlign
    }
    plus.nativeUI.toast(opts.msg, {
      verticalAlign: verticalAlign
    })
  } else if (init.msgOpts && init.msgOpts.toastOptions) {
    if (init.msgOpts.toastOptions.show) {
      init.msgOpts.toastOptions.show = false
    }
    opts.show = true
    setTimeout(() => {
      utils.mix(true, init.msgOpts.toastOptions, init.msgOpts._toastOptions, opts)
    }, 15)
  } else {
    alert(opts.msg)
  }
}

/**
 * alert
 * opts obj 或 string
 * @export
 * @param {Object} opts
 * @param {Boolean} usePlus
 */
export function alert(opts, usePlus) {
  var isString = false
  if (utils.getType(opts) === 'string') {
    isString = true
    opts = {
      msg: '',
      title: utils.htmlToTxt(opts) || '提示',
      buttonTex: '确定',
      alertCB: null
    }
  } else {
    opts.msg = opts.msg || ''
    opts.title = opts.title || '提示'
    opts.buttonTex = opts.buttonText || '确定'
    opts.alertCB = opts.alertCB || null
  }

  if ((usePlus === true || isString || !init.msgOpts || !init.msgOpts.confirmOptions) && window.plus) {
    if (opts.msg === '') {
      opts.msg = opts.title
      opts.title = ''
    }
    opts.msg = utils.htmlToTxt(opts.msg)
    plus.nativeUI.alert(opts.msg, opts.alertCB, opts.title, opts.buttonText)
  } else if (init.msgOpts && init.msgOpts.alertOptions) {
    // if (init.msgOpts.alertOptions.show) {
    //   init.msgOpts.alertOptions.show = false
    // }
    opts.show = true
    setTimeout(() => {
      utils.mix(true, init.msgOpts.alertOptions, init.msgOpts._alertOptions, opts)
    }, 15)
  } else {
    opts.msg = utils.htmlToTxt(opts.msg || opts.title)
    window.alert(opts.msg)
    opts.alertCB && opts.alertCB()
  }
}

/**
 * confirm
 * opts obj 或 string
 * @export
 * @param {Object} opts
 * @param {Boolean} usePlus
 */
export function confirm(opts, usePlus) {
  var isString = false
  if (utils.getType(opts) === 'string') {
    isString = true
    opts = {
      msg: '',
      title: utils.htmlToTxt(opts) || '是否确定？',
      confirmText: '确定',
      cancelText: '取消',
      onConfirmHide: null,
      onConfirm: null,
      onCancel: null
    }
  } else {
    opts.msg = opts.msg || ''
    opts.title = opts.title || '是否确定？'
    opts.confirmText = opts.confirmText || '确定'
    opts.cancelText = opts.cancelText || '取消'
    opts.onConfirmHide = opts.onConfirmHide || null
    opts.onConfirm = opts.onConfirm || null
    opts.onCancel = opts.onCancel || null
  }
  if ((usePlus === true || isString || !init.msgOpts || !init.msgOpts.confirmOptions) && window.plus) {
    if (opts.msg === '') {
      opts.msg = opts.title
      opts.title = ''
    }
    opts.msg = utils.htmlToTxt(opts.msg)
    plus.nativeUI.confirm(opts.msg, (e) => {
      if (e.index === 0) {
        opts.onCancel && opts.onCancel()
      } else if (e.index === 1) {
        opts.onConfirm && opts.onConfirm()
      }
      opts.onConfirmHide && opts.onConfirmHide()
    }, opts.title, [opts.cancelText, opts.confirmText])
  } else if (init.msgOpts && init.msgOpts.confirmOptions) {
    opts.show = true
    setTimeout(() => {
      utils.mix(true, init.msgOpts.confirmOptions, init.msgOpts._confirmOptions, opts)
    }, 15)
  } else {
    opts.msg = utils.htmlToTxt(opts.msg || opts.title)
    var r = window.confirm(opts.msg)
    if (r === true) {
      opts.onConfirm && opts.onConfirm()
    } else {
      opts.onCancel && opts.onCancel()
    }
    opts.onConfirmHide && opts.onConfirmHide()
  }
}

/**
 * dialog
 * @export
 * @param {Object} opts
 */
export function dialog(opts) {
  if (init.msgOpts && init.msgOpts.dialogOptions) {
    if (init.msgOpts.dialogOptions.show) {
      init.msgOpts.dialogOptions.show = false
    }
    opts.show = true
    setTimeout(() => {
      utils.mix(true, init.msgOpts.dialogOptions, init.msgOpts._dialogOptions, opts)
    }, 50)
  }
}

/**
 * loading
 * @export
 * @param {Bollon} value 显示或隐藏
 */
export function loading(value) {
  init.msgOpts.isLoading = value !== false
  return this
}

/**
 * show error
 * @export
 * @param {Bollon} value 显示或隐藏
 */
export function webError(value) {
  init.boxOpts.isError = value !== false
  return this
}

/**
 * showLogin
 * @export
 * @param {any} needReload 登录后是否需要刷新
 * @param {any} loginCallBack 登录后回调,可以用于重试
 * @returns
 */
export function showLogin(needReload, loginCallBack) {
  if (init.msgOpts.isLogin !== true) {
    init.msgOpts.isLogin = true
    init.loginOpts.needReload = (needReload === true)
    if (loginCallBack && utils.isFunction(loginCallBack)) {
      init.loginOpts.loginCallBack = loginCallBack
    } else {
      init.loginOpts.loginCallBack = undefined
    }
  }
  return this
}

/**
 * closeLogin
 * @export
 */
export function closeLogin() {
  if (init.msgOpts.isLogin === true) {
    // console.log('closeLogin')
    init.msgOpts.isLogin = false
    init.loginOpts.needReload = false
    init.loginOpts.loginCallBack = undefined
  }
  return this
}

/**
 * cancleLogin
 * @export
 */
export function cancleLogin() {
  if (init.msgOpts.isLogin === true) {
    setTimeout(() => {
      // reload 后退/关闭来源
      if (init.loginOpts.needReload) {
        // console.log('cancleLogin')
        if (window.plus) {
          back.h5Back()
        } else {
          if (window.history.length > 1) {
            window.history.back()

            // 关闭登录层
            setTimeout(() => {
              closeLogin()
            }, 300)
          } else {
            // confirm
            confirm({
              title: '退出登录',
              msg: '退出登录会关闭本页面,是否退出登录？',
              confirmText: '不了，继续登录',
              cancelText: '是的，我要退出',
              onConfirmHide: () => {
                // utils.log('confirm 关闭')
              },
              onConfirm: () => {
                // utils.log('不了，继续登录')
              },
              onCancel: () => {
                // utils.log('是的，我要退出')
                window.close()
              }
            }, false)
          }
        }
      } else {
        // 关闭登录层
        closeLogin()
      }
    }, 0)
  }
  return this
}
