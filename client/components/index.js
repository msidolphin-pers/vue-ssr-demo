import Vue from 'vue'
import Header from './header'
import Footer from './footer'
import Item from './item'
import Tabs from './tabs'

const componets = {
  Header,
  Footer,
  Item,
  Tabs
}

for (name in componets) {
  if (componets[name].install) componets[name].install(Vue)
}

export default componets