import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import createRouter from './router'

import './components'
import './utils/dom.js'
import './assets/scss/global.scss'

Vue.use(VueRouter)

const router = createRouter()

// 导航守卫
router.beforeEach((to, from, next) => {
  console.log('before each invoked')
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
  next()
})

router.afterEach(() => {
  console.log('after each invoked')
})

const app = new Vue({
  router,
  render (h) {
    return h(App)
  }
}).$mount("#app")