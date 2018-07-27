import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import App from './app.vue'
import createRouter from './router'
import Components from './components'
import './utils/dom.js'
import './assets/scss/global.scss'
Vue.use(VueRouter)
Vue.use(VueMeta)
Vue.use(Components)

export default () => {
  const router = createRouter()
  const app = new Vue({
    router,
    render(h) {
      return h(App)
    }
  })
  return {
    router,
    app
  }
}
