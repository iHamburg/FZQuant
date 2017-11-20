<style lang="scss" src="src/sass/user.scss" scoped></style>
  <template>
      <div class="user-content write">
        <bl-bar barStyle="bar-dark-write">

            <div slot="right-button" class="hrad-right" @click="onRegister">快速注册</div>
        </bl-bar>

        <section class="user">
            <div class="user-head"><img src="static/images/yd-index.png"></div>

            <div class="unline">
              <currency-input placeholderStr="手机号" inputType="2" maxlength="11" v-model="loginName"></currency-input>
              <i class="clears" v-show="mobileClearFlag" @click="clears('loginName')"></i>
            </div class="unline">

            <div class="unline">
              <input type="password" name="password" maxlength="20" v-model.trim="pwd" placeholder="密码">
              <i class="clears pass" v-show="passwordClearFlag" @click="clears('password')"></i>
              <i class="eye" :class="{'open': isOpen}" @click="passlook"></i>
            </div>

            <!-- sit测试 -->
            <div class="comit-btn" v-if="!$utillib.isPRD()">
              <bl-button @click="loginVisible = true">选择登录账号</bl-button>
            </div>
            <!-- 隐藏UI -->
            <mt-popup v-model="loginVisible" position="bottom" style="width: 100%;">
              <BlCustPicker show-toolbar @cancel="onCancel" @done="onDone">
                <mt-picker ref="myPicker" :slots="slots" slot="content"></mt-picker>
              </BlCustPicker>
            </mt-popup>

            <bl-button class="loginbtn" @click="onSubmit" :disabled="disabled"><img src="../../sass/base64/loading.png" class="loading" v-show="loading">登 录</bl-button>

            <p>
              <span class="phone" @click="onSmsLogin">手机快速登录</span>
              <span class="forget" @click="onForgetPassword">忘记密码?</span>
            </p>
        </section>

      </div>
  </template>
<script type="text/babel">
import uiMixin from 'src/mixins/uiMixin';
import { Popup, Picker, MessageBox } from 'mint-ui';
import md5 from 'js-md5';

const telRE = /^1[34578]\d{9}$/

export default {
  name: 'userLogin',
  components: {
    'BlLoginActionSheet': () => System.import('components/cloud-merchant/login-action-sheet'),
    'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker'),
    'currency-input': () => System.import('components/currency-input'),
  },
  mixins: [uiMixin],

  data () {
    return {
      isClear: false,
      isOpen: false,
      loginVisible: false,
      loading: false,
      loginActions: [
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
          name: '新秀丽-店长 ',
          number: '17602106018',
          key: 'bl123456',
        },
        {
          name: '淑女屋-店员',
          number: '18521561107',
          key: 'bl987654321',
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

      loginName: '', // 店长
      pwd: '',
      deviceId: '' // 设备Id
    }
  },

  mounted() {
    let loginName = this.$utillib.storageGet('loginName')
    console.log('login mounted :', loginName);
    if (loginName != '' && loginName != null) {
      this.loginName = parseInt(loginName)
    }
  },

  methods: {
    /*username() {
      let init = this.$refs.username.value;
      (init.length > 0) ? (this.isClear = true) : (this.isClear = false)
    },*/
    clears(name) {
      if (name == 'loginName') {
        this.loginName = null;
        this.isClear = false
      }
      if (name == 'password') {
        this.pwd = '';
      }
    },
    passlook() {
      this.isOpen = !this.isOpen
      var password = document.querySelector('input[name=password]');
      (this.isOpen) ? (password.setAttribute("type", "text")) : (password.setAttribute("type", "password"))
    },

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

      this.pwd = obj.key;
      this.loginName = obj.number
    },

    // 点击快速注册
    onRegister() {
      this.$router.push({name: '1.2'});
    },
    // 点击手机验证码登陆
    onSmsLogin() {
      this.$router.push({name: '1.0'});
    },
    // 点击忘记密码
    onForgetPassword() {
      if (this.loginName) this.$utillib.storageSet('loginName', this.loginName)
      this.$router.push({name: '1.1'});
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
      this.loading = true
      // this.startLoading()

      let password = this.password

      this.$merchantlib.login(this.mobile, password, '', (err, obj) => {
        this.loading = false;
        if (err) {
          return this.$toast(err)
        }
        // 记住帐号 2017/6/30
        this.$utillib.storageSet('loginName', this.loginName)
        /**
         * 校验权限
         * 0：待审核 ，1审核通过，2审核不通过，-1未填信息
         */
        let auditingFlag = obj.auditingFlag;
        if (auditingFlag == 0 || auditingFlag == 2) {
          console.log('去审核结果页')
          return this.$router.push(
            { name: '1.2.2',
              query: {
                avatar: obj.avatar,
                memberId: obj.memberId,
                roleName: obj.roleName,
                auditingFlag: obj.auditingFlag,
                denyReason: obj.denyReason
              }
            }
          );
        } else if (auditingFlag == -1) {
          console.log('to 完善注册信息')
          return this.$router.push({name: '1.2.1', params: {memberId: obj.memberId}});
        }

        //登录 IM
        this.$jsbridgelib.bridgeIMLogin((err) => {
          if (err) {
            return console.log('登录 IM 失败', err);
          }
          window.dispatchEvent(new Event("IMLoginFinish"));
        });

        // 登陆成功 跳转到首页 查询权限表
        this.$accesslib.updateAccessList((err, obj) => {
          if (err) { console.log('失败的回调', err) }
          if (obj) { console.log('成功的回调', obj) }
          this.$router.push({name: '2'});
        });
      });
    },

    // 获取设备号
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
  },

  computed: {
    validation () {
      return {
        loginName: telRE.test(this.loginName),
        pwd: !!this.pwd.trim(),
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

    disabled() {
      return this.loginName == null || this.loginName < 0 || this.pwd.length < 8;
    },

  },
}
</script>
