const moduleExports = {}

// 由于ESLint会检测没有定义的变量，因此需要这一个`global`注释声明IS_PRODUCTION是一个全局变量(当然在本例中并不是)来规避warning
/* global IS_PRODUCTION:true */
if (IS_PRODUCTION) {
  // 由于本脚手架并没有牵涉到HTTP请求，因此此处仅作为演示分离开发/生产环境之用。
  moduleExports.API_ROOT = 'http://api.xxxx.com/'
} else {
  moduleExports.API_ROOT = 'http://localhost/mock/'
}

export default moduleExports
