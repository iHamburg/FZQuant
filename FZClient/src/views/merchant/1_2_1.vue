<style lang="scss" src="src/sass/user.scss" scoped></style>
<template>
    <div class="user-content">
      <bl-bar barStyle="bar-dark-linear">
          <div class="button" slot="left-button" @click="onBack">
            <div class="iconfont arrow-back"><i class="fback">返回</i></div>
          </div>
          <div slot="title">完善商户信息</div>
      </bl-bar>

      <div class="logininfo">

          <bl-comli>
              <div slot='left-text' class="left-box">所属门店</div>
              <div slot='right-text' class="right-box" @click="storeVisible = !storeVisible">
                  <div class="right-r">{{ store }}</div>
                  <div class="iconfont arrow-back"></div>
              </div>
          </bl-comli>
          <bl-comli>
              <div slot='left-text' class="left-box">所属商户</div>
              <div slot='right-text' class="right-box" @click="isVisible">
                  <div class="right-r">{{ shop }}</div>
                  <div class="iconfont arrow-back"></div>
              </div>
          </bl-comli>

          <bl-comli class="top">
            <div slot='left-text' class="left-box">姓名</div>
            <div slot='right-text' class="right-box">
                <div class="right-r"><input type="text" placeholder="请填写真实姓名" v-model="name" maxlength="30"></div>
            </div>
          </bl-comli>
          <bl-comli>
            <div slot='left-text' class="left-box">工号</div>
            <div slot='right-text' class="right-box">
                <div class="right-r"><input type="text" placeholder="请填写您在该商户的员工号" v-model="noid" maxlength="10"></div>
            </div>
          </bl-comli>

          <bl-comli class="top">
              <div slot='left-text' class="left-box">角色</div>
              <div slot='right-text' class="right-box" @click="sheetVisible = !sheetVisible">
                  <div class="right-r">{{ role }}</div>
                  <div class="iconfont arrow-back"></div>
              </div>
          </bl-comli>

          <bl-button class="submit" :disabled="!disabled" @click="submit">提交审核</bl-button>

      </div>

      <mt-popup v-model="storeVisible" position="bottom" style="width: 100%;">
          <bl-action-sheet :actions="storeList" v-model="storeVisible" @thisValue="storeVal"></bl-action-sheet>
      </mt-popup>
      <mt-popup v-model="merchantVisible" position="bottom" style="width: 100%;">
          <BlCustPicker show-toolbar @cancel="onCancel" @done="onDone">
              <mt-picker ref="myPicker" :slots="slots" slot="content"></mt-picker>
          </BlCustPicker>
      </mt-popup>
<!-- 
      <mt-popup v-model="merchantVisible" position="bottom" style="width: 100%;">
          <bl-action-sheet :actions="merchantList" v-model="merchantVisible" @thisValue="shopVal"></bl-action-sheet>
      </mt-popup> -->

      <mt-popup v-model="sheetVisible" position="bottom" style="width: 100%;">
          <bl-action-sheet :actions="actions" v-model="sheetVisible" @thisValue="returnVal"></bl-action-sheet>
      </mt-popup>

    </div>
</template>

