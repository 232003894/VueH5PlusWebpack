/**
 * fixed Array.isArray
 */
if (!Array.isArray) {
  Array.isArray = function (a) {
    return Object.prototype.toString.call(a) === '[object Array]'
  }
}

/* eslint-disable no-extend-native */
Array.prototype.removeAt = function (index) {
  // 移除数组中指定位置的元素，返回布尔表示成功与否
  return !!this.splice(index, 1).length
}

/**
 * fixed CustomEvent
 */
if (typeof window.CustomEvent === 'undefined') {
  /* eslint-disable no-inner-declarations */
  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    }
    var evt = document.createEvent('Events')
    var bubbles = true
    for (var name in params) {
      (name === 'bubbles') ? (bubbles = !!params[name]) : (evt[name] = params[name])
    }
    evt.initEvent(event, bubbles, true)
    return evt
  }
  CustomEvent.prototype = window.Event.prototype
  window.CustomEvent = CustomEvent
}

/**
 * fixed String trim
 */
if (String.prototype.trim === undefined) { // fix for iOS 3.2
  /* eslint-disable no-extend-native */
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '')
  }
}
Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
  /* eslint-disable no-proto */
  obj['__proto__'] = proto
  return obj
}

let class2type = {}

let types = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error']

types.forEach((name, i) => {
  class2type['[object ' + name + ']'] = name.toLowerCase()
})

/**
 * 获取类型
 * @export
 * @param {any} obj
 * @returns
 */
export function getType(obj) {
  /**
   * ECMA-262 规范定义了Object.prototype.toString的行为：
   当调用 toString 方法，采用如下步骤：
   1. 如果 this 的值是 undefined, 返回 '[object Undefined]'.
   2. 如果 this 的值是 null, 返回 '[object Null]'.
   3. 令 O 为以 this 作为参数调用 ToObject 的结果 .
   4. 令 class 为 O 的 [[Class]] 内部属性的值 .
   5. 返回三个字符串 '[object ', class, and ']' 连起来的字符串 .

   利用这个方法，再配合call，我们可以取得任何对象的内部属性[[Class]]，然后把类型检测转化为字符串比较，以达到我们的目的。
   */
  return obj == null ? String(obj) : class2type[{}.toString.call(obj)] || 'object'
}

/**
 * 判定是否为字符串
 * @export
 * @param {any} value
 * @returns {boolean} 是否为字符串
 */
export function isString(value) {
  return getType(value) === 'string'
}

/**
 * 判定是否为正则
 * @export
 * @param {any} value
 * @returns {boolean} 是否为正则
 */
export function isRegExp(value) {
  return getType(value) === 'regexp'
}

/**
 * 判定是否为一个函数
 * @export
 * @param {any} value
 * @returns {boolean} 是否为一个函数
 */
export function isFunction(value) {
  return getType(value) === 'function'
}

/**
 * 判定是否为日期
 * @export
 * @param {any} value
 * @returns {boolean} 是否为日期
 */
export function isDate(value) {
  return getType(value) === 'date'
}

/**
 * 判定是否为数组
 * @export
 * @param {any} value
 * @returns {boolean} 是否为数组
 */
export function isArray(value) {
  return getType(value) === 'array'
}

/**
 * 判定是否为一个window对象
 * @export
 * @param {any} obj
 * @returns {boolean} 是否为一个window对象
 */
export function isWindow(obj) {
  return obj != null && obj === obj.window
}

/**
 * 判定是否为一个对象
 * @export
 * @param {any} obj
 * @returns {boolean} 是否为一个对象
 */
export function isObject(obj) {
  return getType(obj) === 'object'
}

/**
 * 判定是否为一个纯净的JS对象, 不能为window, 任何类(包括自定义类)的实例,元素节点,文本节点
 * @export
 * @param {any} obj
 * @returns {boolean} 是否为一个纯净的JS对象
 */
export function isPlainObject(obj) {
  return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype
}

// /**
//  * isArrayLike
//  * @export
//  * @param {any} obj
//  * @returns {boolean}
//  */
// export function isArrayLike(obj) {
//   var length = !!obj && 'length' in obj && obj.length
//   var type = getType(obj)
//   if (type === 'function' || isWindow(obj)) {
//     return false
//   }
//   return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj
// }

/**
 * 用于合并多个对象或深克隆,类似于jQuery.extend；
 * 数组也可以合并,这里数组可以理解为以索引为属性的对象；
 * mix( target [, object1 ] [, objectN ] )；
 * mix( [deep ], target, object1 [, objectN ] )；
 * deep : 如果是true，合并成为递归（又叫做深拷贝）。
 * target : 对象扩展。这将接收新的属性。
 * object1 -- objectN : 一个对象，它包含额外的属性合并到第一个参数。
 * @export
 * @returns {Object} 返回 target
 */
