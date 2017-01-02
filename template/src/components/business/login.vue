<template>
  <div>
    <c-box :padding-top="46" :padding-bottom="0" v-ref:box>
      <!--header slot-->
      <c-header slot="header" :left-options="{showBack:true}">用户登录</c-header>
      <!--default slot-->
      <!--<div class="center">
        <p>
          XXX登录
        </p>
        <img class="logo" src="../../img/logo.png">
      </div>-->
      <c-group style="margin-top:20px;background-color: transparent" label-width="4em" label-align="left" label-margin-right="5px">
        <field title="账号" name="username" placeholder="请输账号" icon="wode" :value.sync="username" :errors="getError('username')"></field>
        <field title="密码" name="password" type="password" placeholder="请输入密码" icon="gengduo" :value.sync="password" :errors="getError('password')"></field>
      </c-group>
      <c-group style="margin-top:30px;padding: 10px 15px;">
        <x-button type="primary" style="padding: 5px 0;" @click="handleSubmit" :disabled="invalid">登&nbsp;&nbsp;&nbsp;&nbsp;录</x-button>
      </c-group>
      <!--bottom slot-->
    </c-box>
  </div>
</template>

<script>
  /** vux components*/
  import XButton from 'vuxs/x-button'
  /** customer components*/
  import cBox from 'pubs/c-box'
  import CHeader from 'pubs/c-header'
  import cIcon from 'pubs/c-Icon'
  import cGroup from 'pubs/c-group'
  import Field from 'pubs/form/field'

  export default {
    components: {
      XButton,
      cBox,
      cIcon,
      CHeader,
      Field,
      cGroup
    },
    props: {},
    ready() {
      var vm = this
      var temp = vm.$http.get('http://demo.dcloud.net.cn/test/xhr/json.php', {
        app: {
          get: false
        },
        timeout: 10000
      })
    },
    vaRules: {
      username: {
        'required': {
          limit: true,
          message: '请输入账号'
        },
        'minlength': {
          limit: 4,
          message: '账号最少##limit##个字'
        }
      },
      password: {
        'required': {
          limit: true,
          message: '请输入密码'
        },
        'minlength': {
          limit: 6,
          message: '密码最少##limit##个字'
        }
      }
    },
    computed: {
      invalid() {
        return this.$va.invalid
      }
    },
    data: function() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      close() {
        api.back()
      },
      login() {
        // 登录的方法
        app.useLogin()

        // 登录成功的全局处理
        this.success()
      },
      success() {
        this.username = ''
        this.password = ''
        setTimeout(() => {
          this.$va.clear()
        }, 150)

        if (window.$login) {
          window.$login.callBack()
          if (window.$login.needReload()) {
            api.refresh()
          }
        }

        api.fireAll('logined')
      },
      getError(field) {
        return this.$va.$errors[field] || []
      },
      handleSubmit() {
        if (this.$va.check()) {
          this.login()
        }
      }
    }
  }
</script>

<style>
  .center {
    margin-top: 60px;
    text-align: center;
  }
</style>