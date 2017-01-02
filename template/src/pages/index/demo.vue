<template>
  <div id="demo">
    <divider>使用简单卡片头部和内容slot</divider>
    <card :header="{title:msg}">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-l vux-1px-r">
          <span>1130</span>
          <br/> 豆豆
        </div>
        <div class="vux-1px-r">
          <span>15</span>
          <br/> A券
        </div>
        <div class="vux-1px-r">
          <span>0</span>
          <br/> A卡/E卡
        </div>
        <div>
          <span>88</span>
          <br/> 七天待还
        </div>
      </div>
    </card>
    <br>
    <divider>简单头部,简单底部带链接</divider>
    <card :header="{title:'商品详情(简单头部)'}" :footer="{title:'表单验证(简单底部带链接)'}" @on-click-footer="testAction">
      <p slot="content" class="card-padding">
        这里是内容
        <br/>
        <x-button :mini="true" type="warn" @click="toast">提示</x-button>
        <x-button :mini="true" type="warn" @click="alert">警告框</x-button>
        <x-button :mini="true" type="warn" @click="confirm">确认框</x-button>
        <x-button :mini="true" type="warn" @click="dialog">弹出消息</x-button>
        <x-button :mini="true" type="warn" @click="error">网络错误</x-button>
        <x-button @click="settingAction" type="primary" text="表单验证"></x-button>
        <x-button @click="loginReload" type="primary">登录(登陆后刷新)</x-button>
        <x-button @click="loginRetry" type="primary">登录(登陆后重试)</x-button>
      </p>
    </card>
    <divider>简单头部
      <span v-text="date|date 'yyyy/MM/dd HH:mm:ss sss'"></span>
    </divider>
    <card :header="{title: '图标'}">
      <p slot="content" class="card-padding ">
        <c-icon type="question">后</c-icon>
        <br/>
        <c-icon>&#xe738;</c-icon>后
      </p>
    </card>
    <divider>使用头部slot和内容slot</divider>
    <card>
      <tip slot="header" style="padding:10px; ">2个头部:tip,image</tip>
      <img slot="header" src="http://placeholder.qiniudn.com/640x300 " style="width:100%;display:block; ">
      <div slot="content" class="card-padding ">
        <p style="color:#999;font-size:12px; ">2016-07-31 07:42:45</p>
        <p style="font-size:14px;line-height:1.2;padding-top:10px; ">
          C语言终于超越了Java，登顶榜首．Python超过C++成为第三名，C#被R顶出前五．最近几年R一路飙升，主要是由于乘上了大数据分析的浪潮．</p>
      </div>
    </card>
  </div>
</template>
<script>
  /** vux components*/
  import Tip from 'vuxs/tip'
  import Divider from 'vuxs/Divider'
  import Card from 'vuxs/card'
  import XButton from 'vuxs/x-button'
  /** customer components*/
  import cIcon from 'generals/c-Icon'

  export default {
    components: {
      cIcon,
      Tip,
      Card,
      Divider,
      XButton
    },
    vuex: {
      getters: {
        route: (state) => state.route
      }
    },
    ready() {
      var vm = this
      api.ready(() => {
        api.androidKeys()
      }, false)
      api.ready(() => {
        if (vm.route.name === 'Demo') {
          vm.loadData()
          vm.CompanyRecommended()
        }
      })
    },
    data() {
      return {
        msg: '我的钱包(简单头部)',
        date: '/Date(1373021259229)/'
      }
    },
    methods: {
      toast() {
        window.$toast && window.$toast({
          msg: '<i class="weui_icon weui_icon_info_circle "></i>网络不给力',
          time: 1000,
          type: 'text',
          width: '12.5rem',
          onHide: () => {
            api.log('toast 关闭回调')
          }
        })
      },
      alert() {
        window.$alert && window.$alert({
          msg: '百度<br/>1234',
          title: 'Alert',
          button: '好的,我知道了',
          onHide: () => {
            api.log('alert 关闭回调')
          }
        })
      },
      confirm() {
        window.$confirm && window.$confirm({
          title: '确认框',
          msg: '百度<br/>1234',
          confirm: '好的,我知道了',
          cancel: '取消',
          onHide: () => {
            api.log('confirm 关闭回调')
          },
          onConfirm: () => {
            api.log('confirm 确认回调')
          },
          onCancel: () => {
            api.log('confirm 取消回调')
          }
        }, false)
      },
      dialog() {
        window.$dialog && window.$dialog({
          msg: '百度<br/>1234',
          scroll: false,
          hideOnBlur: true,
          onHide: () => {
            api.log('dialog 关闭回调')
          }
        })
      },
      error() {
        api.webError(true)
      },
      // 设置
      settingAction() {
        // api.fire(window, 'test')
        api.openWindow('my_setting')
      },
      // 设置
      testAction() {
        // api.fire(window, 'test')
        api.openWindow('main')
      },
      loadData() {
        var vm = this
        var temp = vm.$http.get('http://demo.dcloud.net.cn/test/xhr/json.php', {
          app: {
            get: false
          },
          timeout: 10000
        }).then(function(response) {
          response.data = JSON.parse(response.data)
          api.log('loadData')

          // api.log('正常\r\n' + JSON.stringify(response.data, null, 4))
          setTimeout(() => {
            vm.$set('msg', response.data.string)
          }, 200)

          // return vm.CompanyRecommended()
        }, function(response) {
          // handle error
          api.log('错误\r\n' + JSON.stringify(response, null, 4))
        })
      },
      CompanyRecommended() {
        return this.$http.get('Buyer/UserCompany/CompanyRecommended', {
          params: {
            pageSize: 1
          },
          app: {
            reload: true,
            retry: this.CompanyRecommended
          }
        }).then(function(response) {
          api.log('CompanyRecommended')

          // api.log('正常\r\n' + JSON.stringify(response, null, 4))
        }, function(response) {
          // handle error
          api.log('错误\r\n' + JSON.stringify(response, null, 4))
        })
      },
      loginReload() {
        window.$login.show(true)
      },
      loginRetry() {
        window.$login.show({
          reload: false,
          success: () => {
            window.$alert && window.$alert({
              msg: '成功后续操作',
              title: '登录成功',
              button: '确定'
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .card-demo-flex {
    display: flex;
  }
  
  .card-demo-content01 {
    padding: 10px 0;
  }
  
  .card-padding {
    padding: 15px 20px;
  }
  
  .card-demo-flex>div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  
  .card-demo-flex span {
    color: #f74c31;
  }
  
  .btnstyle {
    border-radius: 100px;
    margin-top: 30px;
  }
</style>