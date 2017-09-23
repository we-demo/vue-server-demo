import Vue from 'vue'
import VueServer from 'vue-server'
import Server from '@/server'

Vue.use(VueServer)

let Vm = Vue.extend(Server)
let vm = new Vm()
vm.$mount()
