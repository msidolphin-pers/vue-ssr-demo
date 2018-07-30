<script>
const COMPONENT_NAME = 'tab'
export default {
  name: COMPONENT_NAME,
  props: {
    index: {
      type: [Number, String],
      required: true
    },
    label: {
      type: String,
      default: ''
    }
  },
  inject: ['value'],
  computed: {
    active() {
      return this.$parent.value === this.index
    }
  },
  methods: {
    onClick (e) {
      e.stopPropagation()
      this.$parent.onChange(this.index)
    }
  },
  render () {
    const tab = this.$slots.label || <span>{this.label}</span>
    const className = {
      tab: true,
      active: this.active
    }
    return (
      <li class={className} on-click={this.onClick}>{tab}</li>
    )
  },
  mounted () {
    this.$parent.tabs.push(this)
  }
}
</script>

<style lang="scss">
.tab {
  list-style: none;
  line-height: 40px;
  margin-right: 30px;
  position: relative;
  bottom: -2px;
  cursor: pointer;
  &.active {
    border-bottom: 2px solid blue;
  }
  &:last-child {
    margin-right: 0;
  }
}
</style>
