<template>
  <div :class="[bodyStyle]" @click="onClick" v-show="showCell">
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
        <span class="vux-popup-picker-value" v-text="text"></span>
      </div>
    </div>
    <hr class="focus" />
  </div>
  <popup :show.sync="show" class="vux-popup-picker" :id="'vux-popup-picker-'+uuid" @on-hide="onPopupHide" @on-show="onPopupShow">
    <div class="vux-popup-picker-container">
      <div class="vux-popup-picker-header">
        <flexbox>
          <flexbox-item style="text-align:left;padding-left:15px;line-height:44px;" @click="onHide(false)">取消</flexbox-item>
          <flexbox-item style="text-align:right;padding-right:15px;line-height:44px;" @click="onHide(true)">完成</flexbox-item>
        </flexbox>
      </div>
      <picker :data="data" :value.sync="tempValue" @on-change="onPickerChange" :columns="columns" :fixed-columns="fixedColumns" :container="'#vux-popup-picker-'+uuid"></picker>
    </div>
  </popup>
</template>

<script>
  import InlineDesc from 'vuxs/inline-desc'
  import Picker from 'vuxs/picker'
  import Cell from 'vuxs/cell'
  import Popup from 'vuxs/popup'
  import Flexbox from 'vuxs/flexbox'
  import FlexboxItem from 'vuxs/flexbox-item'
  import array2string from 'vux/src/filters/array2String'
  import value2name from 'vux/src/filters/value2name'
  import uuidMixin from 'vux/src/libs/mixin_uuid'
  /** customer components*/
  import Icon from 'pubs/Icon'

  const getObject = function(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  export default {
    mixins: [uuidMixin],
    components: {
      InlineDesc,
      Picker,
      Cell,
      Popup,
      Flexbox,
      FlexboxItem,
      Icon
    },
    filters: {
      array2string,
      value2name
    },
    props: {
      title: String,
      icon: {
        type: String
      },
      data: {
        type: Array,
        default: () => []
      },
      placeholder: String,
      columns: {
        type: Number,
        default: 0
      },
      fixedColumns: {
        type: Number,
        default: 0
      },
      value: {
        type: Array,
        default: () => []
      },
      showName: Boolean,
      inlineDesc: String,
      showCell: {
        type: Boolean,
        default: true
      },
      show: Boolean,
      errors: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      getNameValues() {
        return value2name(this.value, this.data)
      },
      onClick() {
        this.show = true
      },
      onHide(type) {
        this.show = false
        if (type) {
          this.closeType = true
          this.value = getObject(this.tempValue)
        }
        if (!type) {
          this.closeType = false
          if (this.value.length > 0) {
            this.tempValue = getObject(this.value)
          }
        }
      },
      onPopupShow(val) {
        var self = this
        api.addBack({
          name: 'popup_picker',
          index: 5,
          handle: function() {
            if (self.show) {
              self.onHide(false)
              return false
            }
            return true
          }
        })
        this.$emit('on-show')
      },
      onPopupHide(val) {
        var self = this
        api.removeBack({
          name: 'popup_picker',
          index: 5,
          handle: function() {
            if (self.show) {
              self.onHide(false)
              return false
            }
            return true
          }
        })
        if (this.value.length > 0) {
          this.tempValue = getObject(this.value)
        }
        this.$emit('on-hide', this.closeType)
      },
      onPickerChange(val) {
        if (JSON.stringify(this.value) !== JSON.stringify(val)) {
          // if has value, replace it
          if (this.value.length) {
            const nowData = JSON.stringify(this.data)
            if (nowData !== this.currentData && this.currentData !== '[]') {
              this.value = getObject(val)
            }
            this.currentData = nowData
          } else { // if no value, stay quiet
            // if set to auto update, do update the value
          }
        }
        this.$emit('on-shadow-change', getObject(val))
      }
    },
    watch: {
      value(val) {
        if (JSON.stringify(val) !== JSON.stringify(this.tempValue)) {
          this.tempValue = getObject(val)
        }
      }
    },
    computed: {
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
      },
      text() {
        if (this.showName) {
          return this.errors[0] || value2name(this.value, this.data) || this.placeholder
        } else {
          return this.errors[0] || array2string(this.value) || this.placeholder
        }
      }
    },
    data() {
      return {
        tempValue: getObject(this.value),
        closeType: false,
        currentData: JSON.stringify(this.data) // used for detecting if it is after data change
      }
    }
  }
</script>

<style>
  .vux-popup-picker {
    border-top: 1px solid #04BE02;
  }
  
  .vux-popup-picker-header {
    height: 44px;
    color: #04BE02;
  }
  
  .vux-popup-picker-value {
    display: inline-block;
  }
</style>

<style lang="less" scoped>
  @import '../form';
</style>