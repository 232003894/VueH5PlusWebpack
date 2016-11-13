module.exports = {
  copyPath: '',
  index: 'main.html',
  port: 8080,
  proxyTable: {},
  chrome: {
    //Chrome 在 OS X 中 'google chrome', 在 Linux 中 'google-chrome' 在 Windows 中'chrome'.
    name: 'chrome',
    debuggingPort: 9222,
    //chrome 49 以后跨域需要指定 --user-data-dir 指定出一个个人信息目录，而不能使用默认的目录,可以自行指定
    userDataPath: 'D:\\tmp\\CMyChromeDevUserData'
  }
}
