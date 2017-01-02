<template>
  <div>
    <msg :show="show" :text="msg"></msg>
  </div>
</template>
<script>
  import Msg from './loading'
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      msg: {
        type: String,
        default: '载入中'
      }
    },
    components: {
      Msg
    }
  }
</script>
<style>

</style>