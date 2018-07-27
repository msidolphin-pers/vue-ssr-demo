import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import createRouter from './router'
import './components'
import './utils/dom.js'
import './assets/scss/global.scss'
Vue.use(VueRouter)

export default () => {
  const router = createRouter()
  const app = new Vue({
    router,
    app,
    render(h) {
      return h(App)
    }
  })
  return {
    router,
    app
  }
}
