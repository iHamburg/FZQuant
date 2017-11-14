<template>
    <div class="check-content">
      <slot name="check" class="check-l"></slot>
      <slot name="check-box" class="check-r"></slot>
    </div>
</template>



<script>

export default {

  name: 'checkbox',

  data () {
    return {

    };
  },
  props: {

  },
  mounted() {

  },
  methods: {

  },
  computed: {

  }
};
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .check-content{
    .check-l{
      float: left;
    }
    .check-r{
      float: right;
    }

  }
  .check-content:active{
    @include addclickcolor();
  }
</style>
