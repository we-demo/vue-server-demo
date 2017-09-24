<template>
  <koa>
    <router url="/api">
      <api :use="apiMiddleware"></api>
      <api url="/users">
        <api method="get" url="/list" :use="listUsers"></api>
        <api method="post" url="/create" :use="[koaBody, createUser]"></api>
      </api>
      <api method="all" url="*" :use="apiNotFound"></api>
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
    async apiMiddleware (ctx, next) {
      try {
        await next()
      } catch (err) {
        let status = err && err.status || 500
        ctx.body = { status, error: err && err.message || `${err}` }
      }
    },
    createUser (ctx) {
      let user = ctx.request.body
      this.users.push(user)
      ctx.status = 201
      ctx.body = 'Created.'
    },
    listUsers (ctx) {
      ctx.body = this.users
    },
    apiNotFound (ctx) {
      ctx.throw(404, 'Api not found')
    }
  }
}
</script>
