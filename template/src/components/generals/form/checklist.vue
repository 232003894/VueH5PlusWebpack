<template>
  <div :class="[bodyStyle]">
    <div class="weui_cell">
      <div class="weui_cell_hd">
        <label class="weui_label" v-if="icon||title" :style="{width: $parent.labelWidth || (labelWidth + 'em'), textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}">
          <c-icon :type="icon" v-if="icon" size="18px"></c-icon>
          <span v-text="title" v-if="title"></span>
        </label>
        <hr class="focus" />
      </div>
      <div class="weui_cell_ft weui_cell_primary">
        <div class="vux-popup-picker-value">
          <div v-text="errors[0]||placeholder"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="weui_cells weui_cells_checkbox">
    <label class="weui_cell weui_check_label" :for="'checkbox_'+uuid+'_'+index" v-for="(index, one) in options">
      <div class="weui_cell_hd">
        <input type="checkbox" class="weui_check" :value="one | getKey filtersName.key" v-model="value" :id="'checkbox_'+uuid+'_'+index">
        <i class="weui_icon_checked"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p v-html="one | getValue filtersName.value"></p>
      </div>
    </label>
  </div>

  </div>
</template>

<script>
  let getValue = function(item, name) {
    return typeof item === 'object' ? item[name] : item
  }

  let getKey = function(item, name) {
    return typeof item === 'object' ? item[name] : item
  }

  import shuffle from 'array-shuffle'

  /** customer components*/
  import cIcon from 'generals/c-Icon'

  export default {
    created() {
      this.uuid = Math.random().toString(36).substring(3, 8)
    },
    components: {
      cIcon
    },
    filters: {
      getValue,
      getKey
    },
    props: {
      title: String,
      icon: {
        type: String
      },
      options: {
        type: Array,
        required: true
      },
      value: {
        type: Array,
        default: () => []
      },
      placeholder: String,
      filtersName: {
        type: Object,
        default: () => {
          return {
            key: 'key',
            value: 'value'
          }
        }
      },
      randomOrder: Boolean,
      errors: {
        type: Array,
        default: () => []
      }
    },
    ready() {
      this.handleChangeEvent = true
      if (this.randomOrder) {
        this.options = shuffle(this.options)
      }
    },
    computed: {
      bodyStyle() {
        if (this.errors.length > 0) {
          return 'warn'
        } else {
          return ''
        }
      }
    },
    watch: {
      value(newVal) {
        this.$emit('on-change', JSON.parse(JSON.stringify(newVal)))
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../form';
  .weui_cells {
    margin-top: -5px;
    background-color: transparent;
  }
  
  .weui_cells:before {
    border-top: none;
  }
  
  .weui_cells:after {
    border-bottom: none;
  }
  /*.vux-popup-picker-value {
    margin-right: 18px;
  }*/
</style>