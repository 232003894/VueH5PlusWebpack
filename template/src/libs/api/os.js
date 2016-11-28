let os = {};

((ua) => {
  // wechat
  let match = ua.match(/(MicroMessenger)\/([\d\.]+)/i)
  if (match) {
    os.wechat = {
      version: match[2].replace(/_/g, '.')
    }
  }

  // android
  match = ua.match(/(Android);?[\s\/]+([\d.]+)?/)
  if (match) {
    os.android = true
    os.version = match[2]
    os.isBadAndroid = !(/Chrome\/\d/.test(window.navigator.appVersion))
  }

  // iphone
  match = ua.match(/(iPhone\sOS)\s([\d_]+)/)
  if (match) {
    os.ios = os.iphone = true
    os.version = match[2].replace(/_/g, '.')
  }

  // ipad
  match = ua.match(/(iPad).*OS\s([\d_]+)/)
  if (match) {
    os.ios = os.ipad = true
    os.version = match[2].replace(/_/g, '.')
  }

  //  5+ Browser
  match = ua.match(/Html5Plus/i)
  if (match) {
    os.plus = true
      // document.body.classList.add( $.className( 'plus' ) )
  }

  // 最好有流应用自己的标识
  match = ua.match(/StreamApp/i)
  if (match) {
    os.stream = true
      // document.body.classList.add( $.className( 'plus-stream' ) )
  }
})(navigator.userAgent)

export default os
