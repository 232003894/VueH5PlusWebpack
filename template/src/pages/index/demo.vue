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
    <card :header="{title:'商品详情(简单头部)'}" :footer="{title:'设置(简单底部带链接)'}" @on-click-footer="settingAction">
      <p slot="content" class="card-padding">
        这里是内容
        <br/>
        <x-button :mini="true" type="warn" v-touch:tap="toast">提示</x-button>
        <x-button :mini="true" type="warn" v-touch:tap="alert">警告框</x-button>
        <x-button :mini="true" type="warn" v-touch:tap="confirm">确认框</x-button>
        <x-button :mini="true" type="warn" v-touch:tap="dialog">弹出消息</x-button>
        <x-button :mini="true" type="warn" v-touch:tap="error">网络错误</x-button>
        <x-button v-touch:tap="settingAction" type="primary" text="新&nbsp;窗&nbsp;口&nbsp;设&nbsp;置"></x-button>
      </p>
    </card>
    <divider>简单头部</divider>
    <card :header="{title:'图标'}">
      <p slot="content" class="card-padding">
        <c-icon type="close">
          <span slot="before">前</span>后
        </c-icon>
        <br/>
        <c-icon>&#xe613;</c-icon>
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
</template>
<script>
  /** vux components*/
  import Tip from 'vux-components/tip'
  import Divider from 'vux-components/Divider'
  import Card from 'vux-components/card'
  import XButton from 'vux-components/x-button'
  /** customer components*/
  import cIcon from 'components/c-Icon'
  /** $api*/
  import * as $api from 'api'
  /** $app*/
  import * as $app from 'app'

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
      $api.ready(() => {
        if (vm.route.path === '/demo') {
          vm.loadData()
        }
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
      error() {
        $api.webError(true)
      },
      // 设置
      settingAction() {
        // $api.fire(window, 'test')
        $api.openWindow(this.settingUri)
      },
      loadData() {
        console.log('ajax')
        var vm = this
        vm.$http.get('http://demo.dcloud.net.cn/test/xhr/json.php', {
          params: {
            id: 1
          },
          app: {
            get: false
          }
        }).then(function(response) {
          var data = JSON.parse(response.data)
          setTimeout(() => {
            vm.$set('msg', data.string)
          }, 200)
        }, function(response) {
          // handle error
        })
      }
    }
  }
</script>

<style scoped lang="less">
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