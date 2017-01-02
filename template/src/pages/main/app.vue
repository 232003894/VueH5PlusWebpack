<template>
  <c-box :padding-top="46" :padding-bottom="55" v-ref:box>
    <!--header slot-->
    <c-header slot="header" :left-options="{showBack:true}">测试</c-header>
    <!--default slot-->
    <c-group style="margin-top: 50px;">
      <x-button type="primary" @click="handleSubmit" :disabled="invalid">测试</x-button>
    </c-group>
    <!--bottom slot-->
  </c-box>
</template>

<script>
  /** vux components*/
  import XButton from 'vuxs/x-button'
  /** customer components*/
  import cBox from 'generals/c-box'
  import CHeader from 'generals/c-header'
  import cGroup from 'generals/c-group'

  export default {
    components: {
      XButton,
      cBox,
      CHeader,
      cGroup
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