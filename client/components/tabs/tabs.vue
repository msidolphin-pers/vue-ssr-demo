<script>
import TabsContent from './tabs-content.vue'
const COMPONENT_NAME = 'tabs'
export default {
  name: COMPONENT_NAME,
  components: {
    TabsContent
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  provide () {
    return {
      value: this.value // 在子组件中通过inject获取，缺点是父组件value改变了不会引起子组件状态的更新
    }
  },
  data () {
    return {
      tabs: []
    }
  },
  methods: {
    onChange (value) {
      this.$emit('input', value)
      this.$emit('update:value', value)
    }
  },
  render () {
    return (
      <div class="tabs">
        <ul class="tabs-header">
          {this.$slots.default}
        </ul>
        <tabs-content tabs={this.tabs}></tabs-content>
      </div>
    )
  }
}
</script>

<style lang="scss">
.tabs {
  background: #fff;
  padding: 0 15px;
  .tabs-header {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    border-bottom: 2px solid #ededed;
  } 

}

</style>
