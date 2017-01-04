<template>
  <div :class="[bodyStyle]" @click="bodyClick" v-el:body>
    <div class="weui_cell">
      <div class="weui_cell_hd">
        <label class="weui_label" v-if="icon||title" :style="{width: $parent.labelWidth || (labelWidth + 'em'), textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}">
          <icon :type="icon" v-if="icon" size="18px"></icon>
          <span v-text="title" v-if="title"></span>
        </label>
        <inline-desc v-if="inlineDesc">
          <span v-text="inlineDesc"></span>
        </inline-desc>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <input class="weui_input" :maxlength="max" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" :style="inputStyle" :type="type" :name="name" :placeholder="placeholder" :readonly="readonly" @focus="focus" @blur="blur" v-model="value"
          v-el:input />
      </div>
      <div class="weui_cell_ft">
        <icon type="close" v-show="showClear && value && !readonly" @click="clear" size="16px"></icon>
        <icon type="eyeon" v-show="showPassword && !readonly" @click="pwd" :color="pwdIconColor" size="16px"></icon>
        <slot name="right"></slot>
      </div>
      <hr class="text-field-line" />
      <hr class="focus" />
    </div>
    <div class="error">
      <div v-text="errors[0]||''"></div>
    </div>
  </div>
</template>

<script>
  /** vux components*/
  import InlineDesc from 'vuxs/inline-desc'
  /** customer components*/
  import Icon from 'pubs/Icon'

  export default {
    ready() {
      if (!this.title && !this.placeholder && !this.value) {
        console.warn('no title and no placeholder?')
      }
      if (this.type === 'password') {
        this.showClear = false
        this.showPassword = true
      } else {
        this.showPassword = false
      }
    },
    components: {
      InlineDesc,
      Icon
    },
    props: {
      type: {
        type: String,
        default: 'text'
      },
      title: {
        type: String,
        default: ''
      },
      inlineDesc: String,
      icon: {
        type: String
      },
      showClear: {
        type: Boolean,
        default: true
      },
      showPassword: {
        type: Boolean,
        default: false
      },
      placeholder: String,
      value: [String, Number],
      name: String,
      max: Number,
      readonly: {
        type: Boolean,
        default: false
      },
      textAlign: String,
      errors: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      labelWidth() {
        return this.title.replace(/[^x00-xff]/g, '00').length / 2 + 1
      },
      inputStyle() {
        if (this.textAlign) {
          return {
            textAlign: this.textAlign
          }
        }
      },
      pwdIconColor() {
        return this.type === 'password' ? '' : 'blue'
      },
      bodyStyle() {
        if (this.isFocus) {
          return 'active'
        } else {
          if (this.errors.length > 0) {
            return 'warn'
          } else {
            return ''
          }
        }
      }
    },
    methods: {
      bodyClick() {
        this.$els.input.focus()
      },
      clear() {
        this.value = ''
        this.$els.input.focus()
      },
      focus() {
        this.isFocus = true
      },
      blur() {
        this.isFocus = false
      },
      pwd() {
        if (this.type === 'password') {
          this.type = 'text'
        } else {
          this.type = 'password'
        }
        this.$els.input.focus()
      }
    },
    data() {
      let data = {
        // 是否焦点
        isFocus: false
      }
      return data
    },
    watch: {
      value(newVal) {}
    }
  }
</script>

<style lang="less" scoped>
  @import './form';
  .text-field-line {
    bottom: 0;
  }
  
  .focus {
    bottom: 0;
  }
</style>