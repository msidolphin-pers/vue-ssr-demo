import Tabs from './tabs.vue'
import Tab from './tab.vue'

Tabs.install = (Vue) => {
  Vue.component(Tabs.name, Tabs)
}

Tab.install = (Vue) => {
  Vue.component(Tab.name, Tab)
}

export default {
  Tabs,
  Tab
}
