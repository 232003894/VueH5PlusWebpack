<template>
  <div class="weui_cell weui_cell_switch">
    <div class="weui_cell_hd weui_cell_primary">
      <label class="weui_label" v-if="icon||title" :style="{width: $parent.labelWidth || (labelWidth + 'em'), textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}">
        <c-icon :type="icon" v-if="icon" size="18px"></c-icon>
        <span v-text="title" v-if="title"></span>
      </label>
      <inline-desc v-if="inlineDesc">
        <span v-text="inlineDesc"></span>
      </inline-desc>
    </div>
    <div class="weui_cell_ft">
      <rater :value.sync="value" :max="max" :star="star" :margin="margin" :active-color="activeColor" :font-size="fontSize" :disabled="disabled"></rater>
    </div>
  </div>
</template>

<script>
  /** customer components*/
  import cIcon from 'pubs/c-Icon'
  import InlineDesc from 'vuxs/inline-desc'
  import Rater from 'vuxs/rater'

  export default {
    components: {
      InlineDesc,
      cIcon,
      Rater
    },
    computed: {
      sliceValue() {
        const _val = this.value.toString().split('.')
        return _val.length === 1 ? [_val[0], 0] : _val
      },
      cutIndex() {
        return this.sliceValue[0] * 1
      },
      cutPercent() {
        return this.sliceValue[1] * 10
      }
    },
    props: {
      title: {
        type: String,
        required: true
      },
      icon: {
        type: String
      },
      inlineDesc: String,
      max: {
        type: Number,
        default: 5
      },
      value: {
        type: Number,
        default: 0
      },
      disabled: Boolean,
      star: {
        type: String,
        default: '★'
      },
      activeColor: {
        type: String,
        default: '#fc6'
      },
      margin: {
        type: Number,
        default: 2
      },
      fontSize: {
        type: Number,
        default: 25
      }
    },
    methods: {
      handleClick(i, force) {
        if (!this.disabled || force) {
          if (this.value === i + 1) {
            this.value = i
            this.updateStyle()
          } else {
            this.value = i + 1
          }
        }
      },
      updateStyle() {
        for (var j = 0; j < this.max; j++) {
          if (j <= this.value - 1) {
            this.colors.$set(j, this.activeColor)
          } else {
            this.colors.$set(j, '#ccc')
          }
        }
      }
    },
    data() {
      return {
        colors: [],
        cutIndex: -1,
        cutPercent: 0
      }
    },
    watch: {
      value(val) {
        this.updateStyle()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../form';
</style>