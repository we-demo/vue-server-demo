<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import Router from 'koa-router'

export default {
  inject: ['app'],

  provide () {
    return {
      urlPrefix: '',
      router: this.router
    }
  },

  data () {
    return {
      router: new Router()
    }
  },

  // wait for children api mounted  
  mounted () {
    this.app.use(this.router.routes())
  }
}
</script>
