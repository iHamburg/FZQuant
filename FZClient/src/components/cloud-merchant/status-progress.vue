<template>

    <section class="gress">

        <ins v-if="gressData.isCurrent" class="current">
            <div class='circle'></div>
            <div class='center'></div>
        </ins>
        <ins v-else></ins>
    </section>

</template>

<script>
export default {
  name: 'StatusProgress',
  data () {
    return {
    }
  },
  props: {
    gressData: Object
  }
}
</script>
<style lang="scss">
@import "src/sass/tobe/function";
.gress {
  float:left;
  width:1px;
  background:#ccc;
  padding-bottom:3000px;
  margin-bottom:-3000px;
  margin-left: rem(20);
  position: relative;
  ins{
    width: rem(14);
    height: rem(14);
    border-radius: rem(7);
    display: block;
    background: #ccc;
    position: absolute;
    top: rem(60);
    left: 50%;
    margin-left: - rem(8);
    z-index: 9;
  }
  .current{
    width: rem(22);
    height: rem(22);
    display: block;
    background: none;
    margin-left: - rem(12);
  }

  .circle,
  .center {
      position: absolute;
      left: 0;
      top: 0;
      width: rem(22);
      height: rem(22);
      border-radius: rem(11);
      background-color: #f5bac5;
  }

  .center {
      background: #e6133c;
      text-align: center;
      color: #EAEAEA;
  }
  .circle {
      -webkit-animation: circle 1.8s linear infinite;
      animation: circle 1.8s linear infinite;
  }

  @-webkit-keyframes circle {
      from {
          opacity: 1;
          -webkit-transform: scale(0);
      }
      to {
          opacity: 0.5;
          -webkit-transform: scale(2);
      }
  }
}


</style>
