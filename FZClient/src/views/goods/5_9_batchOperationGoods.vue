<style lang="scss" src="src/sass/batchauditgoods.scss" scoped></style>
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div slot="title" >{{title}}</div>
      <div class="button" slot="right-button" @click="$router.go(-1)">
        <p>取消</p>
      </div>
    </bl-bar>

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
    <div style="height: 1px;"></div>

    <div class="editbarex">
      <span class="checkicon" :class="{check: isAllCheck}"  @click="allCheck()">
          <i></i>全选
      </span>
      <div v-if="goodsState == 0">
          <bl-button :disabled="!disabled" class="ok2" @click='btn_ok()'>提交审核</bl-button>
      </div>
      <div v-else-if="goodsState == 1">
        <bl-button :disabled="!disabled" class="ok" @click="onButton('yes')">通过并上架</bl-button>
        <bl-button :disabled="!disabled" class="no" @click="onButton('no')">审核不通过</bl-button>
      </div>
      <div v-else-if="goodsState == 6 || goodsState == 7">
          <bl-button :disabled="!disabled" class="ok2" @click='btn_del()'>删除所选</bl-button>
      </div>
    </div>

  </div>

</template>

<script>
import networklib from 'src/libs/networklib';
import merchantlib from 'src/libs/merchantlib';
import uiMixin from 'src/mixins/uiMixin';

export default {
  name: 'batchOperationGoods',

  components: {
    'BlMbatchCard': () => System.import('components/cloud-merchant/mbatch-card'),
  },

  mixins: [ uiMixin ],

  data () {
    return {
      isAllCheck: false,
      goodsList: [],

      // 查询商品列表入参
      goodsState: 0, // 查询草稿箱
      pageNo: 1,
      pageSize: 999,

      selectNum: 0,
    }
  },

  created() {
    console.log('created')

    this.goodsState = this.$route.params.goodsState
    console.log('this.goodsState: ', this.goodsState)
    this.queryGoodsList()
  },
  methods: {
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

    // 查询商品列表
    queryGoodsList() {
      this.startLoading()

      let params = {
        goodsState: this.goodsState,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }

      console.log('查询商品列表 params:', JSON.stringify(params))
      this.$goodslib.queryGoodsList(params, (err, obj) => {
        this.stopLoading();
        if (err) this.$toast(err)
        if (obj) {
          // console.log('queryGoodsList: \n', JSON.stringify(obj))
          let arrs = obj;
          arrs.forEach(function(item) {
            // console.log('item', item)
            item.state = ""
          })
          this.goodsList = arrs;
        }
      })
    },

    // 批量删除
    btn_del() {
      let self = this
      this.$modal({
        content: '您确定要删除该商品？删除后商品将无法恢复！',
        buttons: [
          {
            text: '取消',
            onClick: function () {}
          },
          {
            text: '确认删除',
            onClick: function () {
              console.log('goodsIdList:', self.goodsIdList)
              let params = {
                goodsIdList: self.goodsIdList
              }
              self.$goodslib.deleteGoods(params, (err, obj) => {
                if (err) return self.$toast(err)
                self.$router.go(-1)
              })
            }
          }
        ]
      });
    },

    // 批量提审
    btn_ok() { // 审核通过并上架
      console.log('提交审核');
      let self = this
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
              let params = {
                goodsIdList: self.goodsIdList,
                auditNote: '提交审核',
                auditState: 1
              }
              self.$goodslib.goodsAudit(params, (err, obj) => {
                if (err) return self.$toast(err)
                self.$router.go(-1)
              })
            }
          }
        ]
      });
    },

    // 批量审核
    onButton(str) {
      console.log(str, this.selectNum)
      let self = this
      let content = ''
      let auditState = ''
      let auditNote = ''
      if (str == 'yes') {
        auditState = 2 // 审核通过
        content = '您确定要将所选商品通过审核并上架？'
      } else {
        auditState = 4 // 审核不通过
        auditNote = '其他问题,请与审核人确认'
        content = '您确定要将所选商品审核不通过？'
      }

      this.$modal({
        content,
        buttons: [
          {
            text: '取消',
            onClick: function () {}
          }, //返回商品库
          {
            text: '确认提交',
            onClick: function () {
              let params = {
                goodsIdList: self.goodsIdList,
                auditNote: auditNote,
                auditState: auditState
              }
              self.$goodslib.goodsAudit(params, (err, obj) => {
                if (err) return self.$toast(err)
                self.$router.go(-1)
              })
            }
          }
        ]
      });
    },

  },
  computed: {
    title() {
      let title = ''
      if (this.goodsState == '0') title = '批量提审'
      if (this.goodsState == '1') title = '批量审核'
      if (this.goodsState == '6' || this.goodsState == '7') title = '批量删除'
      return title
    },

    disabled () {
      if (this.selectNum > 0) {
        return true
      } else {
        return false
      }
    },

    goodsIdList() {
      let goodsIdList = []
      for (var i = this.goodsList.length - 1; i >= 0; i--) {
        if (this.goodsList[i].state == "check") {
          // console.log('选中的商品Id：' + this.goodsList[i].goodsId);
          goodsIdList.push(this.goodsList[i].goodsId)
        }
      }
      return goodsIdList
    },
  }

}
</script>
