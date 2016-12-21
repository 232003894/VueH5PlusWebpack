<template>
  <div>
    <toast :show.sync="toastOptions.show" :text="toastOptions.msg" :type="toastOptions.type" :time="toastOptions.time" :width="toastOptions.width" @on-hide="onToastHide"></toast>
    <alert :show.sync="alertOptions.show" :title="alertOptions.title" :button-text="alertOptions.buttonText" @on-show="onAlertShow" @on-hide="onAlertHide">
      <div v-html="alertOptions.msg"></div>
    </alert>
    <confirm :show.sync="confirmOptions.show" :title="confirmOptions.title" :confirm-text="confirmOptions.confirmText" :cancel-text="confirmOptions.cancelText" @on-show="onConfirmShow" @on-hide="onConfirmHide" @on-cancel="onConfirmCancel" @on-confirm="onConfirm">
      <div v-html="confirmOptions.msg"></div>
    </confirm>
    <dialog :show.sync="dialogOptions.show" :hide-on-blur="dialogOptions.hideOnBlur" :scroll="dialogOptions.scroll" @on-show="onDialogShow" @on-hide="onDialogHide">
      <div v-html="dialogOptions.msg"></div>
    </dialog>
    <loading :show="isLoading" text="载入中"></loading>
    <popup :show.sync="isLogin" height="100%" @on-show="onLoginShow" @on-hide="onLoginHide">
      <login></login>
    </popup>
  </div>
</template>

