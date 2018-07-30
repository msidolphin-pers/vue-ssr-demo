export default {
  updateCount (state, { num, num2 }) {
    console.log(num2)
    state.count = num
  },
  setTodos (state, todos) {
    state.todos = todos
  },
  setUser (state, user) {
    state.user = user
  }
}
