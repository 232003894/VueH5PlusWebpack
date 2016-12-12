/**
 * 是否无网络
 * @export
 * @returns
 */
export function noNetwork() {
  if (window.plus) {
    var nt = plus.networkinfo.getCurrentType()
    if (nt === plus.networkinfo.CONNECTION_NONE) {
      return true
    }
  }
  return false
}
