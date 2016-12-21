<template>
  <div class="weui_tab">
    <msg></msg>
    <c-box :padding-top="paddingTop" :padding-bottom="paddingBottom" v-ref:box>
      <slot name="header" slot="header"></slot>
      <slot></slot>
      <slot name="bottom" slot="bottom"></slot>
    </c-box>
  </div>
</template>
<script>
  /** vux components*/
  /** customer components*/
  import Msg from './c-msg'
  import cBox from './c-box'
  export default {
    components: {
      Msg,
      cBox
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
    ready() {},
    computed: {
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
    methods: {}
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
</style>