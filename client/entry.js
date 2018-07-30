import createVue from './main.js'

const {app, router, store} = createVue()

if (typeof window !== undefined && window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.beforeEach((to, from, next) => {
  next()
})

router.onReady(() => {
  app.$mount('#app')
})
