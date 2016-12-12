<template>
  <div class="loading-overlay" v-show="show">
    <div class="weui_toast" :style="{position: position}">
      <div class="weui_loading">
        <div class="weui_loading_leaf" v-for="i in 12" :class="['weui_loading_leaf_' + i]"></div>
      </div>
      <p class="weui_toast_content">{{text}}
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      show: Boolean,
      text: {
        type: String,
        default: 'Loading'
      },
      position: String
    }
  }
</script>

<style lang="less">
  .loading-overlay {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    opacity: 1;
    background: rgba(0, 0, 0, 0);
    transition: all .3s;
  }
  
  // loading toast
  .loading-overlay {
    .weui_toast_content {
      margin-top: 64%;
      font-size: 14px;
    }
    .weui_toast {
      top: 40%;
    }
  }
</style>