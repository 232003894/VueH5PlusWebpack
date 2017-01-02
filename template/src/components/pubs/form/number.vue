<template>
  <div :class="[bodyStyle]" @click="onClick" v-el:body>
    <div class="weui_cell">
      <div class="weui_cell_bd weui_cell_primary">
        <label class="weui_label" v-if="icon||title" :style="{width: $parent.labelWidth || (labelWidth + 'em'), textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}">
          <c-icon :type="icon" v-if="icon" size="18px"></c-icon>
          <span v-text="title" v-if="title"></span>
        </label>
      </div>
      <div class="weui_cell_ft" v-show="!readonly" style="font-size:0;margin-top:-4px;margin-right:-5px;">
        <a @click="sub" class="vux-number-selector vux-number-selector-sub" :class="{'vux-number-disabled':disabledMin}">-</a>
        <input v-model="value" type="number" :name="name" class="vux-number-input" :style="{width: width+'px'}" number :readonly="!fillable" pattern="[0-9]*" @focus="focus" @blur="blur" v-el:input />
        <a @click="add" class="vux-number-selector vux-number-selector-plus" :class="{'vux-number-disabled':disabledMax}">+</a>
      </div>
      <div class="weui_cell_ft" v-else v-text="value"></div>
    </div>
    <hr class="focus" />
    <div class="error">
      <div v-text="errors[0]||''"></div>
    </div>
  </div>
</template>
<script>
  /** customer components*/
  import cIcon from 'pubs/c-Icon'
  export default {
    components: {
      cIcon
    },
    props: {
      min: Number,
      max: Number,
      step: {
        type: Number,
        default: 1
      },
      value: {
        type: Number,
        default: 0
      },
      readonly: Boolean,
      name: String,
      title: String,
      icon: {
        type: String
      },
      fillable: {
        type: Boolean,
        default: true
      },
      width: {
        type: Number,
        default: 50
      },
      errors: {
        type: Array,
        default: function() {
          return ['']
        }
      }
    },
    computed: {
      disabledMin() {
        return typeof this.min === 'undefined' ? false : this.value <= this.min
      },
      disabledMax() {
        return typeof this.max === 'undefined' ? false : this.value >= this.max
      },
      bodyStyle() {
        if (this.show) {
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
    ready() {},
    watch: {
      value(newValue, old) {
        if (this.min && this.value < this.min) {
          this.value = this.min
        }
        if (this.max && this.value > this.max) {
          this.value = this.max
        }
        this.$emit('on-change', this.value)
      }
    },
    methods: {
      onClick() {
        if (this.fillable) {
          this.$els.input.focus()
        }
      },
      focus() {
        this.show = true
      },
      blur() {
        this.show = false
      },
      add() {
        if (!this.disabledMax) {
          this.value += (this.step - 0)
        }
      },
      sub() {
        if (!this.disabledMin) {
          this.value -= (this.step - 0)
        }
      }
    },
    data() {
      return {
        show: false
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../form';
</style>