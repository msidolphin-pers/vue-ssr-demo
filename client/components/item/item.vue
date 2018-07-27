<template>
  <div :class="['todo-item', todo.completed ?  'completed' : '']">
    <input
      type="checkbox"
      class="toggle"
      v-model="todo.completed"
      :value="todo.completed"
    >
    <label>{{todo.content}}</label>
    <button class="destory" @click.stop="deleteTodo"></button>
  </div>
</template>

<script>
const COMPONENT_NAME = "todo-item"
export default {
  name: COMPONENT_NAME,
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteTodo () {
      this.$emit('onDelete', this.$props.todo.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/item.scss';
</style>
