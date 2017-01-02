<template>
  <div>
    <msg :show.sync="show" :title="title" :button-text="button" @on-show="onThisShow" @on-hide="onThisHide">
      <div v-html="msg"></div>
    </msg>
  </div>
</template>

<script>
  /** vux components*/
  import Msg from 'vuxs/alert'

  export default {
    props: {
      show: Boolean,
      title: {
        type: String,
        default: '提示'
      },
      msg: String,
      button: {
        type: String,
        default: '确定'
      }
    },
    components: {
      Msg
    },
    methods: {
      onThisShow() {
        var self = this
        api.addBack({
          name: 'alert',
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
          name: 'alert',
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