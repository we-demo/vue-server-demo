# vue-server-demo

> "Vue is a language."

Writing koa server in Vue.

- [x] koa
- [x] router
- [x] api (method, url, use)
- [x] listen (port)
- [ ] more...

```plain
/
└─ ServerApp
   └─ src/
      ├─ components/
      ├─ index.js
      ├─ main.js
      ├─ server.vue
      └─ setup.js
   └─ .babelrc
   └─ package.json
```

```plain
npm install -S vue-server
```

```js
// main.js
import Vue from 'vue'
import VueKoa from 'vue-koa'
import Server from '@/server'

Vue.use(VueKoa)

let Vm = Vue.extend(Server)
let vm = new Vm()
vm.$mount()
```

```vue
<!-- server.vue -->
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
```

```js
// server.vue <script>
export default {
  // ...
  data () {
    return {
      users: [],
      port: 7777
    }
  },

  methods: {
    async apiMiddleware (ctx, next) {
      // ...
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
```

## Credits

Thanks to [vue](https://github.com/vuejs/vue), [avoriaz-ava-example](https://github.com/eddyerburgh/avoriaz-ava-example).
