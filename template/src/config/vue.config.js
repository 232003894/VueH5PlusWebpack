// http 请求
import VueResource from 'vue-resource'
// 表单验证
import Vuerify from '../libs/va'
// http请求统一拦截
import httpInit from './vue.http.config'
// 全局弹出消息
import * as msg from 'pubs/msg'

export default function (vue) {
  vue.use(VueResource)
  vue.use(Vuerify)

  // 由于ESLint会检测没有定义的变量，因此需要这一个`global`注释声明IS_PRODUCTION是一个全局变量(当然在本例中并不是)来规避warning
  /* global IS_PRODUCTION:true */
  if (IS_PRODUCTION) {
    // 由于本脚手架并没有牵涉到HTTP请求，因此此处仅作为演示分离开发/生产环境之用。
    vue.config.devtools = false
    vue.http.options.root = 'http://192.168.2.241:8003/'
  } else {
    vue.config.devtools = true
    vue.http.options.root = 'http://192.168.2.241:8003/'
  }
  vue.filter('date', function (value, formats) {
    // 返回处理后的值
    return api.dateFormat(value, formats)
  })

  // http请求统一拦截
  httpInit(vue, api)

  // msg
  msg.init(vue)
}
