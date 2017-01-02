import myMsg from './msg'
let $vm
let watcher
export function init(vue) {
  if (!$vm) {
    const Msg = vue.extend(myMsg)
    $vm = new Msg({
      el: document.createElement('div')
    })
    $vm.$before(document.body.lastChild)
  }
  const msg = {
    show(options) {
      // destroy watcher
      watcher && watcher()
      if (typeof options === 'object' && (options.onHide)) {
        watcher = $vm.$watch('show', (val) => {
          if (val === false && options.onHide) {
            setTimeout(() => {
              options.onHide($vm)
            }, 0)
          }
        })
      }
      if (typeof options === 'object') {
        for (let i in options) {
          $vm[i] = options[i]
        }
        $vm.show = true
      } else if (typeof options === 'boolean') {
        $vm.reload = $vm.show = options
        $vm.success = () => {}
      } else if (typeof options === undefined) {
        $vm.show = true
        $vm.reload = true
        $vm.success = () => {}
      }
    },
    cancle() {
      if ($vm.show === true) {
        setTimeout(() => {
          // reload 后退/关闭来源
          if ($vm.reload) {
            if (window.plus) {
              window.api.h5Back()

              // 关闭登录层
              setTimeout(() => {
                window.$login && window.$login.close && window.$login.close()
              }, 300)
            } else {
              if (window.history.length > 1) {
                window.history.back()

                // 关闭登录层
                setTimeout(() => {
                  window.$login && window.$login.close && window.$login.close()
                }, 300)
              } else {
                // confirm
                window.$confirm && window.$confirm({
                  title: '退出登录',
                  msg: '退出登录会关闭本页面,是否退出登录？',
                  confirm: '不了，继续登录',
                  cancel: '是的，我要退出',
                  onConfirmHide: () => {
                    // utils.log('confirm 关闭')
                  },
                  onConfirm: () => {
                    // utils.log('不了，继续登录')
                  },
                  onCancel: () => {
                    // utils.log('是的，我要退出')
                    window.close()
                  }
                })
              }
            }
          } else {
            // 关闭登录层
            // msg.close()
            window.$login && window.$login.close && window.$login.close()
          }
        }, 0)
      }
    },
    close() {
      if ($vm.show === true) {
        // console.log('close')
        $vm.show = false
        $vm.reload = false
        $vm.success = () => {}
      }
    },
    needReload() {
      return $vm.reload
    },
    callBack() {
      $vm.success && $vm.success()
    }
  }
  if (!window.$login) {
    window.$login = msg
  }
}
