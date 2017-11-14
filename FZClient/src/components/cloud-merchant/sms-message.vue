<template>
  <div class="message" :class="[ mStyle || 'default' ]">
      <span class="time-tip" v-if="itemMessage.time">{{ itemMessage.time }}</span>
      <dl>
          <dt>{{ itemMessage.title }}  <i slot="new" v-if="itemMessage.status === '0'"></i></dt>
          <dd>
              <em><img :src="itemMessage.img"></em>
              <div class="text">
                <slot name="messageContent"></slot>
              </div>
          </dd>
          <slot name="count"></slot>
      </dl>
  </div>

</template>



<script>

export default {

  name: 'sms',

  data () {
    return {

    };
  },
  props: {
    itemMessage: Object,
    mStyle: String

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
  .message{
    text-align: center;
    padding: 0 rem(20);
    .time-tip{
      font-size: rem(22);
      color: #636A7C;
      padding: rem(8) rem(20);
      background: #E8E8E8;
      margin: rem(30) auto 0 auto;
      display: inline-block;
      border-radius: rem(30);
    }
    dl{
      width: 100%;
      padding: rem(20);
      margin: rem(30) auto;
      background: #fff;
      border-radius: rem(8);
      text-align: left;
      overflow: hidden;
    }
    dt{
      font-size: rem(28);
      color: #121C2D;
      padding: 0 rem(30) rem(20) 0;
      position: relative;
      i{
        width: rem(20);
        height: rem(20);
        background: #FD001F;
        border-radius: rem(10);
        position: absolute;
        right: rem(0);
        top: rem(10);
      }
    }
    dd{
      clear: both;
      overflow: hidden;
    }
    em{
      width: rem(165);
      height: rem(165);
      overflow: hidden;
      float: left;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .text, h2{
      width: rem(470);
      overflow: hidden;
      float:left;
      margin: 0 0 0 rem(20);
      font-size: rem(26);
      color: #7E8497;
      span{
        color:#FD001F;
        font-size: rem(26);
        padding: rem(8) 0 0;
        display: block;
      }
      p{
        color: #7E8497;
        font-size: rem(24);
      }
    }
    & h2{
      font-weight: 200;
      margin: 0;
      padding: 0 0 rem(20);
    }
    .light{
      width: rem(474);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #32281B;
    }
    .count{
      text-align: center;
      color: #666;
      font-size: rem(24);
      padding: rem(22) 0 rem(8) 0;
      margin: rem(20) 0 0;
      border-top:1px solid #d9d9d9;
    }

  }
</style>
