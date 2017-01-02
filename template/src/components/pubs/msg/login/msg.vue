<template>
  <div>
    <popup :show.sync="show" height="100%" @on-show="onThisShow" @on-hide="onThisHide">
      <msg></msg>
    </popup>
  </div>
</template>

<script>
  /** vux components*/
  import Popup from 'vuxs/popup'
  /** project components*/
  import Msg from '../../../business/login.vue'

  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      reload: {
        type: Boolean,
        default: false
      },
      success: {
        type: Function,
        default () {}
      }
    },
    components: {
      Msg,
      Popup
    },
    ready() {
      var self = this
      api.ready(() => {
        var aMask = document.querySelector('a.vux-popup-mask')
        if (aMask) {
          if (window.plus) {
            aMask.style.height = plus.screen.resolutionHeight + 'px'
          } else {
            aMask.style.height = window.innerHeight + 'px'
          }
        }
      }, false)
    },
    methods: {
      onThisShow() {
        var self = this
        api.addBack({
          name: 'login',
          index: 6,
          handle: function() {
            if (self.show) {
              window.$login && window.$login.cancle && window.$login.cancle()
              return false
            }
            return true
          }
        })
      },
      onThisHide() {
        var self = this
        api.removeBack({
          name: 'login',
          index: 6,
          handle: function() {
            if (self.show) {
              window.$login && window.$login.cancle && window.$login.cancle()
              return false
            }
            return true
          }
        })
      }
    },
    watch: {
      show(val) {
        var aMask = document.querySelector('a.vux-popup-mask')
        if (aMask) {
          if (val) {
            aMask.style.backgroundColor = 'rgba(255, 255, 255, 1)'
          } else {
            aMask.style.backgroundColor = ''
          }
        }
      }
    }
  }
</script>
<style>
  /*.vux-popup-mask {
    background: rgba(255, 255, 255, 1) !important;
  }*/
</style>