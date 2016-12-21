<template>
  <div class="weui_tab">
    <div class="vux-header-fixed" v-show="top!=0" v-el:header>
      <slot name="header"></slot>
    </div>
    <div class="weui_tab_bd vux-fix-safari-overflow-scrolling" :style="{'padding-top':top,'padding-bottom':bottom}" v-show="!isError" v-el:body>
      <slot></slot>
    </div>
    <div class="weui_tab_bd vux-fix-safari-overflow-scrolling" :style="{'padding-top':top,'padding-bottom':bottom}" v-show="isError" v-el:error>
      <div class="ui-error" :style="{'padding-top':errorPaddingTop}">
        <c-icon type="wifi"></c-icon>
        <h4>网络不给力</h4>
        <div class="ui-button">
          <x-button @click="refresh">重新加载</x-button>
        </div>
      </div>
    </div>
    <div class="vux-bottom-fixed" v-show="bottom!=0" v-el:bottom>
      <slot name="bottom"></slot>
    </div>
  </div>
</template>
<script>
  import * as init from '../../libs/api/init'
  import * as re from '../../libs/api/ready'
  /** vux components*/
  import XButton from 'vuxs/x-button'
  /** customer components*/
  import CIcon from './c-Icon'
  export default {
    components: {
      CIcon,
      XButton
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
    computed: {
      errorPaddingTop: function() {
        var errorHeight = 152
        var _t = (document.body.offsetHeight - this.paddingTop - this.paddingBottom - errorHeight) * 0.45 + 'px'
        return _t
      },
      top: function() {
        var _top = this.paddingTop + 'px'
        if (_top === '0px' || this.$els.header.innerHTML.trim() === '') {
          _top = 0
        }
        return _top
      },
      bottom: function() {
        var _bottom = this.paddingBottom + 'px'
        if (_bottom === '0px' || this.$els.bottom.innerHTML.trim() === '') {
          _bottom = 0
        }
        return _bottom
      }
    },
    data: function() {
      return {
        isError: false
      }
    },
    methods: {
      refresh() {
        re.refresh()
      }
    }
  }
</script>
<style scoped>
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
  
  .ui-error {
    text-align: center;
    padding-top: 35%;
  }
  
  .ui-error h4 {
    color: #333333;
    font-weight: normal;
    font-size: 16px;
  }
  
  .ui-error .iconfont {
    font-size: 50px;
    color: #949494;
  }
  
  .ui-error .ui-button {
    width: 90px;
    padding-top: 15px;
    margin: 0 auto;
  }
  
  .ui-error .ui-button .weui_btn {
    font-size: 14px;
  }
</style>