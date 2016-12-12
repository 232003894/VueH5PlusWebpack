<template>
  <div>
    <c-box :padding-top="46" :padding-bottom="55" v-ref:box>
      <!--header slot-->
      <c-header slot="header" :transition="headerTransition" :left-options="{showBack:showBack}">{{title}}</c-header>
      <!--default slot-->
      <router-view :transition="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"></router-view>
      <!--bottom slot-->
      <tabbar icon-class="vux-center iconSize" slot="bottom">
        <c-tabbar-item v-link="{path:'/'}" :selected="route.path === '/'">
          <c-icon type="homeon" slot="iconon"></c-icon>
          <c-icon type="home" slot="icon"></c-icon>
          <span slot="label">主页</span>
        </c-tabbar-item>
        <c-tabbar-item badge="9" v-link="{path:'/demo'}" :selected="route.path === '/demo'">
          <c-icon type="demoon" slot="iconon"></c-icon>
          <c-icon type="demo" slot="icon"></c-icon>
          <span slot="label">演示</span>
        </c-tabbar-item>
        <c-tabbar-item show-dot v-link="{path:'/setting'}" :selected="route.path === '/setting'">
          <c-icon type="settingon" slot="iconon"></c-icon>
          <c-icon type="setting" slot="icon"></c-icon>
          <span slot="label">设置</span>
        </c-tabbar-item>
      </tabbar>
    </c-box>
  </div>
</template>
<script>
  /** vux components*/
  import Tabbar from 'vux-components/tabbar'
  import TabbarItem from 'vux-components/tabbar-item'
  import Icon from 'vux-components/icon'
  /** customer components*/
  import cBox from 'components/c-box'
  import CHeader from 'components/c-header'
  import cIcon from 'components/c-Icon'
  import cTabbarItem from 'components/c-tabbar-item'
  /** $api*/
  import * as $api from 'api'
  /** $app*/
  import * as $app from 'app'
  import store from './store'

  export default {
    components: {
      cBox,
      cIcon,
      CHeader,
      Tabbar,
      cTabbarItem,
      Icon
    },
    store: store,
    vuex: {
      getters: {
        route: (state) => state.route,
        isLoading: (state) => state.isLoading,
        direction: (state) => state.direction,
        showBack: (state) => state.showBack,
        title: (state) => state.title
      }
    },
    ready() {
      var vm = this
      document.addEventListener('test', function(e) {
        if (vm.route.path === '/setting') {
          $api.log('main-setting:' + JSON.stringify(e.detail, null, 4))
        } else if (vm.route.path === '/demo') {
          $api.log('main-demo:' + JSON.stringify(e.detail, null, 4))
        }
      })
    },
    data() {
      return {}
    },
    computed: {
      headerTransition() {
        return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
      }
    },
    methods: {}
  }

  $api.init({
    beforeback() {
      $api.log('main-后退前的业务处理')
      return true
    }
  })
</script>

<style lang="less">
  body {
    overflow-x: hidden;
  }
  
  .iconSize {
    .iconfont {
      font-size: 28px;
    }
  }
  /* vue-router transition 开始 */
  
  .vux-pop-out-transition,
  .vux-pop-in-transition {
    width: 100%;
    animation-duration: 0.5s;
    animation-fill-mode: both;
    backface-visibility: hidden;
  }
  
  .vux-pop-out-enter,
  .vux-pop-out-leave,
  .vux-pop-in-enter,
  .vux-pop-in-leave {
    will-change: transform;
    height: 100%;
    position: absolute;
    left: 0;
  }
  
  .vux-pop-out-enter {
    animation-name: popInLeft;
  }
  
  .vux-pop-out-leave {
    animation-name: popOutRight;
  }
  
  .vux-pop-in-enter {
    perspective: 1000;
    animation-name: popInRight;
  }
  
  .vux-pop-in-leave {
    animation-name: popOutLeft;
  }
  
  @keyframes popInLeft {
    from {
      transform: translate3d(-100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  
  @keyframes popOutLeft {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(-100%, 0, 0);
    }
  }
  
  @keyframes popInRight {
    from {
      transform: translate3d(100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  
  @keyframes popOutRight {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(100%, 0, 0);
    }
  }
  /* vue-router transition 结束 */
</style>