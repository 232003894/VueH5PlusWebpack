<template>
  <slot name='before'></slot>
  <i :class="[className]">
    <slot></slot>
  </i>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: ''
      }
    },
    computed: {
      className() {
        if (this.type !== '') {
          return `iconfont icon-${this.type}`
        } else if (this.type === '' && this.code !== '') {
          return 'iconfont'
        }
      }
    }
  }
</script>