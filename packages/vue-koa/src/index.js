import requireDir from 'require-dir'

let map = requireDir('./components')

export default {
  install (Vue) {
    Object.keys(map).forEach(k => {
      let com = map[k]
      Vue.component(k, com.default) // note: should add `.default` for `requireDir`
    })
  }
}
