import Notification from './notification.vue'
import notify from './function'

Notification.install = (Vue) => {
  Vue.component(Notification.name, Notification)
  Vue.prototype.$notify = notify
}

export default Notification
