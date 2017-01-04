<template>
  <div :class="[bodyStyle]">
    <div class="weui_cell vux-tap-active">
      <div class="weui_cell_hd">
        <label class="weui_label" v-if="icon||title" :style="{width: $parent.labelWidth || (labelWidth + 'em'), textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}">
          <icon :type="icon" v-if="icon" size="18px"></icon>
          <span v-text="title" v-if="title"></span>
        </label>
        <inline-desc v-if="inlineDesc">
          <span v-text="inlineDesc"></span>
        </inline-desc>
      </div>
      <div class="weui_cell_ft weui_cell_primary with_arrow">
        <span class="vux-popup-picker-value" v-text="errors[0] || value || placeholder"></span>
      </div>
    </div>
    <hr class="focus" />
  </div>
</template>

<script>
  import Picker from './datetimepicker'
  import Group from 'vuxs/group'
  import InlineDesc from 'vuxs/inline-desc'
  /** customer components*/
  import Icon from 'pubs/Icon'

  export default {
    components: {
      Group,
      InlineDesc,
      Icon
    },
    props: {
      format: {
        type: String,
        default: 'YYYY-MM-DD'
      },
      title: {
        type: String,
        required: true
      },
      icon: {
        type: String
      },
      value: {
        type: String,
        default: ''
      },
      inlineDesc: String,
      placeholder: {
        type: String,
        default: '请选择'
      },
      minYear: Number,
      maxYear: Number,
      confirmText: {
        type: String,
        default: '完成'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      clearText: {
        type: String,
        default: ''
      },
      yearRow: {
        type: String,
        default: '{value}年'
      },
      monthRow: {
        type: String,
        default: '{value}月'
      },
      dayRow: {
        type: String,
        default: '{value}日'
      },
      hourRow: {
        type: String,
        default: '{value}时'
      },
      minuteRow: {
        type: String,
        default: '{value}分'
      },
      errors: {
        type: Array,
        default: () => []
      }
    },
    created() {
      this.handleChangeEvent = true
      this.uuid = Math.random().toString(36).substring(3, 8)
    },
    ready() {
      const uuid = this.uuid
      this.$el.setAttribute('id', 'vux-datetime-' + uuid)
      this.render()
    },
    data() {
      return {
        show: false
      }
    },
    computed: {
      pickerOptions() {
        const _this = this
        const options = {
          trigger: '#vux-datetime-' + this.uuid,
          format: this.format,
          value: this.value,
          output: '.vux-datetime-value',
          confirmText: this.confirmText,
          cancelText: _this.cancelText,
          clearText: _this.clearText,
          yearRow: this.yearRow,
          monthRow: this.monthRow,
          dayRow: this.dayRow,
          hourRow: this.hourRow,
          minuteRow: this.minuteRow,
          onShow(value) {
            _this.show = true
            api.addBack({
              name: 'datetime_picker',
              index: 5,
              handle: function() {
                if (_this.show) {
                  _this.picker.hide()
                  return false
                }
                return true
              }
            })
          },
          onHide(value) {
            _this.show = false
            api.removeBack({
              name: 'datetime_picker',
              index: 5,
              handle: function() {
                if (_this.show) {
                  _this.picker.hide()
                  return false
                }
                return true
              }
            })
          },
          onConfirm(value) {
            _this.value = value
          },
          onClear(value) {
            _this.$emit('on-clear', value)
          }
        }
        if (this.minYear) {
          options.minYear = this.minYear
        }
        if (this.maxYear) {
          options.maxYear = this.maxYear
        }
        return options
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
    methods: {
      render() {
        if (this.picker) {
          this.picker.destroy()
        }
        this.picker = new Picker(this.pickerOptions)
      }
    },
    watch: {
      value(val) {
        this.$emit('on-change', val)
      }
    },
    beforeDestroy() {
      this.picker.destroy()
    }
  }
</script>

<style>
  .weui_cell_ft.with_arrow:after {
    content: " ";
    display: inline-block;
    transform: rotate(45deg);
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    position: relative;
    top: -1px;
    margin-left: .3em;
  }
  
  .scroller-component {
    display: block;
    position: relative;
    height: 238px;
    overflow: hidden;
    width: 100%;
  }
  
  .scroller-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: -1;
  }
  
  .scroller-mask {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    margin: 0 auto;
    width: 100%;
    z-index: 3;
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
    background-position: top, bottom;
    background-size: 100% 102px;
    background-repeat: no-repeat;
  }
  
  .scroller-item {
    text-align: center;
    font-size: 16px;
    height: 34px;
    line-height: 34px;
    color: #000;
  }
  
  .scroller-indicator {
    width: 100%;
    height: 34px;
    position: absolute;
    left: 0;
    top: 102px;
    z-index: 3;
    background-image: linear-gradient(to bottom, #d0d0d0, #d0d0d0, transparent, transparent), linear-gradient(to top, #d0d0d0, #d0d0d0, transparent, transparent);
    background-position: top, bottom;
    background-size: 100% 1px;
    background-repeat: no-repeat;
  }
  
  .dp-container {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 10000;
    background-color: #fff;
    display: none;
    transition: transform 0.3s ease;
    transform: translateY(100%);
  }
  
  .dp-mask {
    z-index: 998;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    opacity: 0;
    transition: opacity 0.1s ease;
    background-color: #000;
    z-index: 9999;
  }
  
  .dp-header {
    display: flex;
    width: 100%;
    box-align: center;
    align-items: center;
    background-image: linear-gradient(to bottom, #e7e7e7, #e7e7e7, transparent, transparent);
    background-position: bottom;
    background-size: 100% 1px;
    background-repeat: no-repeat;
  }
  
  .dp-header .dp-item {
    color: #04BE02;
    font-size: 18px;
    height: 44px;
    line-height: 44px;
    cursor: pointer;
  }
  
  .dp-content {
    display: flex;
    width: 100%;
    box-align: center;
    align-items: center;
    padding: 10px 0;
  }
  
  .dp-header .dp-item,
  .dp-content .dp-item {
    box-sizing: border-box;
    flex: 1;
    text-align: center;
  }
</style>

<style lang="less" scoped>
  @import '../form';
</style>