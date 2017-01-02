<template>
  <div :class="[bodyStyle]" @click="bodyClick">
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
  <div class="weui_cells_radio">
    <label class="weui_cell weui_cell_radio weui_check_label" :for="'radio_'+uuid+'_'+index" v-for="(index,one) in options">
      <div class="weui_cell_bd weui_cell_primary">
        <p v-text="one | getValue filtersName.value"></p>
      </div>
      <div class="weui_cell_ft">
        <input type="radio" class="weui_check" v-model="value" :id="'radio_'+uuid+'_'+index" :value="one | getKey filtersName.key">
        <span class="weui_icon_checked"></span>
      </div>
    </label>
    <div class="weui_cell" v-show="fillMode">
      <div class="weui_cell_hd">
        <label for="" class="weui_label" v-text="fillLabel"></label>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <input class="weui_input needsclick" type="text" v-model="fillValue" :placeholder="fillPlaceholder" @blur="isFocus=false" @focus="onFocus()" v-el:input>
      </div>
    </div>
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

  /** customer components*/
  import cIcon from 'pubs/c-Icon'

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
      value: String,
      placeholder: String,
      fillMode: {
        type: Boolean,
        default: false
      },
      fillPlaceholder: {
        type: String,
        default: '其他'
      },
      filtersName: {
        type: Object,
        default: () => {
          return {
            key: 'key',
            value: 'value'
          }
        }
      },
      fillLabel: {
        type: String,
        default: '其他'
      },
      errors: {
        type: Array,
        default: () => []
      }
    },
    ready() {
      this.handleChangeEvent = true
    },
    methods: {
      bodyClick() {
        if (this.fillMode) {
          this.$els.input.focus()
        }
      },
      onFocus() {
        this.value = this.fillValue || ''
        this.isFocus = true
      }
    },
    watch: {
      value(newVal) {
        var isOption = contains(this, newVal)
        if (newVal !== '' && isOption) {
          this.fillValue = ''
        }
        this.$emit('on-change', newVal)
      },
      fillValue(newVal) {
        if (this.fillMode && this.isFocus) {
          this.value = newVal
        }
      }
    },
    computed: {
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
    data() {
      return {
        fillValue: '',
        isFocus: false
      }
    }
  }

  function contains(vm, obj) {
    var a = vm.options.map(function(item) {
      return getValue(item, vm.filtersName.key)
    })
    var i = a.length
    while (i--) {
      if (a[i] === obj) {
        return true
      }
    }
    return false
  }
</script>

<style lang="less">
  .weui_cell_radio>* {
    pointer-events: none;
  }
</style>
<style lang="less" scoped>
  @import '../form';
  .weui_cells_radio {
    margin-top: -5px;
  }
  
  .weui_cells_radio .weui_cell {
    margin-left: 23px;
  }
  /*.vux-popup-picker-value {
    margin-right: 18px;
  }*/
</style>