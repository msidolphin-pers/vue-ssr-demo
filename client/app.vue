<template>
    <div class="container">
        <div class="mask"></div>
        <todo-header/>
        <transition name="fade">
            <router-view></router-view>
        </transition>
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