<script>
  import * as utils from '../../libs/api/utils'
  import * as init from '../../libs/api/init'
  import * as back from '../../libs/api/back'
  import * as msg from '../../libs/api/msg'
  import * as re from '../../libs/api/ready'
  /** vux components*/
  import Toast from 'vuxs/toast'
  import Alert from 'vuxs/alert'
  import Confirm from 'vuxs/confirm'
  import Dialog from 'vuxs/dialog'
  import Popup from 'vuxs/popup'
  /** project components*/
  import Loading from './c-loading'
  import Login from '../business/login.vue'

  export default {
    props: {},
    components: {
      Toast,
      Alert,
      Confirm,
      Dialog,
      Loading,
      Popup,
      Login
    },
    ready() {
      var self = this
      init.msgOpts = self.$data
      re.ready(() => {
        var aMask = document.querySelector('a.vux-popup-mask')
        if (aMask) {
          if (window.plus) {
            aMask.style.height = plus.screen.resolutionHeight + 'px'
          } else {
            aMask.style.height = document.body.offsetHeight + 'px'
          }
        }
      })
    },
    data: function() {
      return {
        _toastOptions: {
          show: false,
          time: 2000,
          // success,text,cancel,warn
          type: 'text',
          transition: 'vux-fade',
          width: '7.6em',
          // 可以是html
          msg: '',
          onHide: null
        },
        toastOptions: {
          show: false,
          time: 2000,
          // success,text,cancel,warn
          type: 'text',
          width: '7.6em',
          // 可以是html
          msg: ''
        },
        _alertOptions: {
          show: false,
          title: '',
          msg: '',
          buttonText: '确定',
          alertCB: null
        },
        alertOptions: {
          show: false,
          title: '',
          msg: '',
          buttonText: ''
        },
        _confirmOptions: {
          show: false,
          title: '',
          msg: '',
          confirmText: '确定',
          cancelText: '取消',
          onConfirmHide: null,
          onConfirm: null,
          onCancel: null
        },
        confirmOptions: {
          show: false,
          title: '',
          msg: '',
          confirmText: '确定',
          cancelText: '取消'
        },
        _dialogOptions: {
          show: false,
          msg: '',
          scroll: true,
          hideOnBlur: false,
          onDialogHide: null
        },
        dialogOptions: {
          show: false,
          msg: '',
          scroll: true,
          hideOnBlur: false
        },
        isLoading: false,
        isLogin: false
      }
    },
    methods: {
      onToastHide() {
        // utils.log('toast 关闭')
        if (this.toastOptions.onHide && utils.isFunction(this.toastOptions.onHide)) {
          this.toastOptions.onHide()
        }
      },
      onAlertShow() {
        // utils.log('alert 打开')
        var self = this
        back.addBack({
          name: 'alert',
          index: 5,
          handle: function() {
            if (self.alertOptions.show) {
              self.alertOptions.show = false
              return false
            }
            return true
          }
        })
      },
      onAlertHide() {
        // utils.log('alert 关闭')
        var self = this
        back.removeBack({
          name: 'alert',
          index: 5,
          handle: function() {
            if (self.alertOptions.show) {
              self.alertOptions.show = false
              return false
            }
            return true
          }
        })
        if (this.alertOptions.alertCB && utils.isFunction(this.alertOptions.alertCB)) {
          this.alertOptions.alertCB()
        }
        utils.mix(true, self.alertOptions, self._alertOptions)
      },
      onConfirmShow() {
        // utils.log('confirm 打开')
        var self = this
        back.addBack({
          name: 'confirm',
          index: 5,
          handle: function() {
            if (self.confirmOptions.show) {
              self.confirmOptions.show = false
              self.onConfirmCancel()
              return false
            }
            return true
          }
        })
      },
      onConfirmHide() {
        // utils.log('confirm 关闭')
        var self = this
        back.removeBack({
          name: 'confirm',
          index: 5,
          handle: function() {
            if (self.confirmOptions.show) {
              self.confirmOptions.show = false
              self.onConfirmCancel()
              return false
            }
            return true
          }
        })
        if (this.confirmOptions.onConfirmHide && utils.isFunction(this.confirmOptions.onConfirmHide)) {
          this.confirmOptions.onConfirmHide()
        }
        utils.mix(true, this.confirmOptions, this._confirmOptions)
      },
      onConfirm() {
        // utils.log('confirm 确定')
        if (this.confirmOptions.onConfirm && utils.isFunction(this.confirmOptions.onConfirm)) {
          this.confirmOptions.onConfirm()
        }
      },
      onConfirmCancel() {
        // utils.log('confirm 取消')
        if (this.confirmOptions.onCancel && utils.isFunction(this.confirmOptions.onCancel)) {
          this.confirmOptions.onCancel()
        }
      },
      onDialogShow() {
        // utils.log('dialog 打开')
        var self = this
        back.addBack({
          name: 'dialog',
          index: 5,
          handle: function() {
            if (self.dialogOptions.show) {
              self.dialogOptions.show = false
              return false
            }
            return true
          }
        })
      },
      onDialogHide() {
        // utils.log('dialog 关闭')
        var self = this
        back.removeBack({
          name: 'dialog',
          index: 5,
          handle: function() {
            if (self.dialogOptions.show) {
              self.dialogOptions.show = false
              return false
            }
            return true
          }
        })
        if (this.dialogOptions.onDialogHide && utils.isFunction(this.dialogOptions.onDialogHide)) {
          this.dialogOptions.onDialogHide()
        }
      },
      onLoginShow() {
        // utils.log('login 打开')
        var self = this
        back.addBack({
          name: 'login',
          index: 6,
          handle: function() {
            if (self.isLogin) {
              msg.cancleLogin()
              return false
            }
            return true
          }
        })
      },
      onLoginHide() {
        // utils.log('login 关闭')
        var self = this
        back.removeBack({
          name: 'login',
          index: 6,
          handle: function() {
            if (self.isLogin) {
              msg.cancleLogin()
              return false
            }
            return true
          }
        })
      }
    }
  }
</script>
<style>
  .weui_toast.vux-fade-transition.weui_toast_text {
    top: 40%
  }
  
  .vux-popup-mask {
    background: rgba(255, 255, 255, 1) !important;
  }
</style>