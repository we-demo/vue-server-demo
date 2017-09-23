<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  inject: ['app'],
  
  props: {
    port: Number
  },

  created () {
    this.app.listen(this.port, () => {
      console.log(`app.listen at port ${this.port}`)
    })
  }
}
</script>