<script type="text/babel">
  export default {
    name: 'userLogin',
    components: {
      'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker'),
      'BlActionSheet': () => System.import('components/bl-cloudstore-merchant/bl-action-sheet')
    },
    data () {
      return {
        sheetVisible: false,
        test: false,
        storeVisible: false,
        merchantVisible: false,
        store: '请选择',
        shop: '请选择',
        storeList: [],
        merchantList: [],
        name: '',
        noid: '',
        role: '请选择',
        perfectInfoParam: {
          commercialCode: null,
          jobNumber: null,
          memberId: null,
          merchantId: null,
          merchantName: null,
          name: null,
          roleId: null,
          roleName: null,
          storeCode: null,
          storeName: null,
        },
        actions: [{
          name: '店长',
          key: '0'
        }, {
          name: '店员',
          key: '1'
        }]
      }
    },
    mounted() {
      this.perfectInfoParam.memberId = this.$route.params.memberId;
      this.findSignMerchant();
      this.findMerchantRole();
    },
    methods: {
      onCancel() {
        this.merchantVisible = false;
      },
      onDone() {
        console.log("选择。。。。");
        this.merchantVisible = false;
        let name = this.$refs.myPicker.getValues(0)[0];
        console.log('picker======', name);
        let item = this.$_.findWhere(this.merchantList, {name});
        this.perfectInfoParam.merchantName = item.shopName;
        this.perfectInfoParam.merchantId = item.merchantId;
        this.shop = item.shopName;
      },
      returnVal(item) {
        this.perfectInfoParam.roleId = item.roleId;
        this.perfectInfoParam.roleName = item.roleName;
        this.role = item.roleName
      },
      storeVal(item) {
        //alert(item);
        this.perfectInfoParam.storeCode = item.storeCode;
        this.perfectInfoParam.storeName = item.storeName;
        this.perfectInfoParam.commercialCode = item.bizTypeCode;
        this.store = item.storeName;
        this.merchantList = item.shopList;
        this.merchantList.forEach((item) => {
          item.name = item.shopName;
        })
        this.perfectInfoParam.merchantName = '';
        this.perfectInfoParam.merchantId = '';
        this.shop = '请选择';
      },
      shopVal(item) {
        //alert(item);
        this.perfectInfoParam.merchantName = item.shopName;
        this.perfectInfoParam.merchantId = item.merchantId;
        this.shop = item.shopName;
      },
      isVisible() {
        if (this.merchantList.length > 0) {
          this.merchantVisible = !this.merchantVisible;
        } else {
          this.$toast("请先选择所属门店")
        }
      },
      onBack() {
        let self = this
        this.$modal({
          content: '您确定要离开吗？若离开，已输入的内容将丢失。',
          buttons: [
            {text: '取消', onClick: function () {}},
            {text: '确定离开',
              onClick: function () {
                self.$router.go(-1)
              }}
          ]
        });
      },
      findMerchantRole() {
        this.$merchantlib.findMerchantRole((err, obj) => {
          if (err) {
            return this.$toast(err)
          }
          this.actions = obj.list;
          this.actions.forEach((item) => {
            item.name = item.roleName;
          })
          console.log('1.2.1 findSignMerchant', JSON.stringify(this.storeList));
        })
      },
      findSignMerchant() {
        this.$merchantlib.findSignMerchant((err, obj) => {
          if (err) {
            return this.$toast(err)
          }
          this.storeList = obj.storeList;
          this.storeList.forEach((item) => {
            item.name = item.storeName;
          })
          console.log('1.2.1 findSignMerchant', JSON.stringify(this.storeList));
        })
      },
      submit() {
        if (this.validationData()) {
          this.perfectInfoParam.name = this.name;
          this.perfectInfoParam.jobNumber = this.noid;
          //1053
          console.log('1.2.1 findSignMerchant', JSON.stringify(this.perfectInfoParam));
          this.$merchantlib.addMemberAllInfo(this.perfectInfoParam, (err, obj) => {
            if (err) {
              return this.$toast(err)
            }
            this.$toast("操作成功");
            //跳转登录页！！
            this.$router.push({name: '1'})
          })
        }
      },
      validationData() {
        if (this.store == '请选择') {
          this.$toast("请选择所属门店");
          return false;
        }
        if (this.shop == '请选择') {
          this.$toast("请选择所属商户");
          return false;
        }
        if (this.name.length == 0) {
          this.$toast("请输入姓名");
          return false;
        } else {
          //console.log(this.name + "姓名中是否有数字=======" + /^([\u4e00-\u9fa5]|[A-Za-z])+$/.test(this.name));
          if (!/^([\u4e00-\u9fa5]|[A-Za-z])+$/.test(this.name)) {
            this.$toast("姓名中不能含有数字")
            return false;
          }
        }
        if (this.shop == '请选择') {
          this.$toast("请选择角色");
          return false;
        }
        if (this.noid.length == 0) {
          this.$toast("请输入工号");
          return false;
        }
        return true;
      },
    },
    computed: {
      disabled () {
        return this.role != '请选择' && this.shop != '请选择' && this.merchant != '请选择' && this.name != '' && this.noid != ''
      },
      slots() {
        return [{values: this.$_.pluck(this.merchantList, 'name')}]
      },
    }
  }
</script>
