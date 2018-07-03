<template>
  <div class="helper">
    <span class="left">{{unfinish}} items left</span>
    <span class="tabs">
      <span v-for="state in states" :key="state" :class="[state, filter === state ? 'actived' : '']" @click.stop="toggleFilter(state)">{{state}}</span>
    </span>
    <span class="clear" @click.stop="clearAllCompleted">Clear Completed</span>
  </div>
</template>

<script>
const COMPONENT_NAME = "todo-tabs"
export default {
  name: COMPONENT_NAME,
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      states: ['all', 'active', 'completed']
    }
  },
  computed: {
    unfinish () {
      return this.todos.filter(_ => !_.completed).length
    }
  },
  methods: {
    toggleFilter (state) {
      this.$emit('onStateChange', state)
    },
    clearAllCompleted () {
      this.$emit('onClearClick')
    }
  }
}
</script>

<style lang="scss" scoped>
  .helper{
    font-weight: 100;
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    line-height: 30px;
    background-color: #fff;
    font-size: 14px;
    font-smoothing: antialiased;
  }
  .left, .clear, .tabs{
    padding: 0 10px;
    box-sizing: border-box;
  }
  .left, .clear{
    width: 150px;
  }
  .left{
    text-align: left;
  }
  .clear{
    text-align: right;
    cursor: pointer;
    user-select: none;
  }
  .tabs{
    width: 200px;
    display: flex;
    justify-content: space-around;
    user-select: none;
    * {
      display: inline-block;
      padding: 0 10px;
      cursor: pointer;
      border: 1px solid rgba(175,47,47,0);
      &.actived{
        border-color: rgba(175,47,47,0.4);
        border-radius: 5px;
      }
    }
  }
</style>
