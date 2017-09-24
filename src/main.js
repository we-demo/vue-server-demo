import Vue from 'vue'
import VueKoa from 'vue-koa'
import Server from '@/server'

Vue.use(VueKoa)

Vue.config.errorHandler = (err, vm) => {
  console.error('Vue errorHandler', {
    error: err,
    from: formatComponentName(vm)
  })
}

let Vm = Vue.extend(Server)
let vm = new Vm()
vm.$mount()

// migrated from
// https://github.com/getsentry/raven-js/blob/master/plugins/vue.js
function formatComponentName(vm) {
  /* eslint-disable */
  if (vm.$root === vm) {
    return 'root instance';
  }
  var name = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;
  return (
    (name ? 'component <' + name + '>' : 'anonymous component') +
    (vm._isVue && vm.$options.__file ? ' at ' + vm.$options.__file : '')
  );
}
