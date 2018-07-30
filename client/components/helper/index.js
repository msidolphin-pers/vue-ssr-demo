import Helper from './helper.vue'

Helper.install = (Vue) => {
  Vue.component(Helper.name, Helper)
}

export default Helper
