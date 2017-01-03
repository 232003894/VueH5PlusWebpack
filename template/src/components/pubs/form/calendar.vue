<template>
  <div :class="[bodyStyle]" @click="onClick">
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
  <popup :show.sync="show" @on-hide="onPopupHide" @on-show="onPopupShow">
    <inline-calendar :value.sync="value" @on-change="onSelect" :render-month="renderMonth" :start-date="startDate" , :end-date="endDate" :show-last-month="showLastMonth" :show-next-month="showNextMonth" :highlight-weekend="highlightWeekend" :return-six-rows="returnSixRows"
      :hide-header="hideHeader" :hide-week-list="hideWeekList" :replace-text-list="replaceTextList" :weeks-list="['日', '一', '二', '三', '四', '五', '六 ']" :custom-slot-fn="customSlotFn" :render-on-value-change="renderOnValueChange" :disable-past="disablePast"
      :disable-future="disableFuture"></inline-calendar>
  </popup>
</template>

<script>
  import InlineCalendar from 'vuxs/inline-calendar'
  import Popup from 'vuxs/popup'
  import Cell from 'vuxs/cell'
  import props from 'vux/src/components/inline-calendar/props'
  /** customer components*/
  import Icon from 'pubs/Icon'

  const Props = props()
  Props.title = {
    type: String,
    required: true
  }
  Props.icon = {
    type: String
  }
  Props.inlineDesc = {
    type: String
  }
  Props.errors = {
    type: Array,
    default: () => []
  }
  Props.placeholder = {
    type: String,
    default: '请选择'
  }

  export default {
    components: {
      InlineCalendar,
      Popup,
      Cell,
      Icon
    },
    props: Props,
    methods: {
      onClick() {
        this.show = true
      },
      onSelect() {
        this.show = false
      },
      onPopupShow(val) {
        var self = this
        api.addBack({
          name: 'calendar_picker',
          index: 5,
          handle: function() {
            if (self.show) {
              self.show = false
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
          name: 'calendar_picker',
          index: 5,
          handle: function() {
            if (self.show) {
              self.show = false
              return false
            }
            return true
          }
        })
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
      }
    },
    data() {
      return {
        show: false
      }
    }
  }
</script>

<style>

</style>
<style lang="less" scoped>
  @import '../form';
  .active .error {
    height: 0;
  }
</style>