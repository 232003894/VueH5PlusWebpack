<template>
  <div>
    <msg :show.sync="show" :title="title" :confirm-text="confirm" :cancel-text="cancel" @on-show="onThisShow" @on-hide="onThisHide" @on-cancel="onThisCancel" @on-confirm="onThisConfirm">
      <div v-html="msg"></div>
    </msg>
  </div>
</template>

<script>
  /** vux components*/
  import Msg from 'vuxs/confirm'

  export default {
    props: {
      show: Boolean,
      title: {
        type: String,
        default: '确认'
      },
      msg: String,
      confirm: {
        type: String,
        default: '确定'
      },
      cancel: {
        type: String,
        default: '取消'
      },
      onCancel: {
        type: Function,
        default () {}
      },
      onConfirm: {
        type: Function,
        default () {}
      }
    },
    components: {
      Msg
    },
    methods: {
      onThisConfirm() {
        var self = this
        setTimeout(() => {
          self.onConfirm()
        }, 0)
      },
      onThisCancel() {
        var self = this
        setTimeout(() => {
          self.onCancel()
        }, 0)
      },
      onThisShow() {
        var self = this
        api.addBack({
          name: 'confirm',
          index: 5,
          handle: function() {
            if (self.show) {
              self.show = false
              self.onConfirmCancel()
              return false
            }
            return true
          }
        })
      },
      onThisHide() {
        var self = this
        api.removeBack({
          name: 'confirm',
          index: 5,
          handle: function() {
            if (self.show) {
              self.show = false
              self.onConfirmCancel()
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

</style>