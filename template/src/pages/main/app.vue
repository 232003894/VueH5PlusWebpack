<template>
  <box :padding-top="46" :padding-bottom="55" v-ref:box>
    <!--header slot-->
    <c-header slot="header" :left-options="{showBack:true}">测试</c-header>
    <!--default slot-->
    <group style="margin-top: 50px;">
      <x-button type="primary" @click="handleSubmit" :disabled="invalid">测试</x-button>
    </group>
    <!--bottom slot-->
  </box>
</template>

<script>
  /** vux components*/
  import XButton from 'vuxs/x-button'
  /** customer components*/
  import Box from 'pubs/box'
  import CHeader from 'pubs/c-header'
  import Group from 'pubs/group'

  export default {
    components: {
      XButton,
      Box,
      CHeader,
      Group
    },
    props: {},
    ready() {},
    data: () => {
      return {}
    },
    methods: {
      handleSubmit() {
        window.$toast({
          msg: 'This is toast',
          time: 1000,
          onHide() {
            window.$toast({
              msg: 'text toast',
              type: 'text',
              time: 1000
            })
          }
        })
      }
    }
  }
</script>

<style>

</style>