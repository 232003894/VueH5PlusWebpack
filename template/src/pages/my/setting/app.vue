<template>
  <c-box :padding-top="46">
    <!--header slot-->
    <c-header slot="header" :left-options="{showBack:true}">表单</c-header>
    <!--default slot-->
    <c-group style="background-color: transparent" label-width="5.5em" label-align="left" label-margin-right="5px">
      <field title="账户" name="username" placeholder="请输入用户名或手机号" icon="wode" :value.sync="username" :errors="getError('username')"></field>
      <field title="密码" name="password" type="password" placeholder="请输入密码" icon="gengduo" :value.sync="password" :errors="getError('password')"></field>
      <text title="详情" :max="200" name="description" placeholder="描述" icon="fankui" :value.sync="info" :errors="getError('info')"></text>
      <popup-picker title="弹出选择" icon="fankui" :show-name="true" :columns="3" :data="list1" :value.sync="mobiletype" placeholder="请选择" :errors="getError('mobiletype')"></popup-picker>
      <calendar title="日历选择" icon="fankui" :value.sync="indate" :errors="getError('indate')" :show-last-month="false" :show-next-month="false" :highlight-weekend="true" :return-six-rows="false" placeholder="请选择"></calendar>
      <datetime title="时间选择" icon="fankui" format="YYYY-MM-DD HH:mm" :value.sync="birthday" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消" placeholder="请选择" :errors="getError('birthday')"></datetime>
      <num title="数值输入" icon="fankui" :min="2" :max="8" :value.sync="number" :readonly="false" :errors="getError('number')"></num>
      <checklist title="多选" icon="wode" :options="objectList" placeholder="请选择" :filters-name="{key:'id',value:'name'}" :value.sync="checklist" :errors="getError('checklist')"></checklist>
      <radio title="单选" icon="wode" placeholder="请选择" :value.sync="radio" :fill-mode="false" fill-label="其他" fill-placeholder="填写其他的哦" :options="radiolist" :errors="getError('radio')"></radio>
      <switch icon="wode" title="开关" :value.sync="checked"></switch>
      <rater icon="wode" title="好评" :value.sync="fenzhi" :max="6" star="☻" active-color="#FF9900" :margin="4"></rater>
    </c-group>
    <c-group style="margin-top: 15px;">
      <x-button type="primary" @click="handleSubmit">提交</x-button>
    </c-group>
    <br>
    <br>
  </c-box>
</template>

<script>
  /** vux components*/
  import XButton from 'vuxs/x-button'
  /** customer components*/
  import cBox from 'pubs/c-box'
  import CHeader from 'pubs/c-header'
  import cIcon from 'pubs/c-Icon'
  import cGroup from 'pubs/c-group'
  import Field from 'pubs/form/field'
  import Text from 'pubs/form/text'
  import PopupPicker from 'pubs/form/popup-picker'
  import Num from 'pubs/form/number'
  import Checklist from 'pubs/form/checklist'
  import Calendar from 'pubs/form/calendar'
  import Datetime from 'pubs/form/datetime'
  import Radio from 'pubs/form/radio'
  import Switch from 'pubs/form/switch'
  import Rater from 'pubs/form/rater'

  export default {
    components: {
      XButton,
      cBox,
      cIcon,
      CHeader,
      Field,
      Text,
      PopupPicker,
      cGroup,
      Num,
      Checklist,
      Calendar,
      Datetime,
      Radio,
      Switch,
      Rater
    },
    props: {},
    ready() {},
    vaRules: {
      username: {
        'required': {
          limit: true,
          message: '请输入用户名'
        },
        'minlength': {
          limit: 4,
          message: '用户名最少##limit##个字'
        }
      },
      password: {
        'required': {
          limit: true,
          message: '请输入密码'
        },
        'minlength': {
          limit: 6,
          message: '密码最少##limit##个字'
        }
      },
      info: {
        'required': {
          limit: true,
          message: '请输入详情'
        }
      },
      mobiletype: {
        'required': {
          limit: true,
          message: '必须选择'
        }
      },
      checklist: {
        'required': {
          limit: true,
          message: '请选择'
        },
        'min': {
          limit: 2,
          message: '最少要选择##limit##个哦'
        },
        'max': {
          limit: 2,
          message: '最多只能选择##limit##个哦'
        }
      },
      number: {
        'min': {
          limit: 2
        },
        'max': {
          limit: 5
        }
      },
      indate: {
        'required': {
          limit: true,
          message: '请选择发布时间'
        }
      },
      birthday: {
        'required': {
          limit: true,
          message: '请选择'
        }
      },
      radio: {
        'required': {
          limit: true,
          message: '请选择'
        }
      },
      checked: {},
      fenzhi: {}
    },
    computed: {
      invalid() {
        return this.$va.invalid
      }
    },
    data: function() {
      return {
        username: '',
        password: '',
        info: '',
        mobiletype: ['china', 'china001', 'sz'],
        checklist: [],
        number: 1,
        indate: 'TODAY',
        birthday: '',
        radio: '',
        checked: true,
        fenzhi: 5,
        list1: [{
          name: '中国',
          value: 'china',
          parent: 0
        }, {
          name: '美国',
          value: 'USA',
          parent: 0
        }, {
          name: '广东',
          value: 'china001',
          parent: 'china'
        }, {
          name: '广西',
          value: 'china002',
          parent: 'china'
        }, {
          name: '美国001',
          value: 'usa001',
          parent: 'USA'
        }, {
          name: '美国002',
          value: 'usa002',
          parent: 'USA'
        }, {
          name: '广州',
          value: 'gz',
          parent: 'china001'
        }, {
          name: '深圳',
          value: 'sz',
          parent: 'china001'
        }, {
          name: '广西001',
          value: 'gx001',
          parent: 'china002'
        }, {
          name: '广西002',
          value: 'gx002',
          parent: 'china002'
        }, {
          name: '美国001_001',
          value: '0003',
          parent: 'usa001'
        }, {
          name: '美国001_002',
          value: '0004',
          parent: 'usa001'
        }, {
          name: '美国002_001',
          value: '0005',
          parent: 'usa002'
        }, {
          name: '美国002_002',
          value: '0006',
          parent: 'usa002'
        }],
        objectList: [{
          id: '1',
          name: '001 name'
        }, {
          id: '2',
          name: '002 name'
        }, {
          keidy: '3',
          name: '003 name'
        }],
        radiolist: [{
          key: '001',
          value: '单选1'
        }, {
          key: '002',
          value: '单选2'
        }]
      }
    },
    methods: {
      close() {
        api.back()
      },
      success() {
        this.username = ''
        this.password = ''
        this.info = ''
        this.mobiletype = ''
        setTimeout(() => {
          this.$va.clear()
        }, 150)
      },
      getError(field) {
        return this.$va.$errors[field] || []
      },
      handleSubmit() {
        // if (this.$va.check()) {}
        this.$va.check()
        this.$va.reset()
      }
    }
  }

  api.init({
    beforeback() {
      api.log('setting-后退前的业务处理')
      return true
    }
  })
</script>

<style>

</style>