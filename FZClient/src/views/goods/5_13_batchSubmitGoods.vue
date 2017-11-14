<style lang="scss" src="src/sass/batchauditgoods.scss" scoped></style>
<template>
  <div class="content">
    <!---->
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <!-- <div slot="title" @click="popup = !popup">草稿箱<i></i></div> -->
      <div slot="title" >草稿箱</div>
      <i slot="right-button" class="icon iconfont more-v" @click="rightmenu()"></i>
    </bl-bar>

    <!--顶部下拉 Nav Menu-->
    <!-- <bl-popup v-model="popup" position="top" style="width: 100%;">
        <bl-top-menu></bl-top-menu>
    </bl-popup> -->

    <!-- 右侧弹层 -->
    <!-- <bl-popup v-model="menulist" position="right" class="menulist" >
        <bl-right-menu  ref="rightmenu" v-on:child-say="listenToMyBoy"></bl-right-menu>
    </bl-popup>
     -->
    <div class="batch-list">
        <ul>
            <li v-for="(item, index) in goodsList">
                <bl-mbatch-card :itemData="item">
                    <span slot="check" class="checkicon" :class="item.state" @click="chooseAttr(index,item)">
                        <i></i>
                    </span>
                </bl-mbatch-card>
            </li>
        </ul>
    </div>

    <div class="editbarex">
      <span class="checkicon" :class="{check: isAllCheck}"  @click="allCheck()">
          <i></i>全选
      </span>
      <div>
          <bl-button :disabled="!disabled" class="ok2" @click='btn_ok()'>提交审核</bl-button>
      </div>
    </div>

  </div>

</template>

<script>
// import utils from 'src/utils';
import networklib from 'src/libs/networklib';
import merchantlib from 'src/libs/merchantlib';
import uiMixin from 'src/mixins/uiMixin';

export default {
  name: 'batchSubmitGoods',
  components: {
    // 'BlBatchCard': () => System.import('components/cloud-merchant/batch-card'),
    'BlMbatchCard': () => System.import('components/cloud-merchant/mbatch-card'),
    'BlTopMenu': () => System.import('components/cloud-merchant/top-menu'),
    'BlRightMenu': () => System.import('components/cloud-merchant/right-menu')
  },
  mixins: [ uiMixin ],

  data () {
    return {
      popup: false,
      isAllCheck: false,
      menulist: false,
      merchantId: null,
      goodsList: [],

      queryParam: {
        merchantId: null,
        goodsState: 0, // 查询草稿箱
        pageNo: 1,
        pageSize: 999,
      },

      goodsAuditParam: {
        auditState: 1, // 提审
        merchantId: null,
        auditNote: '提交审核',
        goodsIdList: [],
        memberId: null,
      },
      selectNum: 0,

    }
  },

  created() {
    console.log('created')
    this.goodsAuditParam.goodsIdList = []
    this.goodsAuditParam.memberId = merchantlib.getMemberId();
    this.queryParam.merchantId = merchantlib.getMerchantId()
    this.goodsAuditParam.merchantId = merchantlib.getMerchantId()

    let self = this
    this.findGoodsByState(function(err) {
      if (err) {
        self.$toast(err)
      }
    })
  },
  methods: {

    btn_ok: function () { // 审核通过并上架
      console.log('提交审核');

      let self = this
      this.goodsList.forEach(function(item) {
        if (item.state == "check") {
          console.log('选中的商品Id：' + item.goodsId);
          self.goodsAuditParam.goodsIdList.push(item.goodsId)
        }
      })

      self.$modal({
        content: '您确定要将所选商品提交审核？',
        buttons: [
          {
            text: '取消',
            onClick: function () {}
          }, // 返回商品库
          {
            text: '确认提交',
            onClick: function () {
              self.goodsAudit(function(err) {
                if (err) {
                  self.$toast({
                    message: '操作失败:' + err,
                  });
                }
                self.$router.push({name: '5.8'});
              });
            }
          }
        ]
      });
    },

    chooseAttr(index, item) { // 选中
      console.log('选中item', item)
      let state = item.state;
      if (state == "check") {
        item.state = ""
        this.selectNum --
      } else {
        item.state = "check"
        this.selectNum ++
      }
      if (this.selectNum == this.goodsList.length) {
        this.isAllCheck = true
      } else {
        this.isAllCheck = false
      }
      console.log('选中:', index, '货号:', item.freightNo, '状态:', item.state);
    },

    allCheck() { // 全选
      let check = this.isAllCheck;
      if (check == false) {
        this.isAllCheck = true
        this.goodsList.forEach((item) => {
          item.state = "check"
          this.selectNum ++
        })
      } else {
        this.isAllCheck = false
        this.goodsList.forEach((item) => {
          item.state = ""
          this.selectNum --
        })
      }
    },

    rightmenu() {
      this.menulist = true;
      this.$refs.rightmenu.open();
    },

    listenToMyBoy(data) {
      this.menulist = data;
    },

    // 1011-查询商品列表
    findGoodsByState(callback) {
      console.log('查询商品列表', this.queryParam)
      this.startLoading();
      let apiId = '1011';
      networklib.post(apiId, this.queryParam).then((obj) => {
        this.stopLoading();
        console.log('成功的回调', obj);

        let arrs = obj.list;
        arrs.forEach(function(item) {
          // console.log('item', item)
          item.state = ""
        })
        this.goodsList = arrs;
        callback()
      }).catch(err => {
        this.stopLoading();
        console.log('失败的回调', apiId, err);
        callback(err)
      })
    },

    // 1002-商品审核接口
    goodsAudit: function (callback) {
      console.log('商品审核接口入参：', this.goodsAuditParam)
      let apiId = '1002';
      networklib.post(apiId, this.goodsAuditParam).then((obj) => {
        console.log('成功的回调', obj);
        this.item = obj;
        callback()
      }).catch(err => {
        console.log('失败的回调', apiId, err);
        callback(err)
      })
    },

  },
  computed: {
    disabled () {
      if (this.selectNum > 0) {
        return true
      } else {
        return false
      }
    }
  }

}
</script>
