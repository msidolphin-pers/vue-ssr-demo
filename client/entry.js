import createVue from './main.js'

const {app, router} = createVue()

router.onReady(() => {
  app.$mount('#app')
})
