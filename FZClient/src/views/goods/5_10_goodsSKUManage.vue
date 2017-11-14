<style lang="scss" src="src/sass/commodityAttribute.scss" scoped></style>
<template>
  <div>
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
        返回
      </div>
      <div slot="title">{{title}}</div>
      <!--<div slot="right-button" class="hrad-right" @click="addSKUManage()">增加属性</div>-->
    </bl-bar>
    <div class="attribute">
      <ul>
        <li v-for="(item,index) in items"><!-- item.stockState -->
          <div class="attribute-button"  v-bind:class="{ 'on' : item.stockState }" @click="statebutton(item,index)">
            <button></button>
          </div>
          <div class="attribute-info">
            <span v-show="isHasColor(item.parentRemarks)">颜色：<i>{{seeColour(item.sonRemarks)}}</i></span>
            <span>尺码：<i>{{seeSize(item.sonRemarks)}}</i></span>
          </div>
          <div class="attribute-state">{{seeGoods(item.stockState)}}</div>
        </li>
      </ul>
    </div>
    <!--<bl-button type="primary" class="bottom-attribute-button" @click="againUpdateSKUManage()">保存</bl-button>-->
  </div>
</template>

<script>
// import utils from 'src/utils';
import networklib from 'src/libs/networklib';
import allocationbond from 'components/choose-coupons/distribution';
import uiMixin from 'src/mixins/uiMixin';

export default {
  name: 'goodsSKUManage',
  components: {
    allocationbond
  },
  data () {
    return {
      title: '商品属性',
      items: [],
    }
  },
  mixins: [ uiMixin ],
  //组件加载完成后执行.
  mounted() {
    let self = this;
    this.goodsId = this.$route.query.goodsId;
    console.log("传入的goodsId为:" + this.goodsId);
    this.querySKUManageList(function(err) {
      if (err) {
        self.$toast({
          message: '服务器载入失败:' + err,
        });
      }
    });
  },

  //方法.
  methods: {

    //1018-查询商品排列组合列表.
    querySKUManageList(callback) {
      this.startLoading();
      let apiId = '1018';
      let queryParam = {"goodsId": this.goodsId};
      console.log("查询商品属性列表入参goodsId:" + this.goodsId);
      // let self = this;
      networklib.post(apiId, queryParam).then((obj) => {
        console.log('成功的回调', obj);
        this.items = obj.groupList;
        for (var i = 0; i < this.items.length; i++) {
          let item = this.items[i]
          if (item.stockState == '1') {
            item.stockState = true
          } else {
            item.stockState = false
          }
        }
        this.stopLoading();
        callback();
      }).catch(err => {
        this.stopLoading();
        console.log('失败的回调', apiId, err);
        callback(err);
      })
    },

    //1019-更新sku库存状态.
    updateSKUManage(item, index, callback) {
      var skuId = item.id;
      var skuStatu = item.stockState;
      if (skuStatu == true) {
        skuStatu = '0';
      } else {
        skuStatu = '1';
      }
      let queryParam = {"id": skuId, "stockState": skuStatu};
      // let self = this;
      this.startLoading();
      let apiId = '1019';
      networklib.post(apiId, queryParam).then((obj) => {
        console.log('成功的回调', obj);
        this.$toast('更新SKU库存状态成功');
        //更新成功后,改变按钮样式.
        if (this.items[index].stockState == true) {
          this.items[index].stockState = false;
        } else {
          this.items[index].stockState = true;
        }
        //更新成功后,改变有货无货展示.
        let stockState = item.stockState;
        this.seeGoods(stockState);
        this.stopLoading();
        callback();
      }).catch(err => {
        this.stopLoading();
        console.log('失败的回调', apiId, err);
        callback(err);
      })
    },

    // 点击增加属性跳转.
    addSKUManage() {
      console.log('跳转到sku属性选择页面...');
      this.$toast('开发中，敬请期待');
      //this.$router.push({path: '/goodsLarge',query: {merchantId: this.item.merchantId,flag:'1' }});
    },

    //判断是否有颜色.
    isHasColor(color) {
      let colorData = null;
      let data = color
      let colorIndex = data.indexOf(",");
      if (colorIndex > 0) {
        colorData = true
      } else {
        colorData = false
      }
      return colorData
    },

     //颜色展示.
    seeColour(Things) {
      let colorData = Things;
      //取最后一个竖 | 的下表标
      let lastIndexStar = colorData.lastIndexOf('|');
      //取最后一个竖 , 的下表标
      //let lastIndexEnd  = colorData.lastIndexOf(',');
      let colorSub = colorData.substr(lastIndexStar + 1);
      return colorSub;
    },

     //尺码展示.
    seeSize(Things) {
      let sizeSub = null;
      let sizeData = Things;
      //取第一个竖 | 的下表标
      let lastIndexStar = sizeData.indexOf('|');
      //取第一个竖 , 的下表标
      let lastIndexEnd = sizeData.indexOf(',');
      if (lastIndexEnd > 0) {
        sizeSub = sizeData.substring(lastIndexStar + 1, lastIndexEnd);
      } else {
        sizeSub = sizeData.substring(lastIndexStar + 1);
      }
      return sizeSub;
    },

     //[有货/无货]状态.
    seeGoods(Things) {
      //库存状态: 0：无；1：有
      let statu = '';
      if (Things) {
        statu = '有货';
      } else {
        statu = '无货';
      }
      return statu;
    },

    //按钮[true/false].
    statebutton: function(item, index) {
      let self = this;
      this.updateSKUManage(item, index, function(err) {
        if (err) {
          self.$toast({
            message: '服务器载入失败:' + err,
          });
        }
      });
      console.log("触发事件 && 当前状态stockState为:" + this.items[index].stockState)
    }
  },

}
</script>
