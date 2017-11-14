<style lang="scss" src="src/sass/issueCoupons.scss" scoped></style>
<template>
  <div class="content">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"></div>
          <!-- <i class="fback">返回</i> -->
        </div>
        <div slot="title">店员注册审核</div>
    </bl-bar>

    <div class="content">
      <bl-navbar v-model="selected" :fixed="true">
        <bl-tab-item id="0">待审核</bl-tab-item>
        <bl-tab-item id="2">审核不通过</bl-tab-item>
      </bl-navbar>
        <!-- tab-content -->
      <bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-record>
        <bl-tab-container v-model="selected">
          <!-- 动态载入一栏页面 -->
          <bl-tab-container-item :id="selected" >
            <!-- part -->
            <div class="issue-box" style="margin: 0;" v-for="item in memberData" >
              <bl-check-box class="check-content">
                <div slot="check-box" class="checkbox"  @click="toRegisterMessageDetail(item)">
                  <div class="check-card check-cardclerk check-pic">
                    <div class="pictureclerk picture-radius">
                     <img :src="item.avatarUrl" v-if="item.avatarUrl"></img>
                      <img src="../../sass/base64/u.png"  v-else></img>
                    </div>
                    <dl>
                      <dt>{{ item.name}}</dt>
                      <dd><div v-if="selected==0">提交时间: {{ item.submitAt }}</div><div v-if="selected==2">理由: {{ item.denyReason }}</div></dd>
                      <!-- <dd v-if="selected==2">理由：{{ item.denyReason }}</dd> -->
                    </dl>
                    <div class="divStyle">
                      <div class="aaa">
                           <div class="iconfont arrow-back"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </bl-check-box>
            </div>

            <div class="order-box" v-if="display">
              <img src="static/images/Rectangle37@2x.png" class="nodata">
            </div>
          </bl-tab-container-item>
        </bl-tab-container>
      </bl-scroll>
    </div>
  </div>

</template>

<script>
  import uiMixin from 'src/mixins/uiMixin';
  export default {
    name: 'keepAllOrders',
    components: {
      'BlCheckBox': () => System.import('components/cloud-merchant/check-box')
    },
    mixins: [uiMixin],

    data () {
      return {
        selected: '0',
        display: false,
        count: 0,
        totalPage: 0,
        orderState: '0',
        memberData: [],
        item: {},
        queryParam: {
          pageNo: 1,
          pageSize: 10,
          type: 0
        },
        tabItemData: [
          {
            index: '0',
            text: '待审核'
          },
          {
            index: '01',
            text: '审核不通过'
          },
        ],
        datas: [
          {
            url: 'static/images/p6_02.png',
            title: '欧阳峰',
            time: '2017-11-01 11:00:00'
          },
          {
            url: 'static/images/p6_02.png',
            title: '郭靖',
            time: '2017-11-01 11:00:00'
          },
          {
            url: 'static/images/p6_02.png',
            title: '上官敏儿',
            time: '2017-11-01 11:00:00'
          },
          {
            url: 'static/images/p6_02.png',
            title: '黄蓉',
            time: '2017-11-01 11:00:00'
          },
        ]
      }
    },

    activated() {
      document.body.scrollTop = 0
      // 可以用orderState作为入参来指定初始化那个tab
      console.log('订单列表 params', JSON.stringify(this.$route.params));
      let type = this.$route.params.type
      if (type) {
        console.log('从九宫格进入有orderState设置orderstate', type, this.selected);
        this.id = this.selected;
        this.queryParam.type = type
      } else {
        console.log('this.id:=========' + this.id);
        this.initialize()
        this.updateData();
      }
    },
    methods: {
      /**
       * 初始化数据
       */
      initialize () {
        this.memberData = [] // 清空数据
        this.pageNo = 1 // 默认查询第一页
      },
      /**
       * 下拉刷新
       */
      onRefresh (done) {
//        console.log('refresh 下拉刷新')
        this.initialize()
        this.updateData(done);
      },
      /** 上拉更多
       */
      onInfinite (done) {
        this.pageNo ++
        this.updateData(done);
      },
      /**
       * 更新数据
       * UI + Data
       */
      updateData(done) {
        this.startLoading()
        console.log('查询this.selected ', this.selected);
        //
        this.$merchantlib.findMemberAuditList(this.queryParam, (err, obj) => {
          this.stopLoading()
          if (done) {
            done()
          }

          if (err) {
            return this.$toast(err)
          }
          // 没有数据
          this.totalPage = obj.totalPage;
          this.memberData = this.memberData.concat(obj.employeelist) // 追加数据
          console.log('审核列表=========== memberData:', JSON.stringify(this.memberData))
          // 当数据为空时显示图片
          if (this.memberData.length <= 0) {
            this.display = true
          } else {
            this.display = false
          }
        })
      },
      toRegisterMessageDetail(item) {
        this.$router.push({name: '11.2.1', query: {id: item.memberId}})
      }
    },
    watch: {
      selected: function (newVal) {
        //修改了tab之后，数据重新刷新
        console.log('tab:', newVal)
        this.queryParam.type = newVal
        this.initialize()
        this.updateData();
      },

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
