<template>
  <div id="app">
    <adminnav></adminnav>

    <keep-alive :include="/keep/">
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
  import adminnav from 'components/adminnav';

  export default {
    name: 'app',
    components: {adminnav},

  }
</script>
