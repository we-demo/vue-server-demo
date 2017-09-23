<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  inject: ['router', 'urlPrefix'],

  provide () {
    return {
      urlPrefix: this.fullUrl
    }
  },

  props: {
    method: String,
    url: String,
    use: [Array, Function]
  },

  data () {
    return {
      fullUrl: (this.urlPrefix || '') + this.url
    }
  },

  created () {
    let handlers = []
    if (this.use) {
      handlers = Array.isArray(this.use)
      ? this.use
      : [this.use]
    }
    if (handlers.length) {
      let fn = this.method
        ? this.method.toLowerCase()
        : 'use'
      this.router[fn](this.fullUrl, ...handlers)
    }
  }
}
</script>
