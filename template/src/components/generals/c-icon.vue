<template>
  <i :class="[className]" :style="{ color: color, fontSize: size  }">
    <slot></slot>
  </i>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: ''
      },
      color: {
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