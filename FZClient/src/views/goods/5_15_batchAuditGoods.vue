<style lang="scss" src="src/sass/batchauditgoods.scss" scoped></style>
<template>
  <div class="content">


    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <!-- <div slot="title" @click="popup = !popup">待审核<i></i></div> -->
      <div slot="title" >待审核</div>
      <!--<i slot="right-button" class="icon iconfont more-v" @click="rightmenu()"></i>-->
    </bl-bar>

<!--     <bl-popup v-model="popup" position="top" style="width: 100%;">
        <bl-top-menu></bl-top-menu>
    </bl-popup> -->

    <!-- <bl-popup v-model="menulist" position="right" class="menulist" >
        <bl-right-menu  ref="rightmenu" v-on:child-say="listenToMyBoy"></bl-right-menu>
    </bl-popup> -->

    <div class="batch-list">
        <ul>
            <li v-for="(item, index) in goodsList">
                <bl-mbatch-card :itemData="item">
                    <span slot="check" class="checkicon" :class="item.state" @click="chooseAttr(index, item)">
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
        <bl-button :disabled="!disabled" class="ok" @click="onButton('yes')">通过并上架</bl-button>
        <bl-button :disabled="!disabled" class="no" @click="onButton('no')">审核不通过</bl-button>
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
  name: 'batchAuditGoods',
  components: {
    'BlMbatchCard': () => System.import('components/cloud-merchant/mbatch-card'),
    'BlTopMenu': () => System.import('components/cloud-merchant/top-menu'),
    'BlRightMenu': () => System.import('components/cloud-merchant/right-menu')
  },
  data () {
    return {
      popup: false,
      isAllCheck: false,
      menulist: false,
      merchantId: null,
      goodsList: [],
      queryParam: {
        merchantId: null,
        goodsState: 1, // 查询待审核
        pageNo: 1,
        pageSize: 999,
      },

      goodsAuditParam: {
        auditState: 0, // 审核通过上架
        merchantId: null,
        auditNote: '同意上架',
        goodsIdList: [],
        memberId: null,
      },
      selectNum: 0,

    }
  },
  mixins: [ uiMixin ],
  mounted() {

  },

  created() {
    console.log('created')
    this.goodsAuditParam.goodsIdList = []

    this.queryParam.merchantId = merchantlib.getMerchantId()
    this.goodsAuditParam.merchantId = merchantlib.getMerchantId()
    this.goodsAuditParam.memberId = merchantlib.getMemberId()

    let self = this
    this.findGoodsByState(function(err) {
      if (err) {
        self.$toast(err)
      }
    })
  },

  methods: {

    onButton: function (str) {
      console.log(str, this.selectNum)
      let self = this
      let content = ''
      if (str == 'yes') {
        self.goodsAuditParam.auditState = 2
        content = '您确定要将所选商品通过审核并上架？'
      } else {
        self.goodsAuditParam.auditState = 4
        self.goodsAuditParam.auditNote = '其他问题,请与审核人确认'
        content = '您确定要将所选商品审核不通过？'
      }
      // 选中的商品
      this.goodsList.forEach(function(item) {
        if (item.state == "check") {
          console.log('选中的货号：' + item.goodsId);
          self.goodsAuditParam.goodsIdList.push(item.goodsId)
        }
      })

      self.$modal({
        content,
        buttons: [
          {
            text: '取消',
            onClick: function () {}
          }, //返回商品库
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

    // 1002-商品审核接口
    goodsAudit: function (callback) {
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

    chooseAttr(index, item) { // 选中
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
    findGoodsByState() {
      console.log('查询商品列表')
      this.startLoading();
      let apiId = '1011';
      networklib.post(apiId, this.queryParam).then((obj) => {
        this.stopLoading();
        console.log('成功的回调', obj);
        let arrs = obj.list;
        arrs.forEach(function(item) {
          item.state = ""
        })
        this.goodsList = arrs;
      }).catch(err => {
        this.stopLoading();
        console.log('失败的回调', apiId, err);
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
