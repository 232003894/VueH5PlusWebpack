<template>
  <c-app :padding-top="46" :padding-bottom="55" v-ref:app>
    <!--header slot-->
    <x-header slot="header" :left-options="{showBack:false}">主页</x-header>
    <!--default slot-->
    <div>
      <divider>使用简单卡片头部和内容slot</divider>
      <card :header="{title:msg}">
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-l vux-1px-r">
            <span>1130</span>
            <br/> 豆豆
          </div>
          <div class="vux-1px-r">
            <span>15</span>
            <br/> 东券
          </div>
          <div class="vux-1px-r">
            <span>0</span>
            <br/> 东卡/E卡
          </div>
          <div>
            <span>88</span>
            <br/> 七天待还
          </div>
        </div>
      </card>
      <br>
      <divider>简单头部,简单底部带链接</divider>
      <card :header="{title:'商品详情(简单头部)'}" :footer="{title:'设置(简单底部带链接)',link:settingUrl}">
        <p slot="content" class="card-padding">
          这里是内容
          <br/>
          <x-button :mini="true" type="warn" @click="toast">toast</x-button>
          <x-button :mini="true" type="warn" @click="alert">alert</x-button>
          <x-button :mini="true" type="warn" @click="confirm">confirm</x-button>
          <x-button :mini="true" type="warn" @click="dialog">
            dialog
          </x-button>
          <x-button @click="settingAction" type="primary" text="设&nbsp;&nbsp;置"></x-button>
        </p>
      </card>
      <divider>简单头部</divider>
      <card :header="{title:'图标'}">
        <p slot="content" class="card-padding">
          <c-icon type="home">后</c-icon>
          <br/>
          <c-icon>&#xe73e;</c-icon>
        </p>
      </card>
      <divider>使用头部slot和内容slot</divider>
      <card>
        <tip slot="header" style="padding:10px;">2个头部:tip,image</tip>
        <img slot="header" src="http://placeholder.qiniudn.com/640x300" style="width:100%;display:block;">
        <div slot="content" class="card-padding">
          <p style="color:#999;font-size:12px;">2016-07-31 07:42:45</p>
          <p style="font-size:14px;line-height:1.2;padding-top:10px;">
            C语言终于超越了Java，登顶榜首．Python超过C++成为第三名，C#被R顶出前五．最近几年R一路飙升，主要是由于乘上了大数据分析的浪潮．</p>
        </div>
      </card>
    </div>
    <!--bottom slot-->
    <tabbar icon-class="vux-center" slot="bottom">
      <tabbar-item :selected="true">
        <icon type="info" slot="icon"></icon>
        <span slot="label">主页</span>
      </tabbar-item>
      <tabbar-item badge="9">
        <icon type="waiting_circle" slot="icon"></icon>
        <span slot="label">演示</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <icon type="safe_success" slot="icon"></icon>
        <span slot="label">设置</span>
      </tabbar-item>
    </tabbar>
  </c-app>
</template>
<script>
  /** vux components*/
  import Tip from 'vuxs/tip'
  import Divider from 'vuxs/Divider'
  import Card from 'vuxs/card'
  import XButton from 'vuxs/x-button'
  import Tabbar from 'vuxs/tabbar'
  import TabbarItem from 'vuxs/tabbar-item'
  import Icon from 'vuxs/icon'
  import XHeader from 'vuxs/x-header'
  /** customer components*/
  import cApp from 'generals/c-app'
  import cIcon from 'generals/c-Icon'
  /** $api*/
  import * as $api from 'api'
  /** $app*/
  import * as $app from 'app'

  export default {
    components: {
      cApp,
      cIcon,
      Tip,
      Card,
      Divider,
      XButton,
      XHeader,
      Tabbar,
      TabbarItem,
      Icon
    },
    ready() {
      var vm = this
      $api.ready(() => {
        vm.loadData()
      })
      document.addEventListener('test', function(e) {
        $api.log('main:' + JSON.stringify(e.detail, null, 4))
      })
    },
    data() {
      return {
        msg: '我的钱包(简单头部)',
        settingUri: 'my_setting'
      }
    },
    computed: {
      settingUrl: function() {
        return $api.pages[this.settingUri]
      }
    },
    methods: {
      toast() {
        $api.toast({
          msg: '<i class="weui_icon weui_icon_info_circle"></i>网络不给力',
          time: 1000,
          type: 'text',
          width: '12.5rem',
          onHide: () => {
            $api.log('toast 关闭回调')
          }
        })
      },
      alert() {
        $api.alert({
          msg: '百度<br/>1234',
          title: 'Alert',
          buttonText: '好的,我知道了',
          alertCB: () => {
            $api.log('alert 关闭回调')
          }
        }, false)
      },
      confirm() {
        $api.confirm({
          title: '提示',
          msg: '百度<br/>1234',
          confirmText: '好的,我知道了',
          cancelText: '取消',
          onConfirmHide: () => {
            $api.log('confirm 关闭回调')
          },
          onConfirm: () => {
            $api.log('confirm 确认回调')
          },
          onCancel: () => {
            $api.log('confirm 取消回调')
          }
        }, false)
      },
      dialog() {
        $api.dialog({
          msg: '百度<br/>1234',
          scroll: false,
          hideOnBlur: true,
          onDialogHide: () => {
            $api.log('dialog 关闭回调')
          }
        })
      },
      // 设置
      settingAction() {
        // $api.fire(window, 'test')
        $api.openWindow(this.settingUri)
      },
      loadData() {
        var vm = this
        vm.$http.get('http://demo.dcloud.net.cn/test/xhr/json.php', {
          params: {
            id: 1
          },
          app: {
            abc: 2
          }
        }).then(function(response) {
          var data = JSON.parse(response.data)
          setTimeout(() => {
            vm.$set('msg', data.string)
          }, 3000)
        }, function(response) {
          // handle error
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