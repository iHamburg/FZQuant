<!--发布活动-->
<style lang="scss" src="src/sass/issueCoupons.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">

      <div class="button" slot="left-button" @click="$router.go(-1);">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title">发布活动</div>
    </bl-bar>
    <div class="issue-box notop" >
      <bl-check-box class="check-content"  v-for="(item, index) in activityList">
            <span slot="check" v-show="isCheck" class="checkicon"  :class="item.state" @click="chooseAttr(index,item)">
                <i></i>
            </span>
        <div slot="check-box" class="checkbox">
          <div class="check-card check-pic">
            <div class="picture">
              <img :src="item.imgUrl">
            </div>
            <dl>
              <dt>{{ item.title }}</dt>
              <dd>活动期限:{{ item.beginAt }} - {{ item.endAt}}</dd>
            </dl>
          </div>
        </div>
      </bl-check-box>
    </div>
    <div style="height:1px;"></div>

    <div class="botbtn">
      <bl-button :disabled="!submitEnable" @click="submit()">发布</bl-button>
    </div>
    <bl-modal :buttons="buttons" v-if="isOK">
      <div slot="inner">
        <h4>确定要发放所选的活动</h4>
      </div>
    </bl-modal>
  </div>

</template>

<script>

  import activitylib from 'src/libs/activitylib';
  import uiMixin from 'src/mixins/uiMixin';
//  import jsbridge from 'src/mixins/jsbridge';

  export default {
    name: 'goods',
    mixins: [uiMixin],
    components: {
      'BlCheckBox': () => System.import('components/cloud-merchant/check-box')
    },
    data () {
      return {
        release: '发布上新',
        isCheck: true,
        isAllCheck: false,
        activityList: [],
        queryParam: {
          merchantId: '',
          memberId: '',
          pageNo: 1,
          pageSize: 200,
          activityState: '2',
        },
        isOK: false,
        buttons: [{
          text: '取消',
          onClick: () => {
            this.isOK = false
            // this.$toast('取消')
          }
        }, {
          text: '确定发布',
          onClick: () => {
            this.isOK = false
            this.onSubmit(this);
            // this.$toast('确定')
          }
        }],
      }
    },
    computed: {
      /**
       * 根据选中的数量，计算出是否能点击提交按钮
       * @return {boolean}
       */
      submitEnable() {
//        console.log('submit Enable',this.checkedCount);
        return this.checkedCount > 0;
      },

      /**
       * 根据goodsList中state的状态，计算出选中的数量
       * @return {*|number}
       */
      checkedCount() {
        let count = this.$_.countBy(this.activityList, function(item) {
          return item.state == "check";
        }).true || 0;

        return count;
      }
    },

    mounted() {
      this.queryActivity();

      setTimeout(function() {
        document.querySelector('.botbtn').style.position = "fixed"
      }, 500)
    },

    methods: {
      queryActivity(done) {
        this.startLoading();
        activitylib.queryActivityList(this.queryParam, (err, items) => {
          this.stopLoading();
          if (done) {
            done();
          }
          if (err) {
            return this.$toast(err);
          }
          items.activityList.forEach(item => (item.state = ""));
          this.activityList = items.activityList;
        });
      },
      onSubmit(tab) {
        console.log('on submit');
        // 获得选中的商品列表
        let itemList = tab.$_.filter(tab.activityList, (item) => { return item.state == 'check' })
        activitylib.releaseActivity(itemList[0].activityId, (err, obj) => { if (err) { return tab.$toast(err); } });
        console.log('发送 adapter的 itemlist', itemList);
        this.$router.push({title: '营销工具', name: '6'});
      },
      submit() {
        this.isOK = true;
      },
      chooseAttr(index, item) { // 选中
        let state = item.state;
        if (state === "check") {
          item.state = ""
        } else {
          item.state = "check"
        }
        for (var i = 0; i < this.activityList.length; i++) {
          if (index != i) {
            this.activityList[i].state = "";
          }
        }
      },
    }

  }
</script>
