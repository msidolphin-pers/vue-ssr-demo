import Header from './header'
import Footer from './footer'
import Item from './item'
import Tabs from './tabs'
import Notification from './notification'

const components = {
  Header,
  Footer,
  Item,
  Tabs,
  Notification
}

const install = (Vue) => {
  for (let name in components) {
    if (components[name].install) components[name].install(Vue)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}