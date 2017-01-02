import * as toast from './toast'
import * as alert from './alert'
import * as confirm from './confirm'
import * as dialog from './dialog'
import * as loading from './loading'
import * as login from './login'

export function init(vue) {
  toast.init(vue)
  alert.init(vue)
  confirm.init(vue)
  dialog.init(vue)
  loading.init(vue)
  login.init(vue)
}
