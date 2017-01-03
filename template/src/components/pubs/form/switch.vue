<template>
  <div class="weui_cell weui_cell_switch">
    <div class="weui_cell_hd weui_cell_primary">
      <label class="weui_label" v-if="icon||title" :style="{width: $parent.labelWidth || (labelWidth + 'em'), textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}">
        <icon :type="icon" v-if="icon" size="18px"></icon>
        <span v-text="title" v-if="title"></span>
      </label>
      <inline-desc v-if="inlineDesc">
        <span v-text="inlineDesc"></span>
      </inline-desc>
    </div>
    <div class="weui_cell_ft">
      <input class="weui_switch" type="checkbox" :disabled="disabled" v-model="value" />
    </div>
  </div>
</template>

<script>
  /** customer components*/
  import Icon from 'pubs/Icon'
  import InlineDesc from 'vuxs/inline-desc'

  export default {
    components: {
      InlineDesc,
      Icon
    },
    props: {
      title: {
        type: String,
        required: true
      },
      icon: {
        type: String
      },
      disabled: Boolean,
      value: {
        type: Boolean,
        default: false
      },
      inlineDesc: String
    },
    watch: {
      value(newVal) {
        this.$emit('on-change', newVal)
      }
    }
  }
</script>

<style lang="less">
  .weui_cell_switch .weui_cell_ft {
    font-size: 0;
  }
</style>
<style lang="less" scoped>
  @import '../form';
</style>