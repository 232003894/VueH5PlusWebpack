var copyPath = ''
var chromename = ''
var userDataPath = ''
if (process.platform == 'win32') { //windows
  chromename = 'chrome'
  // copyPath = 'D:\\chenw\\Documents\\HBuilderProject\\vuetest'
  userDataPath = 'D:\\tmp\\CMyChromeDevUserData'
} else if (process.platform == 'darwin') { //windows
  chromename = 'google chrome'
  // copyPath = '/Users/kaifa/HBuilderProjects/'
  userDataPath = '/Users/kaifa/Documents/tmp'
} else { //'freebsd', 'linux', 'sunos'
  chromename = 'google-chrome'
  // copyPath = ''
  userDataPath = ''
}

module.exports = {
  copyPath: copyPath,
  index: 'main.html',
  port: 8080,
  proxyTable: {},
  chrome: {
    //Chrome 在 OS X 中 'google chrome', 在 Linux 中 'google-chrome' 在 Windows 中'chrome'.
    name: chromename,
    debuggingPort: 9222,
    //chrome 49 以后跨域需要指定 --user-data-dir 指定出一个个人信息目录，而不能使用默认的目录,可以自行指定
    userDataPath: userDataPath
  }
}
