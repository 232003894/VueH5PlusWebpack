<template>
  <c-box :padding-top="46" :padding-bottom="55" v-ref:box>
    <!--header slot-->
    <c-header slot="header" :left-options="{showBack:true}">用户登录</c-header>
    <!--default slot-->
    <div>
      <group>
        <c-input title="账户" name="username" inline-desc="123" placeholder="请输入用户名或手机号"></c-input>
        <c-input title="密码" name="username" type="password" placeholder="请输入密码"></c-input>
      </group>
      <group>
        <x-button type="primary" @click="login">登录</x-button>
        <!--<x-button type="primary" @click="close">取消登录</x-button>-->
      </group>
    </div>
    <!--bottom slot-->
  </c-box>
</template>

<script>
  /** vux components*/
  import Group from 'vuxs/group'
  import XButton from 'vuxs/x-button'
  /** customer components*/
  import cBox from 'generals/c-box'
  import CHeader from 'generals/c-header'
  import cIcon from 'generals/c-Icon'
  import cInput from 'generals/c-input'

  /** $api*/
  import * as $api from 'api'
  /** $app*/
  import * as $app from 'app'

  export default {
    components: {
      cBox,
      cIcon,
      CHeader,
      cInput,
      XButton,
      Group
    },
    props: {},
    ready() {},
    data: function() {
      return {}
    },
    methods: {
      close() {
        $api.back()
      },
      login() {
        // 登录的方法
        $app.useLogin()

        // 登录成功的全局处理
        this.success()
      },
      success() {
        if ($api.loginOpts.loginCallBack) {
          $api.loginOpts.loginCallBack()
        }
        if ($api.loginOpts.needReload) {
          $api.refresh()
        }
        $api.fireAll('logined')
      }
    }
  }
</script>

<style>

</style>