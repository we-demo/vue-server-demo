<template>
  <koa>
    <router>
      <api url="/users">
        <api method="GET" url="/list" :use="listUsers"></api>
        <api method="POST" url="/create" :use="[koaBody, createUser]"></api>
      </api>
    </router>
    <listen :port="port"></listen>
  </koa>
</template>

<script>
import KoaBody from 'koa-body'

export default {
  beforeCreate () {
    this.koaBody = KoaBody()
  },

  data () {
    return {
      users: [],
      port: 7777
    }
  },

  methods: {
    createUser (ctx) {
      let user = ctx.request.body
      this.users.push(user)
      ctx.status = 201
      ctx.body = 'Created.'
    },
    listUsers (ctx) {
      ctx.body = this.users
    }
  }
}
</script>
