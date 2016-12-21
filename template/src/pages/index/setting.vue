<template>
  <div id="setting">
    <group>
      <cell title="接收新消息通知" value="已启用"></cell>
    </group>
    <tip>如果你要关闭或开启微信的新消息通知，请在iPhone的"设置"-"通知"功能中，找到应用程序"微信"更改。</tip>

    <group>
      <switch title="通知显示消息详情" :value="true" @on-change="change"></switch>
    </group>
    <tip>关闭后，当收到微信消息时，通知提示将不再显示发信人和内容摘要。</tip>

    <group>
      <cell title="功能消息免打扰" is-link></cell>
    </group>
    <tip>设置系统功能消息提示声音和振动的时段。</tip>

    <group>
      <switch title="声音" :value="false" @on-change="change"></switch>
      <switch title="振动" :value="true" @on-change="change"></switch>
    </group>
    <tip>当微信在运行时，你可以设置是否需要声音或者振动。</tip>

    <group>
      <switch title="朋友圈照片更新" :value="true" @on-change="change"></switch>
    </group>
    <tip>关闭后，有朋友更新照片时，界面下面的"发现"切换按钮上不再出现红点提示。</tip>

    <img class="logo" src="../../img/logo.png">
  </div>
</template>

<script>
  /** vux components*/
  import Group from 'vuxs/group'
  import Tip from 'vuxs/tip'
  import Cell from 'vuxs/cell'
  import Switch from 'vuxs/Switch'
  /** customer components*/
  /** $api*/
  import * as $api from 'api'
  /** $app*/
  import * as $app from 'app'

  export default {
    components: {
      Group,
      Tip,
      Switch,
      Cell
    },
    vuex: {
      getters: {
        route: (state) => state.route
      }
    },
    ready() {
      var vm = this
    },
    data() {
      return {}
    },
    methods: {
      change(value) {
        $api.showLogin(true)
        $api.fireAll('test', {
          a: 1,
          b: 3,
          c: [1, 2, 3]
        })
      }
    }
  }
</script>

<style scoped>

</style>