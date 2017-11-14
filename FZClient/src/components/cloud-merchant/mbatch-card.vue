<template>
  <div>
    <div class="batch-card">
      <i class="tabicon" v-if="goods.sbool" :class="goods.style">{{goods.txt}}</i>

      <slot name="check"></slot>
      <em><img :src="goods.goodsImg"></em>
      <dl>
        <dd><h2>{{goods.goodsName}}</h2></dd>
        <dd>货号：{{goods.freightNo}}</dd>
        <dd>吊牌价：&yen;{{goods.tagPrice}}</dd>
        <dd>售价：&yen;{{goods.price}} <span  :class="{'rate':discountType, 'rate1': !discountType}" v-if="true"><i>折扣率{{goods.discount}}%</i></span></dd>
      </dl>
    </div>
  </div>

</template>



<script>
  import networklib from 'src/libs/networklib';
export default {

    name: 'batch-card',

    data () {
      return {
        //true: 大于3折的数据,
        discountType: false
      };
    },
    props: {
      itemData: Object
    },
    mounted() {

    },
    methods: {

      /**
       * 获取sku属性
       */
      getAttribute: function (callback) {
        let apiId = '1008';
        let queryParam = {goodsId: this.itemData.goodsId};
        networklib.post(apiId, queryParam).then((obj) => {
          this.selectedAttributesIdList = [];
           // 解析sku属性
          let property = obj.propertyList;
          for (var i = property.length - 1; i >= 0; i--) {
            var list = property[i].list
            for (var j = list.length - 1; j >= 0; j--) {
              var list2 = list[j].list
              for (var k = list2.length - 1; k >= 0; k--) {
                var id = list2[k].skuID
                this.selectedAttributesIdList.push(id);
              }
            }
          }

          callback(null, this.selectedAttributesIdList);
        }).catch(err => {
          console.log('失败的回调', apiId);
          callback(err);
        })
      },

    },
    computed: {
      goods: function () {
        let itemData = this.itemData
        if (itemData.goodsState == '2' && itemData.stockState == '3') { // 已上架 无货
          itemData.sbool = true
          itemData.txt = '无货'
          itemData.style = 'no-goods'
        } else if (itemData.goodsState == '2' && itemData.stockState != '3') { // 已上架 有货
          itemData.sbool = false
        } else if (itemData.goodsState == '1') { // 待审核
          itemData.sbool = true
          itemData.txt = '待审核'
          itemData.style = 'pend-goods'
        } else if (itemData.goodsState == '3') { // 已下架
          itemData.sbool = true
          itemData.txt = '已下架'
          itemData.style = 'under-goods'
        } else if (itemData.goodsState == '4') { // 审核不用过
          itemData.sbool = true
          itemData.txt = '审核不通过'
          itemData.style = 'audit-goods'
        } else { // 草稿
          itemData.sbool = true
          itemData.txt = '草稿'
          itemData.style = 'draft-goods  '
        }
        itemData.discount = Number((itemData.tagPrice - itemData.price) / itemData.tagPrice).toFixed(2);
        itemData.discount = Math.round(Number(itemData.discount * 100));
        // console.log('小数点：', itemData.discount)
        if (itemData.discount < 0) {
          itemData.discount = 0;
        }
        if (itemData.discount >= 70) {
          this.discountType = false;
        } else {
          this.discountType = true;
        }
        this.itemData = itemData;
        return this.itemData;
      },
    }
}
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .batch-card{
    padding: rem(40) 0;
    clear: both;
    border-bottom: 1px solid #d9d9d9;
    position: relative;
  em{
    width:rem(160);
    height: rem(160);
    overflow: hidden;
    float: left;
    margin:0 rem(20) 0 0;
    background: #eee;
  @include display(flex);
  @include align-items(center);
  @include justify-content(center);
  img{
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height:auto;
  }
  }
    dl{
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      font-size: 12px;
      padding: 0 rem(30) 0 0;
      dd{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        color: #888;
        h2{
          color: #000;
          font-weight: 100;
          font-size: 14px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
      }

    }
    .rate{
      background-color: #00A699;
      height: rem(30);
      color: #fff;
      text-align: center;
      padding: 0 rem(8);
      position: absolute;
      right: rem(30);
      margin: rem(5) 0 0;
      line-height: rem(30);
      overflow: hidden;
      border-radius: rem(1);

      i{

        padding:0;
        margin:0;
        font-style: normal;
        -webkit-transform: scale(0.50);
      }
    }
  .rate1{
    background-color: #F76260;
    height: rem(30);
    color: #fff;
    text-align: center;
    padding: 0 rem(8);
    position: absolute;
    right: rem(30);
    margin: rem(5) 0 0;
    line-height: rem(30);
    overflow: hidden;
    border-radius: rem(1);
    i{
      padding:0;
      margin:0;
      font-style: normal;
      -webkit-transform: scale(0.50);
    }
  }
    .checkicon{padding:0;}
    .tabicon{
      font-style: normal;
      font-size: 12px;
      position: absolute;
      left: - rem(50);
      top: rem(40);
      padding: 0 rem(15) 0 rem(35);
      color: #fff;
      border-radius: rem(5);
    }
    /* tabColor 无货/待审核/已下架/审核不通过/草稿*/
    .no-goods{
      background-color: #F68C6D;
    }
    .pend-goods{
      background-color: #00A699;
    }
    .under-goods{
      background-color: #999;
    }
    .audit-goods{
      background-color: #F76260;
    }
    .draft-goods{
      background-color: #4B4B64;
    }

  }
</style>
