<template>
  <div class="vux-header ">
    <div class="vux-header-left">
      <a class="vux-header-back" @click.preventDefault v-show="leftOptions.showBack!==false" :transition="transition" @click="onClickBack" v-text="leftOptions.backText"></a>
      <div class="left-arrow" @click="onClickBack" v-show="leftOptions.showBack!==false" :transition="transition"></div>
      <slot name="left"></slot>
    </div>
    <h1 class="vux-header-title" @click="$emit('on-click-title')">
      <span v-show="title" :transition="transition" v-text="title"></span>
      <slot></slot>
    </h1>
    <div class="vux-header-right">
      <a class="vux-header-more" @click.preventDefault @click="$emit('on-click-more')" v-if="rightOptions.showMore"></a>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      leftOptions: {
        type: Object,
        default () {
          return {
            showBack: true,
            backText: 'Back'
          }
        }
      },
      title: String,
      transition: String,
      rightOptions: {
        type: Object,
        default () {
          return {
            showMore: false
          }
        }
      }
    },
    methods: {
      onClickBack() {
        api.back()
      }
    }
  }
</script>

<style scoped>
  .vux-header .vux-header-title,
  .vux-header h1 {
    /*为了居中 默认是100px 感觉不是居中的*/
    margin-left: 88px !important;
  }
</style>