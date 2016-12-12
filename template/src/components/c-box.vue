<template>
  <msg></msg>
  <div class="weui_tab">
    <div class="vux-header-fixed" v-el:header>
      <slot name="header"></slot>
    </div>
    <div class="weui_tab_bd vux-fix-safari-overflow-scrolling" :style="{'padding-top':paddingTop+'px','padding-bottom':paddingBottom+'px'}" v-show="!isError" v-el:body>
      <slot></slot>
    </div>
    <div class="weui_tab_bd vux-fix-safari-overflow-scrolling" :style="{'padding-top':paddingTop+'px','padding-bottom':paddingBottom+'px'}" v-show="isError" v-el:error>
      网络错误了,刷新
    </div>
    <div class="vux-bottom-fixed" v-el:bottom>
      <slot name="bottom"></slot>
    </div>
  </div>
</template>
<script>
  import * as init from '../libs/api/init'
  /** vux components*/
  import Msg from './c-msg'
  export default {
    components: {
      Msg
    },
    props: {
      'paddingTop': {
        type: Number,
        default: 0
      },
      'paddingBottom': {
        type: Number,
        default: 0
      }
    },
    ready() {
      var self = this
      init.boxOpts = self.$data
    },
    data: function() {
      return {
        isError: false
      }
    }
  }
</script>
<style>
  .vux-header-fixed {
    z-index: 100;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
  }
  
  .vux-bottom-fixed {
    z-index: 100;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
  }
</style>