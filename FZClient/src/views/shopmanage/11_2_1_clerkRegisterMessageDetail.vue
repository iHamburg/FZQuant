<style lang="scss" src="src/sass/goods.scss" scoped></style>
<template>
  <div class="ticketlist content-goods">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div><i class="fback">返回</i>
      </div>
      <div slot="title">店员注册信息</div>
    </bl-bar>

    <bl-comli class="margin-t">
      <div slot='left-text'>所属门店</div>
      <div slot='right-text'>{{memberItem.storeName}}</div>
    </bl-comli>
    <bl-comli>
      <div slot='left-text'>所属商户</div>
      <div slot='right-text'><div class="goodattr">{{memberItem.shopName}}</div></div>
    </bl-comli>
    <bl-comli class="margin-t">
      <div slot='left-text'>姓名</div>
      <div slot='right-text'><div class="goodattr">{{memberItem.name}}</div></div>
    </bl-comli>
    <bl-comli>
      <div slot='left-text'>角色</div>
      <div slot='right-text' class="right-text">{{memberItem.roleName}}</div>
    </bl-comli>
    <bl-comli>
      <div slot='left-text'>工号</div>
      <div slot='right-text' class="right-text">{{memberItem.jobNumber}}</div>
    </bl-comli>
    <bl-comli>
      <div slot='left-text'>百联通账号（手机号）</div>
      <div slot='right-text' class="right-text">{{memberItem.mobile}}</div>
    </bl-comli>
      <!-- 底部按钮 -->
    <div class="editgress" v-if="memberItem.auditStatus==0">
      <div class="wrap">
      <button class="button2" @click="approved('1')" @touchstart="">审核通过</button>
      <button class="button2" @click="popupVisible = !popupVisible" @touchstart="">通过不审核</button>
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" style="width: 100%;">
      <bl-cust-picker  show-toolbar @cancel="cancel" @getValues="getValues">
          <div slot="content"  class="cust">
              <dl>
                  <dt>请选择审核不通过的理由</dt>
                  <dd v-for="(item, index) in itemcards" @click="chooseAttr(index, itemcards)">
                    <div class="ononeline">
                      <span class="checkicon" :class="item.state">
                          <i></i>
                      </span>
                      <span>{{ item.name }}</span>
                    </div>
                  </dd>
              </dl>
          </div>
      </bl-cust-picker>
    </mt-popup>
  </div>
</template>

<script>

  import merchantlib from 'src/libs/merchantlib';

  export default {

    name: 'clerkRegisterMessageDetail',
    components: {
      'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker')
    },
    data() {
      return {
        popupVisible: false,
        itemcards: [
          {'name': '工号错误', 'state': ''},
          {'name': '姓名错误', 'state': ''},
          {'name': '角色错误', 'state': ''},
          {'name': '无该员工', 'state': ''},
        ],
        item: {},
        memberItem: {},
        queryParam: {
          clerkMemberId: null,
        },
        aduitParam: {
          clerkMemberId: null,
          type: 1,
          denyReason: null,
        }

      };
    },
    created() {
      console.log('======created');
      console.log('11.2.1 params', JSON.stringify(this.$route.params));
      this.queryParam.clerkMemberId = this.$route.query.id
      this.findMemberAuditDetail();
    },
    activated() {
      console.log('activated');
      console.log('11.2.1 params', JSON.stringify(this.$route.params));
      this.queryParam.clerkMemberId = this.$route.params.id
      this.findMemberAuditDetail();
    },
    mixins: [],
    methods: {
      cancel() {
        this.popupVisible = false;
      },
      findMemberAuditDetail() {
        this.$merchantlib.findMemberAuditDetail(this.queryParam, (err, obj) => {
          if (err) {
            return this.$toast(err)
          }
          console.log('result obj:', JSON.stringify(obj))
          this.memberItem = obj;
        })
      },
      updateMemberStatue(type) {
        this.aduitParam.type = type;
        this.aduitParam.clerkMemberId = this.queryParam.clerkMemberId;
        this.$merchantlib.memberAudit(this.aduitParam, (err, obj) => {
          if (err) {
            return this.$toast(err)
          }
          this.$toast("操作成功");
          // this.$router.push({name: '11.2'})
          this.$router.go(-1)
        })
      },
      getValues() {
        let self = this;
        self.auditNote = ''
        var selectCount = 0;
        self.itemcards.forEach(function(key, val) {
          if (key.state == 'check') {
            self.auditNote += key.name + '；';
            selectCount++;
          }
        })
        self.auditNote = self.auditNote.substring(0, self.auditNote.length - 1)
        this.popupVisible = false
        if (selectCount == 0) {
          this.$toast('至少选择一个不通过理由!')
          return;
        }
        let content = '确定该店员的注册信息因 ' + self.auditNote + ' 没有通过审核？'
        let sureButton = '确定不通过'
        if (self.auditNote) {
          self.$modal({
            content,
            buttons: [
              {
                text: '取消', onClick: function() {}
              },
              {
                text: sureButton,
                onClick: function() {
                  self.aduitParam.denyReason = self.auditNote
                  self.updateMemberStatue("2");
                }
              }
            ]
          })
        } else {
          self.$toast('请选择审核不通过的理由')
        }
      },

      chooseAttr(index, arrs) {
        let state = this.itemcards[index].state;
        if (state == "check") {
          arrs[index].state = ""
        } else {
          arrs[index].state = "check"
        }
      },

      //1：通过 ,2：不通过；
      approved(type) { //
        let self = this;
        let content;
        let sureButton;
        if (type == '1') {
          content = '通过后对方可凭借注册账号登录使用商户端'
          sureButton = '通过审核'
        }
        self.$modal({
          content,
          buttons:
          [
            {text: '取消', onClick: function () {}},
            {text: sureButton,
              onClick: function () {
                self.updateMemberStatue(type);
              }
            }
          ]
        });
      },
    },
    computed: {
      showFixedBar: function () {
        if (this.item.goodsState == '4') {
          return false;
        }
        if (!this.$accesslib.isPermitted('cloudom:goods:reviewdeny') && this.item.goodsState != '0') {
          return false;
        }
        return true;
      },
    }
  };

</script>
