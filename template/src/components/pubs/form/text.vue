<template>
  <div :class="[bodyStyle]" @click="bodyClick">
    <label class="weui_label" v-if="icon||title" :style="{width: $parent.labelWidth || (labelWidth + 'em'), textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}">
      <c-icon :type="icon" v-if="icon" size="18px"></c-icon>
      <span v-text="title" v-if="title"></span>
    </label>
    <div class="weui_cell">
      <div class="weui_cell_bd weui_cell_primary">
        <textarea class="weui_textarea" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" :placeholder="placeholder" :readonly="readonly" :name="name" :rows="rows" :cols="cols" v-model="value" :style="textareaStyle" :maxlength="max"
          @focus="focus" @blur="blur" v-el:textarea></textarea>
        <hr class="text-field-line" />
        <hr class="focus" />
        <div class="weui_textarea_counter" v-show="showCounter && max" style="font-size:14px;">
          <span v-text="count"></span>/
          <span v-text="max"></span>
        </div>
        <div class="error">
          <div v-text="errors[0]||''"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  /** customer components*/
  import cIcon from 'pubs/c-Icon'
  export default {
    props: {
      showCounter: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      icon: {
        type: String
      },
      max: Number,
      value: {
        type: String,
        default: ''
      },
      name: String,
      placeholder: String,
      readonly: {
        type: Boolean,
        default: false
      },
      rows: {
        type: Number,
        default: 2
      },
      cols: {
        type: Number,
        default: 30
      },
      height: Number,
      errors: {
        type: Array,
        default: () => []
      }
    },
    components: {
      cIcon
    },
    watch: {
      value(newVal) {}
    },
    computed: {
      count() {
        let len = 0
        if (this.value) {
          len = this.value.replace(/\n/g, 'aa').length
        }
        return len > this.max ? this.max : len
      },
      textareaStyle() {
        if (this.height) {
          return {
            height: `${this.height}px`
          }
        }
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
        this.$els.textarea.focus()
      },
      focus() {
        this.isFocus = true
      },
      blur() {
        this.isFocus = false
      }
    },
    data() {
      let data = {
        // 是否焦点
        isFocus: false
      }
      return data
    }
  }
</script>

<style lang="less" scoped>
  @import '../form';
  .weui_cell {
    padding-bottom: 10px;
  }
  
  .weui_label {
    padding-top: 10px;
    padding-right: 15px;
    padding-bottom: 0;
    padding-left: 15px;
  }
  
  .error {
    text-align: left;
    margin-top: -15px;
    margin-left: 0;
  }
</style>