export function mix() {
  var options
  var name
  var src
  var copy
  var copyIsArray
  var clone
  var target = arguments[0] || {}
  var i = 1
  var length = arguments.length
  var deep = false
    // 如果第一个参数为布尔,判定是否深拷贝
  if (typeof target === 'boolean') {
    deep = target
    target = arguments[1] || {}
    i++
  }

  // 确保接受方为一个复杂的数据类型
  if (typeof target !== 'object' && !isFunction(target)) {
    target = {}
  }

  // 如果只有一个参数，那么新成员添加于mix所在的对象上
  if (i === length) {
    target = this
    i--
  }

  for (; i < length; i++) {
    // 只处理非空参数
    if ((options = arguments[i]) != null) {
      for (name in options) {
        src = target[name]
        try {
          // 当options为VBS对象时报错
          copy = options[name]
        } catch (e) {
          continue
        }

        // 防止环引用
        if (target === copy) {
          continue
        }
        if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && Array.isArray(src) ? src : []
          } else {
            clone = src && isPlainObject(src) ? src : {}
          }
          target[name] = mix(deep, clone, copy)
        } else if (copy !== void 0) {
          target[name] = copy
        }
      }
    }
  }
  return target
}

/**
 * trigger event
 * @export
 * @param {Object} element
 * @param {string} eventType
 * @param {JSON} eventData
 * @returns
 */
export function trigger(element, eventType, eventData) {
  element.dispatchEvent(new CustomEvent(eventType, {
    detail: eventData,
    bubbles: true,
    cancelable: true
  }))
  return this
}

/**
 * 去html标签
 * @export
 * @param {String} html
 * @returns
 */
export function htmlToTxt(html) {
  var doc = ''
  if (getType(html) === 'string') {
    // doc = html.replace(/^[^\/]+\/\*!?\s?/, '').replace(/\*\/[^\/]+$/, '').trim().replace(/>\s*</g, '><')
    doc = html.replace(/<\/?.+?>/g, '')
  }
  return doc
}

/**
 * 比较对象是否相等
 * @param {Object} x
 * @param {Object} y
 * @param {String} propertys 设置对比的属性,多属性用逗号分隔,非必填
 */
export function equals(x, y, propertys) {
  // If both x and y are null or undefined and exactly the same
  if (x === y) {
    return true
  }
  // If they are not strictly equal, they both need to be Objects
  if (!(x instanceof Object) || !(y instanceof Object)) {
    return false
  }
  // They must have the exact same prototype chain, the closest we can do is
  // test the constructor.
  if (x.constructor !== y.constructor) {
    return false
  }

  if (propertys) {
    var arrs = propertys.split(',')
    for (var arr in arrs) {
      var _p = arrs[arr]
      if (x.hasOwnProperty(_p) && y.hasOwnProperty(_p)) {
        // If they have the same strict value or identity then they are equal
        if (x[_p] === y[_p]) {
          continue
        }
        // Numbers, Strings, Functions, Booleans must be strictly equal
        if (typeof (x[p]) === 'function') {
          return (x[p]).toString() === (y[p]).toString()
        } else if (typeof (x[_p]) !== 'object') {
          return false
        }
        // Objects and Arrays must be tested recursively
        if (!equals(x[_p], y[_p])) {
          return false
        }
      }
    }
  } else {
    for (var p in x) {
      // Inherited properties were tested using x.constructor === y.constructor
      if (x.hasOwnProperty(p)) {
        // Allows comparing x[ p ] and y[ p ] when set to undefined
        if (!y.hasOwnProperty(p)) {
          return false
        }
        // If they have the same strict value or identity then they are equal
        if (x[p] === y[p]) {
          continue
        }
        // Numbers, Strings, Functions, Booleans must be strictly equal
        if (typeof (x[p]) === 'function') {
          return (x[p]).toString() === (y[p]).toString()
        } else if (typeof (x[p]) !== 'object') {
          return false
        }
        // Objects and Arrays must be tested recursively
        if (!equals(x[p], y[p])) {
          return false
        }
      }
    }

    for (p in y) {
      // allows x[ p ] to be set to undefined
      if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
        return false
      }
    }
  }

  return true
}

/**
 * log
 * @export
 * @param {string} msg
 */
export function log(msg) {
  var br = '\r\n'
  var _d = new Date()
  var str = '[' + _d.toLocaleTimeString() + ' ' + _d.getMilliseconds() + ']' + br + ' '
  str += msg
  console.log(str)
}

var rformat = /\\?##([^{}]+)##/gm

/**
 * 模板替换输出
 * @export
 * @param {any} tpl 示例:'最少输入##minlength##个字'
 * @param {any} data  示例:{'minlength': 12}
 * @returns
 */
export function tplRelpace(tpl, data) {
  data = data || {}
  tpl = tpl || ''
  return tpl.replace(rformat, function (_, name) {
    return data[name] == null ? '' : data[name]
  })
}
