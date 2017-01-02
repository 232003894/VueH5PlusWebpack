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
  const msg = (options) => {
    // destroy watcher
    watcher && watcher()
    if (typeof options === 'object') {
      for (let i in options) {
        $vm[i] = options[i]
      }
    } else if (typeof options === 'string') {
      $vm['msg'] = options
    }
    if (typeof options === 'object' && (options.onHide)) {
      watcher = $vm.$watch('show', (val) => {
        if (val === false && options.onHide) {
          setTimeout(() => {
            options.onHide($vm)
          }, 0)
        }
      })
    }
    $vm.show = true
  }
  if (!window.$confirm) {
    window.$confirm = msg
  }
}
