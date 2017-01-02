<template>
  <div>
    <msg :show.sync="show" :text="msg" :type="type" :time="time" :width="width" @on-hide="onThisHide"></msg>
  </div>
</template>

<script>
  //   import * as back from '../../../libs/api/back'
  /** vux components*/
  import Msg from 'vuxs/toast'

  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      time: {
        type: Number,
        default: 2000
      },
      type: {
        type: String,
        default: 'text'
      },
      width: {
        type: String,
        default: '7.6em'
      },
      msg: String
    },
    components: {
      Msg
    },
    methods: {
      onThisHide() {
        // console.log('onToastHide')
        // setTimeout(() => {
        //   this.msg = ''
        //   this.time = 2000
        //   this.type = 'text'
        //   this.width = '7.6em'
        // }, 200)
      }
    }
  }
</script>

<style>
  .vux-toast .weui_toast {
    top: 40%
  }
</style>