import RULES from './rules'
import * as utils from '../api/utils.js'

let Vue

function checkField(rules, fieldName, value) {
  var _rules = Object.keys(rules)
  return _rules.map(ruleName =>
    checkOneRule.call(this, ruleName, fieldName, value)
  ).indexOf(false) === -1

  // var copyRules = utils.mix(true, {}, rules)
  // return Object.keys(copyRules).map(name =>
  //   checkOneRule.call(this, name, copyRules[name], field, value)
  // ).indexOf(false) === -1
}

/**
 * 检查某个字段的一个验证规则
 * @param {String} ruleName
 * @param {String} fieldName
 * @param {any} inputValue
 * @returns
 */
function checkOneRule(ruleName, fieldName, inputValue) {
  // 本字段的全部验证规则
  // this.$options.vaRules[field]

  // 默认的规则配置
  const _rule = this.$va.$rules[ruleName] || {}

  // 所有错误
  const $errors = this.$va.$errors
  var rule = this.$options.vaRules[fieldName][ruleName]
  if (utils.isObject(rule)) {
    rule = utils.mix(true, {}, _rule, rule)
  } else {
    rule = utils.mix(true, {}, _rule, {
      limit: rule
    })
  }

  var valid = false
  let required = this.$options.vaRules[fieldName]['required']
  if (!utils.isObject(required)) {
    required = utils.mix(true, {}, {
      limit: required
    })
  }
  // 输入值为''并且为非必填项
  if (inputValue === '' && !required.limit && ruleName !== 'required') {
    valid = true
  } else {
    valid = rule.get.call(this, inputValue, rule.limit)
  }
  const error = $errors[fieldName] || []
  const errorMsg = utils.tplRelpace(rule.message, rule)
  const oldErrorIndex = error.indexOf(errorMsg)

  if (valid) {
    oldErrorIndex > -1 && error.splice(oldErrorIndex, 1)
    if (!error.length) {
      Vue.delete($errors, fieldName)
    }
  } else if (oldErrorIndex < 0) {
    error.push(errorMsg)
    Vue.set($errors, fieldName, error)
  }
  this.$va.invalid = Boolean(Object.keys($errors).length)
  return valid
}

/**
 * init
 */
function init() {
  const rules = this.$options.vaRules

  /* istanbul ignore next */
  if (!rules) return

  this.$va = new Vuerify(this)
  Object.keys(rules).forEach(field => {
    this.$watch(field, value => {
      if (!_reset) {
        if (this.$va.$errors[field] && this.$va.$errors[field].length > 0) {
          this.$va.$errors[field] = []
        }
        checkField.call(this, rules[field], field, value)
      }
    })
  })
}

const Vuerify = function (_vm) {
  this.vm = _vm
  const fields = Object.keys(_vm.$options.vaRules)
  if (!_fieldsValue[_vm._uid + '']) {
    _fieldsValue[_vm._uid + ''] = {}
  }
  fields.map(field => {
    _fieldsValue[_vm._uid + ''][field] = _vm.$get(field)
  })
  Vue.util.defineReactive(this, '$errors', {})
  Vue.util.defineReactive(this, 'invalid', false)
}

var _reset = false
var _fieldsValue = {}

/**
 * 表单验证
 * @param {Array} fields 为空则代表全部字段
 * @returns
 */
Vuerify.prototype.check = function (fields) {
  const vm = this.vm
  const rules = vm.$options.vaRules

  fields = fields || Object.keys(rules)

  return fields.map(field => {
    checkField.call(vm, rules[field], field, vm.$get(field))
  }).indexOf(false) === -1
}

/**
 * 清理全部错误
 * @returns
 */
Vuerify.prototype.clear = function () {
  this.$errors = {}
  return this
}

/**
 * reset
 * @returns
 */
Vuerify.prototype.reset = function () {
  const vm = this.vm
  _reset = true
  var fields = Object.keys(_fieldsValue[vm._uid + ''])
  fields.map(field => {
    vm.$set(field, _fieldsValue[vm._uid + ''][field])
  })
  this.$errors = {}
  setTimeout(() => {
    _reset = false
  }, 0)
  return this
}

export default function (_Vue, opts) {
  Vue = _Vue
  Vuerify.prototype.$rules = utils.mix(true, {}, RULES, opts)
  Vue.mixin({
    created: init
  })
}
