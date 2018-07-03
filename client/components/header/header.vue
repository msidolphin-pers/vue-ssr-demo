<template>
  <header class="main-header">
    <h1>{{name}}</h1>
  </header>
</template>

<script>
const COMPONENT_NAME = "todo-header"
export default {
  name: COMPONENT_NAME,
  data () {
    return {
      name: 'JTodo'
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-header{
    text-align: center;
    overflow: hidden;
    h1{
      font-size: 100px;
      color: rgba(175, 47, 47, 0.4);
      font-weight: 100;
      margin: 20px;
    }
  }
</style>