<template>
  <section class="todo-wrapper">
    <tabs :value.sync="filter">
      <tab v-for="tab in tabs" :key="tab" :label="tab" :index="tab"/>
    </tabs>
    <input type="text" class="add-input" autofocus="true" placeholder="接下来要做什么？" @keyup.enter="addTodo"/>
    <div class="todo-list">
      <todo-item v-for="todo in filtedTodos" :todo="todo" :key="todo.id" @onDelete="onDeleteHandle"/>
    </div>
    <helper :filter="filter" :todos="filtedTodos" @onStateChange="onStateChangeHandle" @onClearClick="onClearClickHandle"/>
  </section>
</template>

<script>
import {
  mapState, mapActions
} from 'vuex'
const COMPONENT_NAME = "todo"
let id = 0
export default {
  name: COMPONENT_NAME,
  metaInfo: {
    title: 'Todo List'
  },
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchTodos')
  },
  data () {
    return {
      todo: {id: 0, completed: true, content: 'this is todo'},
      filter: 'all',
      inputValue: '',
      tabs: ['all', 'active', 'completed']
    }
  },
  computed: {
    ...mapState(['todos']),
    filtedTodos () {
      switch(this.filter) {
        case 'all':
          return this.todos
        case 'active':
          return this.todos.filter(_ => !_.completed)
        case 'completed':
          return this.todos.filter(_ => _.completed)
      }
      return []
    }
  },
  methods: {
    ...mapActions(['fetchTodos']),
    addTodo (e) {
      if (!e.target.value.trim()) {
        return
      }
      this.todos.unshift({
        id: ++id,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    onDeleteHandle (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    onStateChangeHandle (state) {
      this.filter = state
    },
    onClearClickHandle () {
      this.todos = this.todos.filter(_ => !_.completed)
    }
  },
  mounted () {
    this.fetchTodos()
  }
}
</script>

<style lang="scss" scoped>
  .todo-wrapper{
    width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 5px #666;
      .add-input{
      position: relative;
      margin: 0;
      width: 100%;
      font-size: 24px;
      font-family: inherit;
      font-weight: inherit;
      line-height: 1.4em;
      border: 0;
      outline: none;
      color: inherit;
      padding: 6px;
      box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      font-smoothing: antialiased;
      padding: 16px 16px 16px 60px;
      border: none;
      box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }
    .todo-list {
      width: 100%;
      max-height: 500px;
      overflow-x: hidden;
      overflow-y: auto;
      margin-right: -17px;
    }
  }
</style>
