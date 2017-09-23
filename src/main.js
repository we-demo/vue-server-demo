import Vue from 'vue'
import VueKoa from 'vue-koa'
import Server from '@/server'

Vue.use(VueKoa)

let Vm = Vue.extend(Server)
let vm = new Vm()
vm.$mount()
