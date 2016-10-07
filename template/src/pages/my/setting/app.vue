<template>
  <div>
    <group>
      <cell title="接收新消息通知" value="已启用"></cell>
    </group>
    <tip>如果你要关闭或开启微信的新消息通知，请在iPhone的"设置"-"通知"功能中，找到应用程序"微信"更改。</tip>

    <group>
      <switch title="通知显示消息详情" :value="true"  @on-change="change"></switch>
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
  </div>
</template>

<script>
    import {
        Group,
        Tip,
        Switch,
        Cell
    } from 'vux-components';

    import {
        config,
        common,
        pages,
        Vue
    } from 'assets/Lib.js';

    export default {
        ready() {},
        components: {
            Group,
            Tip,
            Switch,
            Cell
        },
        data() {
            return {}
        },
        methods: {
            change(value) {
                console.log('change:', value)
            }
        }
    }
</script>

<style>

</style>