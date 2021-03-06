import Todo from './views/todo/todo.vue'
import Login from './views/login/login.vue'

export default [
  {
    path: '/',
    component: () => import('./views/todo/todo.vue'), // Todo, //
  },
  {
    path: '/app',
    component: () => import('./views/todo/todo.vue'), // Todo, //
    props: true
  },
  {
    path: '/login',
    component:  () => import('./views/login/login.vue') // Login //
  }
]