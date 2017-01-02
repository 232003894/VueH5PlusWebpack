import * as utils from '../api/utils.js'
import isEmail from 'validator/lib/isEmail'
import isUrl from 'validator/lib/isURL'
import isDate from 'validator/lib/isDate'

export default {
  required: {
    message: '必须填写',
    get: function (inputValue, limit) {
      if (limit) {
        if (utils.isArray(inputValue)) {
          return inputValue.length > 0
        } else {
          return inputValue !== ''
        }
      } else {
        return true
      }
    }
  },
  pattern: {
    message: '必须匹配##limit##这样的格式',
    get: function (inputValue, limit) {
      if (utils.isRegExp(limit)) {
        return limit.test(inputValue)
      }
      return true
    }
  },
  minlength: {
    message: '最少输入##limit##个字',
    get: function (inputValue, limit) {
      var num = parseInt(limit, 10)
      return inputValue.length >= num
    }
  },
  url: {
    message: 'URL格式不正确',
    get: function (inputValue, limit) {
      return isUrl(inputValue)
    }
  },
  email: {
    message: 'email格式不正确',
    get: function (inputValue, limit) {
      return isEmail(inputValue)
    }
  },
  min: {
    message: '输入值不能小于##limit##',
    get: function (inputValue, limit) {
      var num = parseInt(limit, 10)
      if (utils.isArray(inputValue)) {
        return parseFloat(inputValue.length) >= num
      } else {
        return parseFloat(inputValue) >= num
      }
    }
  },
  max: {
    message: '输入值不能大于##limit##',
    get: function (inputValue, limit) {
      var num = parseInt(limit, 10)
      if (utils.isArray(inputValue)) {
        return parseFloat(inputValue.length) <= num
      } else {
        return parseFloat(inputValue) <= num
      }
    }
  },
  equalto: {
    message: '密码输入不一致',
    get: function (inputValue, limit, next) {
      var other = document.getElementById(limit).value || ''
      return inputValue === other
    }
  },
  date: {
    message: '日期格式不正确',
    get: function (inputValue, limit) {
      return isDate(inputValue)
    }
  }
}
