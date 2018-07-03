import Item from './item.vue'

Item.install = (Vue) => {
  Vue.component(Item.name, Item)
}

export default Item
