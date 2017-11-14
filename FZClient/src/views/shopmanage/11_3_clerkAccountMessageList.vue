<!--<style lang="scss" src="src/sass/issueCoupons.scss" scoped></style>-->
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
        <!-- <i class="fback">返回</i> -->
      </div>
      <div slot="title">店员账号管理</div>
    </bl-bar>

    <div class="content">
      <div class="list" :class="{'nodatadDiv': showNoDataImage}">
        <ul class="rule-box" >
          <li v-for="(item, index) in datas" @click="clickedClerk(item)">
            <div>
              <i class="head"><img :src="item.avatarUrl"></i> {{ item.name }}
              <i class="iconfont arrow-back"></i>
            </div>

          </li>
        </ul>
        <div class="" v-if="showNoDataImage">
          <img src="static/images/Rectangle37@2x.png" class="nodata">
          <div class="divclass">
            <p>快去看看有没有需要审核的账号</p>
          </div>
            <bl-button class="btnclass" @click="toclerkRegisterList">查看注册信息</bl-button>
        </div>
    </div>
    </div>
  </div>

</template>

<script>
  import uiMixin from 'src/mixins/uiMixin';
  export default {
    name: 'keepClerkAccountList',
    components: {
    },
    mixins: [uiMixin],

    data () {
      return {
        item: {},
        showNoDataImage: false, //控制没有数据的图片
        datas: [
          {
            avatarUrl: 'static/images/p6_02.png',
            name: '欧阳峰',
            memberId: '100000002718509'
          },
          {
            avatarUrl: '100000002718509',
            name: '郭靖',
            memberId: '100000002718500'
          },
          {
            avatarUrl: '',
            name: '上官敏儿',
            memberId: '1000000027185090'
          },
          {
            avatarUrl: 'static/images/yy.png',
            name: '黄蓉',
            memberId: '100000002718509'
          },
        ]
      }
    },
    created() {
    },
    activated() {
      this.getClerkAccountList();
    },
    methods: {
      clickedClerk(item) {
        this.$router.push({name: '7.1.4.1', params: {type: '2', memberId: item.memberId}})
      },
      getClerkAccountList() {
        this.$merchantlib.findClerkAccountList((err, obj) => {
          if (err) {
            return this.$toast(err);
          }
          console.log('-----', obj);
          if (obj) {
            this.datas = obj;
          } else {
            this.datas = [];
          }
          if (this.datas.length == 0) {
            this.showNoDataImage = true
          } else {
            this.showNoDataImage = false
          }
        })
      },
      toclerkRegisterList() {
        this.$router.push({name: '11.2'})
      }
    },
    computed: {
      isLoading() {
        let isLoading = true;
        if (this.totalPage == 1) {
          isLoading = false
        }
        if (this.pageNo >= this.totalPage) {
          isLoading = false
        }
        return isLoading
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .content{
    padding-top: rem(44);
    height:100%;
    .list{
      padding: 0;
      overflow-y: auto;
      max-height: 100%;
      background: #fff;
      .rule-box{
        overflow: hidden;
        li{
          @include hair(bottom, #d9d9d9);
          div{
              padding: 0 0 0 rem(30);
              font-size: rem(32);
              color: #666;
              line-height: rem(110);
              .arrow-back{
                color: #aaa;
                float: right;
                line-height: rem(110);
                transform: rotate(180deg);
                margin: 0 rem(30);
              }
          }
        }
        li:active{
          @include addclickcolor();
        }
      .head{
        width: rem(70);
        height: rem(70);
        border-radius: rem(35);
        border:1px solid #aaa;
        overflow: hidden;
        background: url(../../sass/base64/u.png) no-repeat;
        background-size: 100%;
        float: left;
        margin: rem(20) rem(20) 0 0;
        img{
          width: 100%;
          display: block;
        }
      }
    }
  }
  .nodatadDiv{
    height: 100%;
  }
  .nodata {
    height:40%;
    width: 40%;
    margin-left: 30%;
    margin-top: 20%;
  }
  .btnclass {
    width: 60%;
    margin-top: 0.4rem;
  }
  .divclass{
    font-size: 13.3px;
    text-align: center;
    margin-top: 0.3rem;
    color: gray;
  }

}
</style>
