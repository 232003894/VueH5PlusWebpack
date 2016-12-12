<template>
  <a href="javascript:;" class="weui_tabbar_item" :class="{'weui_bar_item_on': $parent.index === index}" @click="onItemClick">
    <div class="weui_tabbar_icon" :class="[iconClass || $parent.iconClass, {'vux-reddot': showDot}]">
      <slot name="iconon" v-if="selected"></slot>
      <slot name="icon" v-else></slot>
      <sup><badge v-if="badge" :text="badge"></badge></sup>
    </div>
    <p class="weui_tabbar_label">
      <slot name="label"></slot>
    </p>
  </a>
</template>

<script>
  import {
    childMixin
  } from 'vux/src/mixins/multi-items'
  import {
    go
  } from 'vux/src/libs/router'
  /** vux components*/
  import Badge from 'vux-components/badge'

  export default {
    components: {
      Badge
    },
    mixins: [childMixin],
    props: {
      showDot: {
        type: Boolean,
        default: false
      },
      badge: String,
      link: [String, Object],
      iconClass: String
    },
    events: {
      'on-item-click': function() {
        go(this.link, this.$router)
      }
    }
  }
</script>
<style lang="less">
  .weui_tabbar_item {
    .weui_tabbar_icon {
      color: black;
    }
    .weui_tabbar_label {
      span {
        color: black;
      }
    }
  }
  
  .weui_tabbar_item.weui_bar_item_on {
    .weui_tabbar_icon {
      color: #ef4f4f;
    }
    .weui_tabbar_label {
      span {
        font-weight: bolder;
        color: #ef4f4f;
      }
    }
  }
</style>