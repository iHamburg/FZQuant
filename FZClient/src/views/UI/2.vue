<template>
  <div id="app">

    <draggable :list="people" :element="'ul'">
      <ul v-for="person in people" class="ul">
        <li>{{ person.name }}</li>
      </ul>
    </draggable>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      people: [
        {name: "Abby"},
        {name: "Brooke"},
        {name: "Courtenay"},
        {name: "David"}
      ],
      places: [
        {name: "Austria"},
        {name: "Bahamas"},
        {name: "Canada"},
        {name: "Djibouti"}
      ]
    }
  },
  components: {}
}
</script>
<style lang="scss">
.ul{
  float: left;
  li{

  }
}
</style>
