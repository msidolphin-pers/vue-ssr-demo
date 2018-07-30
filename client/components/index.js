import Header from './header'
import Footer from './footer'
import Item from './item'
import Helper from './helper'
import Notification from './notification'
import $Tabs from './tabs'

const Tab = $Tabs.Tab
const Tabs = $Tabs.Tabs

const components = {
  Header,
  Footer,
  Item,
  Helper,
  Notification,
  Tab,
  Tabs
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