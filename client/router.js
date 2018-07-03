import Router from 'vue-router'
import routes from './routes.js'

// const router = new Router({
//   routes
// })

export default () => {
  return new Router({
    mode: 'history',
    fallback: true, 
    routes
  })
}