<template>
    <div class="container">
        <router-link to="/login">login</router-link><router-link to="/app">app</router-link>
        <div class="mask"></div>
        <todo-header/>
        <router-view></router-view>
        <todo-footer/>
    </div>
</template>

<script>
export default {   
    name: 'App',
    metaInfo: {
        title: 'App'
    }
}
</script>

<style lang="scss">
.container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.2;
      filter: alpha(opacity=0.2);
      background: #fff;
      z-index: -1;
    }
}
</style>
