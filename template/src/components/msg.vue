<template>
  <toast :show.sync="toastOptions.show" :text="toastOptions.text" :type="toastOptions.type" :time="toastOptions.time" :width="toastOptions.width" @on-hide="onToastHide"></toast>
</template>

<script>
  import * as utils from '../libs/api/utils'
  import * as init from '../libs/api/init'
  /** vux components*/
  import Toast from 'vux-components/toast'

  export default {
    props: {},
    components: {
      Toast
    },
    ready() {
      var self = this
      init.global.msg = init.options.msg = self.$data
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
          text: '',
          onHide: null
        },
        toastOptions: {
          show: false,
          time: 2000,
          // success,text,cancel,warn
          type: 'success',
          transition: 'vux-fade',
          width: '7.6em',
          // 可以是html
          text: ''
        }
      }
    },
    methods: {
      onToastHide() {
        console.log('toast hide')
        if (this.toastOptions.onHide && utils.isFunction(this.toastOptions.onHide)) {
          this.toastOptions.onHide()
        }
      }
    }
  }
</script>


<style scoped>

</style>