<style lang="scss" src="src/sass/goodinset.scss" scoped></style>
<style lang="scss" scoped>
  bl-button:active {
    opacity: 0.6
  }
</style>
<template>
  <!--<div slot="title">登录</div>-->
  <div>
    <!--<div style="background-color: black;height: 64px;"></div>-->
    <div style="height: 64px;"></div>

    <div style="height: 24px ;width: 240px;left: 67px;top: 114px;
      font-size:24px;color:#263238;font-family:PingFang-SC-Regular;margin: 48px auto;">欢迎进入O2O商家版</div>
    <div>
      <bl-comli>
          <div slot='left-text' class="left-box">手机号</div>
          <div slot='right-text' class="right-box">
            <div class="right-l">
              <input type="number" v-model.trim="item.loginName" placeholder="请输入手机号">
            </div>
          </div>
      </bl-comli>
      <bl-comli>
          <div slot='left-text' class="left-box">密码</div>
          <div slot='right-text' class="right-box">
            <div class="right-l">
              <input type="password" v-model.trim="item.pwd" placeholder="请输入密码">
            </div>
          </div>
      </bl-comli>
      <br>
      <div class="comit-btn" v-if="!$utillib.isPRD()">
        <bl-button @click="loginVisible = true">选择登录账号</bl-button>
      </div>
      <div class="comit-btn">
        <bl-button @click="onSubmit">登 录</bl-button>
      </div>

      <!-- 隐藏UI -->
      <mt-popup v-model="loginVisible" position="bottom" style="width: 100%;">
        <BlCustPicker show-toolbar @cancel="onCancel" @done="onDone">
          <mt-picker ref="myPicker" :slots="slots" slot="content"></mt-picker>
        </BlCustPicker>
      </mt-popup>


      <!-- 常用登录账号选项 -->
      <!--<bl-LoginActionSheet :actions="loginActions" v-model="loginVisible" cancelText="" @thisValue="getVal"></bl-LoginActionSheet>-->
      <!--<mt-actionsheet-->
        <!-- :actions="actions" -->
        <!--v-model="sheetVisible">-->
      <!--</mt-actionsheet>-->
      <!--<div v-if="loginVisible"><div class="modal-bg" @click="loginVisible=false"></div></div>-->
    </div>
</div>
</template>
<script>
import uiMixin from 'src/mixins/uiMixin';
import { Popup, Picker, MessageBox } from 'mint-ui';
import md5 from 'js-md5';

const telRE = /^1[34578]\d{9}$/

export default {

  name: 'login',

  components: {
    'BlLoginActionSheet': () => System.import('components/cloud-merchant/login-action-sheet'),
    'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker'),
  },
  mixins: [uiMixin],

  data () {
    return {
      loginVisible: false,
      loginActions: [
        {
          name: '新秀丽-店长 sit',
          number: '13917812199',
          key: 'bl345678',
        },
        {
          name: '停车测试商户sit',
          number: '13671679931',
          key: 'xh123456',
        },
        {
          name: '凯撒皮具-店长 sit',
          number: '15202182963',
          key: 'fsj123456',
        },
        {
          name: '避风塘-店长',
          number: '13022163206',
          key: 'bl345678',
        },
        {
          name: '淑女屋-店长',
          number: '17602106018',
          key: 'bl123456',
        },
        {
          name: '淑女屋-店员',
          number: '18521561107',
          key: 'bl345678',
        },
        {
          name: '三叶草-店长 （PRE）',
          number: '13916801082',
          key: 'bl345678',
        },
        {
          name: '菲斯乐-店长 （PRE）',
          number: '18651078812',
          key: 'bl345678',
        },
        {
          name: '登喜路-店长 （PRE）',
          number: '18516122176',
          key: 'Yd123456',
        },
      ],
      popupVisible: false,
      item: {
        loginName: '', // 店长
        pwd: '',
        deviceId: '' // 设备Id
      }
    }
  },
  mounted() {
    let loginName = this.$utillib.storageGet('loginName')
    console.log('login mounted :', loginName);
    if (loginName != '' && loginName != null) {
      this.item.loginName = loginName
    }
  },
  methods: {
    /**
     * 取消
     */
    onCancel() {
      this.loginVisible = false;
    },
    /**
     * 选择
     */
    onDone() {
      this.loginVisible = false;
      let name = this.$refs.myPicker.getValues(0)[0];
      console.log('picker', name);
      let obj = this.$_.findWhere(this.loginActions, {name})

      this.item.pwd = obj.key;
      this.item.loginName = obj.number
    },

    getDeviceId(callback) {
      console.log('获取设备号')
      this.$jsbridgelib.bridgeGetDeviceInfo((err, obj) => {
        if (err) {
          return callback(null, 'browser')
        }
        if (obj) {
          return callback(null, obj.deviceId)
        }
      })
    },
    valiParam() {
      // 弹出提示
      if (!this.validation.pwd) {
        this.$toast("密码不能为空", "text")
        return false;
      }
      if (!this.validation.loginName) {
        this.$toast("请输入正确的手机号", "text")
        return false;
      }
      // 合法性校验
      if (!this.isValid) {
        console.log('回去重写')
        return false;
      }

      return true;
    },

    onSubmit () {
      // 校验参数
      if (!this.valiParam()) {
        return
      }
      // this.startLoading()
      this.getDeviceId((err, obj) => {
        if (err) {

        }

        if (obj) {
          this.deviceId = obj
//          console.log('设备号：', this.deviceId)
          let mobile = this.item.loginName;
          let password = md5(this.item.pwd); // md5加密
          let deviceNumber = this.deviceId;

          this.$merchantlib.login(mobile, password, deviceNumber, err => {
            if (err) {
              return this.$toast(err)
            }

            //登录 IM
            this.$jsbridgelib.bridgeIMLogin((err) => {
              if (err) {
                return console.log('登录 IM 失败', err);
              }
              window.dispatchEvent(new Event("IMLoginFinish"));
            });
            // 跳转页面
            console.log("用户已登录 && 用户身份标识为 :", this.$merchantlib.getRoleId(), this.$merchantlib.getRoleName())

            // 记住帐号 2017/6/30
            this.$utillib.storageSet('loginName', this.item.loginName)

            // 登陆成功 查询权限表
            this.$accesslib.updateAccessList((err, obj) => {
              if (err) { console.log('失败的回调', err) }
              if (obj) { console.log('成功的回调', obj) }
              this.$router.push({name: '2'});
            });
          });
        }
      })
    },
  },
  computed: {
    validation () {
      return {
        loginName: telRE.test(this.item.loginName),
        pwd: !!this.item.pwd.trim(),
      }
    },
    isValid () {
      const validation = this.validation;
      return Object.keys(validation).every(key => validation[key])
    },
    /**
     *
     * 萃取loginActions中name属性值，返回一个数组
     */
    slots() {
      return [{values: this.$_.pluck(this.loginActions, 'name')}]
    },

  },
};

</script>
