<!--  
  item: 商品  
  back: 回退  
  canel: 取消回退 
  text: placeholder  
-->
<template>
    <div class="searchcontent">
        <slot name="back" v-if="back">
            <div class="iconfont arrow-back"></div>
        </slot>

        <div class="searchbody" :class="{'canelbox': canel, 'backbox': back}">
            <div class="searchtip" v-if="item">
              <span @click="menu = !menu">{{ tip }} <i class="iconfont arrow-back"></i></span>
              <transition name="fade">
                <div class="openmenu" v-show="menu">
                  <ul>
                    <li v-for="(item, index) in data" @click="tabmenu(item, index)"><img :src="item.url"> <span>{{ item.name }}</span></li>
                  </ul>
                  <i class="itop"></i>
                  <em></em>
                </div>
              </transition>
            </div>
            <div class="searchbox">
                <input type="text" :placeholder="text" @keyup="del = true" ref="init">
                <i class="del" v-show="del" @click="clear"></i>
            </div>
        </div>
        <span class="canel" v-if="canel">取消</span>

    </div>
</template>
<script>

export default {

  name: 'search',
  props: {
    back: {
      type: Boolean,
      default: false
    },
    item: {
      type: Boolean,
      default: false
    },
    canel: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: '输入商品名称/货号'
    }
  },
  data () {
    return {
      menu: false,
      del: false,
      tip: '商品',
      data: [
        {name: '订单', url: 'static/images/so_01.png'},
        {name: '售后单', url: 'static/images/so_02.png'}
      ]
    }
  },
  methods: {
    clear() {
      this.$refs.init.value = ''
      this.del = false
    },
    tabmenu(item, index) {
      let t = this.tip
      this.tip = item.name
      item.name = t
      this.menu = false
    }
  },
  computed: {

  }
};
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .searchcontent{
    .arrow-back{
      float: left;
      font-size: rem(36);
      line-height: rem(60);
      width: rem(56);
    }
    background: #EFEFF4;
    padding: rem(12) rem(16) rem(20) rem(16);
    height: rem(88);
    border-bottom: 1px solid #d9d9d9;
    .searchbody{
      background: #fff;
      border: 1px solid #E6E6EA;
      border-radius: rem(10);
      .searchtip{
        float: left;
        /* width: rem(200); */
        height: rem(56);
        line-height: rem(60);
        color: #000;
        border-right: 1px solid #E6E6EA;
        padding: 0 rem(20) 0 rem(30);
        position: relative;
        img{
          width: rem(44);
          height: rem(46);
          margin: 0 0 0 rem(40);
        }
        .openmenu{
          width: rem(240);
          height: rem(176);
          position: absolute;
          left: 0;
          top: rem(65);
          border-radius: rem(10);
          z-index: 999;
          ul{
            position: absolute;
            z-index: 2;
            li{
              width: rem(240);
              height: rem(88);
              border-bottom: 1px solid #4a4a4c;
              line-height: rem(88);
              color: #fff;
              font-size: rem(26);
            }
            li:last-child{
              border: 0;
            }
            span{
              padding: 0 rem(20);
            }
          }
        }
        .itop{
          border: 10px solid transparent;
          border-left-color: #000;
          width: 0;
          height: 0;
          position: absolute;
          top: -20px;
          left: rem(40);
          opacity: 0.65; 
        }
        em{
          width: rem(240);
          height: rem(176);
          position: absolute;
          background: #000;
          opacity: 0.65;
          border-radius: rem(10);
        }
        i{
          font-size: rem(24);
          color: #c7c7c7;
          float: right;
          @include transform(rotate(270deg));
          width: rem(40);
          height: rem(40);
        }
      }
    }
    .searchbox{
      overflow: hidden;
      height: rem(56);
      background: url("../../sass/base64/search.png") no-repeat .2rem center;
      background-size: rem(26) rem(28);
      padding: 0 0 0 rem(60);
      position: relative;
      input{
        height: rem(56);
        width: 90%;
        border: none;
      }
      .del{
        width: rem(26);
        height: rem(26);
        position: absolute;
        right: rem(20);
        top: rem(15);
        background: url("../../sass/base64/delete3.png") no-repeat center;
        background-size: 100%;
      }
    }
    .canelbox{
      width: 86%;
      float: left;
      .searchbox{
        width: 86%;
        float: left;
      }
    }
    .canel{
      color: #666;
      line-height: rem(60);
      padding: 0 rem(15) 0 0;
      float: right;
    }
    .backbox{
      overflow: hidden;
      .searchbox{
        width: 86%;
        float: left;
      }
    }
  }

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0;
}

</style>
