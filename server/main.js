import createApp from '../client/main.js'

// context由serverRenderer调用renderToString传入
export default context => {
  return new Promise((resolve, reject) => {
    const {app, router, store} = createApp()
    if (context.user) {
      store.state.user = context.user
    }
    // 主动调用router.push操作，"渲染"相关组件
    router.push(context.url)
    router.onReady(() => {
      let matchedComponents = router.getMatchedComponents()
      if (matchedComponents && matchedComponents.length) {
        Promise.all(matchedComponents.map(component => {
          if (component.asyncData) {
            return component.asyncData({
              store
            })
          }
        })).then(() => {
          context.meta = app.$meta()
          context.state = store.state
          resolve(app)
        })
      }
      else return reject(new Error('no componet matched.'))
    })
  })
}