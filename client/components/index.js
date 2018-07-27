import Vue from 'vue'
import Header from './header'
import Footer from './footer'
import Item from './item'
import Tabs from './tabs'

const components = {
  Header,
  Footer,
  Item,
  Tabs
}

for (let name in components) {
  if (components[name].install) components[name].install(Vue)
}

export default components