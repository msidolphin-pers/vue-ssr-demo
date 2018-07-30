import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueMeta from 'vue-meta'
import App from './app.vue'
import createRouter from './router'
import createStore from './store/store.js'
import Components from './components'
import './utils/dom.js'
import './assets/scss/global.scss'
import bus from './utils/bus.js'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueMeta)
Vue.use(Components)

export default () => {
  const router = createRouter()
  const store = createStore()

  bus.$on('auth', () => {
    router.push({path: '/login'})
  })
  
  const app = new Vue({
    router,
    store,
    render(h) {
      return h(App)
    }
  })
  return {
    router,
    store,
    app
  }
}
