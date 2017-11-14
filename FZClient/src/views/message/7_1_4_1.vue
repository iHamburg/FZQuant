<style lang="scss" src="src/sass/contacts.scss" scoped></style>
<template>
  <div class="contacts">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">详细资料</div>
        <!--<i slot="right-button" class="icon iconfont more-v" v-if="pageType != 2"></i>-->
    </bl-bar>

    <div class="people">
        <em><img :src="data.avatarUrl"></img></em>
        <h1>{{data.nickName}}</h1>
         <p v-if="pageType == 2">注册时间：{{data.registerAt}}</p>
    </div>
    <div v-if="pageType == 2">
      <bl-comli class="uset">
        <div slot='left-text' class="left-box">账号角色</div>
        <div slot='right-text' class="right-box">
          <div class="right-r">{{data.roleName}}</div>
        </div>
      </bl-comli>
      <bl-comli class="uset">
        <div slot='left-text' class="left-box">员工编号</div>
        <div slot='right-text' class="right-box">
          <div class="right-r">{{data.jobNumber}}</div>
        </div>
      </bl-comli>
      <bl-comli class="uset">
        <div slot='left-text' class="left-box">百联通账号(手机号)</div>
        <div slot='right-text' class="right-box">
          <div class="right-r">{{data.mobile}}</div>
        </div>
      </bl-comli>
    </div>

    <bl-button class="message" @click='clickedBottombtn()' v-if="botttonState">{{bottonText}}</bl-button>


    <mt-popup v-model="setName" position="bottom" style="width: 100%;">
        <bl-cust-picker  show-toolbar @cancel="cancel" @getValues="getValues" :toolbarSubText="toolbarSubText">
            <div slot="content" class="setname">
              <input type="text" name="name" placeholder="备注名上限12个字" ref="name">
            </div>
        </bl-cust-picker>
    </mt-popup>

  </div>
</template>

<script>
export default {
  name: 'contacts',
  components: {
    'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker')
  },
  mounted() {
    console.log('mounted');
    if (this.$route.params.type) {
      this.pageType = this.$route.params.type;
    }
    if (this.pageType == '1') {
      this.bottonText = '发送消息';
      if (this.$route.params.customerId) {
        this.queryParam.customerId = this.$route.params.customerId;
        this.findContacts();
      }
    } else if (this.pageType == '2') {
      this.bottonText = '注销此账号';
      this.memberId1 = this.$route.params.memberId;
      this.findClerkInfoDetail();
    }
  },
  data () {
    return {
      setName: false,
      toolbarSubText: '设置备注名',
      pageType: '1',  //1.扫c端进入页面，2。为查看员工信息页面
      memberId1: '', // 查询的员工Id
      bottonText: '发送消息', //底部按钮展示的文案
      botttonState: true, //底部按钮是否显示， false 不显示
      queryParam: {
        customerId: ''
      },
      data: {}, // 数据
    }
  },
  computed: {
  },
  methods: {
    cancel() {
      this.setName = false;
    },
    getValues() {
      this.setName = false;
      console.log(this.$refs.name.value)
    },
    findContacts() {
      this.$merchantlib.findContacts(this.queryParam, (err, obj) => {
        if (err) {
          return this.$toast(err)
        }
        this.data = obj;
        this.avatarUrl = this.data.avatarUrl;
        console.log(JSON.stringify(this.data));
      });
    },
    findClerkInfoDetail() {
      this.$merchantlib.findClerkInfoDetail({'clerkMemberId': this.memberId1}, (err, obj) => {
        if (err) {
          this.botttonState = false;
          return this.$toast(err);
        }
        //console.log('---11 ', obj, obj.logoImg);
        this.data = obj;
        this.data.nickName = this.data.name;
        if (this.data.registerAt && this.data.registerAt.length >= 11) {
          this.data.registerAt = this.data.registerAt.substring(0, 11);
        }
        this.data.avatarUrl = this.data.logoImg;
      })
    },
    clickedBottombtn() {
      if (this.pageType == '1') {
        this.sendMessage();
      } else if (this.pageType == '2') {
        var self = this
        self.$modal({
          content: '您确定要注此账户吗？',
          buttons: [
            {text: '取消', onClick: function () {}},
            {text: '确定注销',
              onClick: function () {
                self.cancellationAccount();
              }
            }
          ]
        })
      }
    },
    sendMessage() {
     // console.log('sendMessage---- ')
      let param = {
        receiver: 'BL' + this.data.memberId,
        username: this.data.nickName
      }
      this.$jsbridgelib.bridgeNamePushIM(param, (err, obj) => {
        if (err) {
          return this.$toast('errMsg', err)
        }
        if (obj) {
          console.log('obj', obj)
        }
      });
    },
    cancellationAccount() {
      this.$merchantlib.queryCancellationAccount({'clerkMemberId': this.memberId1}, (err, obj) => {
        if (err) {
          return this.$toast(err)
        }
        this.$toast('注销成功！')
        this.botttonState = false;
        this.$router.go(-1);
      })
    },
  }
}
</script>
