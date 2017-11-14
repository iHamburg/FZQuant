<template>
  <div class="badge-list">
    <div  class="badge-li">
      <slot name='left-text'></slot>
      <slot name='right-text'></slot>
    </div>
  </div>
</template>

<script>
export default {

  name: 'comli',

  data () {
    return {

    };
  }
};
</script>

<style lang="scss">
  @import "src/sass/tobe/function";
  .badge-list{
    background:#ffffff;
    padding-left:rem(30);
    font-size:rem(34);
    .badge-li{
      /*height: rem(88);*/
      min-height: rem(88);
      height: auto;
          @include display(flex);
          @include align-items(center);
          @include justify-content(space-between);
          @include hair(bottom, #d9d9d9);
          background-origin:border-box;
          padding-right: rem(30);
    }
    .right-text,.left-text{
        @include display(flex);
        @include align-items(center);
        @include justify-content(space-between);
    }
    .redcolor{
      color: #F76260;
    }
    .arrow-back{
      @include transform(rotate(180deg));
      font-size: rem(28);
      margin-left: rem(10);
      color: #666666;
    }
  }
</style>
