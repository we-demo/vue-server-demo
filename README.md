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
   └─ src
      ├- components/
      ├─ index.js
      ├- main.js
      ├- server.vue
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
import VueServer from 'vue-server'
import Server from '@/server'

Vue.use(VueServer)

let Vm = Vue.extend(Server)
let vm = new Vm()
vm.$mount()
```

```vue
<!-- server.vue -->
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
```

## Credits

Thanks to [vue](https://github.com/vuejs/vue), [avoriaz-ava-example](https://github.com/eddyerburgh/avoriaz-ava-example).
