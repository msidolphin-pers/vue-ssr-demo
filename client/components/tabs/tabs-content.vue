<script>
const COMPONENT_NAME = 'tabs-content'
export default {
  name: COMPONENT_NAME,
  props: {
    tabs: {
      type: Array,
      required: true
    }
  },
  render () {
    const contents = this.tabs.map(tab => tab.active ? tab.$slots.default : null)
    return (
      <div class="tabs-content">
        {contents}
      </div>
    )
  }
}

</script>

<style lang="scss">
.tabs-content {
    white-space: normal;
    overflow: auto;
    word-wrap: break-word;
    word-break: normal;
}
</style>
