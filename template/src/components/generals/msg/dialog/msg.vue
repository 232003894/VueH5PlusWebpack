<template>
  <div>
    <msg :show.sync="show" :hide-on-blur="hideOnBlur" :scroll="scroll" @on-show="onThisShow" @on-hide="onThisHide">
      <div v-html="msg"></div>
    </msg>
  </div>
</template>

<script>
  /** vux components*/
  import Msg from 'vuxs/dialog'

  export default {
    props: {
      show: Boolean,
      title: {
        type: String,
        default: '提示'
      },
      msg: String,
      scroll: true,
      hideOnBlur: false
    },
    components: {
      Msg
    },
    methods: {
      onThisShow() {
        var self = this
        api.addBack({
          name: 'dialog',
          index: 5,
          handle: function() {
            if (self.show) {
              self.show = false
              return false
            }
            return true
          }
        })
      },
      onThisHide() {
        var self = this
        api.removeBack({
          name: 'dialog',
          index: 5,
          handle: function() {
            if (self.show) {
              self.show = false
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