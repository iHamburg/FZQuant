<template>
    <div  :class="{'order-box1': !item.beginAt, 'order-box': item.beginAt}">
      <div :class="{'order-product1': !item.beginAt, 'order-product': true}">
          <div class="probox" >
             <img  class="picture" :src="item.imgUrl">
              <dl :class="{'dl1': !item.beginAt, 'dlDefaule':true}">
                <dt :class="{'dtCenter': !item.beginAt, 'dtDefaule':true}">{{ item.title }}</dt>
                <dd v-if="item.beginAt">
                    <span class="pl">活动期限 {{ item.beginAt }} - {{item.endAt}}</span>
                </dd>
              </dl>

          </div>

          <slot name="button"></slot>
      </div>
  </div>
</template>
<script>

export default {

  name: 'orderBox',
  props: {
    item: Object,
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {

  }
};
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
    .order-box{
      background: #fff;
      margin-bottom: rem(30);
    }
    .order-box1{
      background: #fff;
    }
    // .order-box1:active,.order-box:active,.probox:active{
    //   @include addclickcolor();
    // }
    .order-buyer{
      padding: rem(30);
      border-bottom: 1px solid #d9d9d9;
      dt{
        overflow: hidden;
        clear: both;
        span{
          float: left;
          font-size: rem(34);
          color: #000;
        }
        i{
          float: right;
          font-style: normal;
          font-size: rem(28);
          color: #999;
        }
        .red{
          color: #F76260;
        }
        .over{
          color: #00A699;
        }
      }
      dd{
        font-size: rem(24);
        color: #888;
        overflow: hidden;
        clear: both;
        span{
          float: left;
        }
        i{
          float: right;
          font-style: normal;
        }
      }

    }
    .notes{
      padding: rem(30) 0 rem(30) rem(30);
      background: #FBFBFB;
      font-size: rem(24);
      border-bottom: 1px solid #d9d9d9;
      margin-top: - rem(10);
      dd{
        padding: rem(10) rem(30) rem(5) 0;
        word-wrap: break-word;
      }
      .seller{
        color: #4B4B64;
      }
      .buyers{
        color: #00A699;
      }
      .cancel{
        color: #00A699;
        padding: rem(0) rem(30) rem(5) 0;
        border-bottom: 1px solid #d9d9d9;
      }
    }
    .order-product{
      padding-left: rem(30);
      background: #fff;
      .probox{
        padding: rem(22) rem(30) rem(20) 0;
        border-bottom: 1px solid #d9d9d9;
        overflow: hidden;
        .picture{
          width: rem(130);
          height: rem(130);
          overflow: hidden;
          float: left;
          text-align: center;
          margin-right: rem(30);
          // img{
          //   width: auto;
          //   height: 100%;
          // }
        }
        // dl{
        //   width: rem(460);
        //   overflow: hidden;
        //   float: left;
        // }
        // dt{
        //   width: rem(440);
        //   overflow: hidden;
        //   text-overflow: ellipsis;
        //   white-space: nowrap;
        //   font-size: rem(28);
        //   color: #222;
        //   background: red;
        //   margin-bottom: rem(26);
        // }
        dd{
          position:absolute;
          //bottom: rem(60);
          margin-top: rem(85);
          font-size: rem(24);
          color: #666;
        }
      }
      .pr{
        float: right;
        font-size: rem(28);
      }
      .badge-list{
        font-size: rem(28);
        color: #666;
        padding: 0;
        em{
          font-style: normal;
          color: #F76260;
        }
      }
      .editbtn{
        padding: rem(20) rem(30);
        text-align: right;
        button{
          color: #4B4B64;
          font-size: rem(26);
          padding: rem(10) rem(24);
          border: 1px solid #66667B;
          border-radius: rem(5);
          background: #fff;
          display: inline-block;
          margin: 0 rem(24) 0 0;
        }
        .red{
          color: #F76260;
          border:1px solid #F76260;
        }
      }
    }
    .dlDefaule{
      width: rem(520);
      overflow: hidden;
      float: left;
    }
    .dl1{
     width: auto;
    }
    .dtDefaule{
      position:absolute;
      width: rem(500);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: rem(28);
      color: #222;
      //background: red;
      margin-bottom: rem(26);
    }
    .dtCenter{
      width: auto;
      height: rem(100);
      padding: rem(20) 0;
      //background: green;
      white-space: normal;
      text-overflow: normal;
    }
    .order-product1{
      padding-left: rem(1);
    }

    .arrow-back{
      color: #999;
    }
    .left-box{
      margin: 0 rem(40) 0 0;
    }
    .right-box{
      @include flex(1);
      @include display(flex);
      @include align-items(center);
      @include justify-content(space-between);
      height: 100%;
      .right-l{
        @include flex(1);
        padding-right: rem(20);
        color: #B2B2B2;
        input{
          width: 100%;
          border: none;
          outline: none;
        }
      }
      .right-r{
        @include flex(1);
        padding-right: rem(0);
        color: #B2B2B2;
        text-align: right;
      }
      .arrow-back{
        color: #C7C7CC!important;
        line-height: 1;
      }
      .red{
        color: #F76260;
      }
    }
</style>
