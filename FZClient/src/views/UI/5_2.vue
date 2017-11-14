<template>
  <div class="content">
    <bl-modal :buttons="buttons" v-if="modalShow" :title="'自定义规格'">
      <div slot="inner">
        <input type="text" v-model="customTxt" class="attribute-input" placeholder="上限10个字" maxlength="10"/>
      </div>
    </bl-modal>
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">属性管理</div>
    </bl-bar>
    <ul class="attribute-list">
      <li v-for="(item, index) in attribute" :class="{show: item.isActive}">
        <div class="attribute-name" @click="item.isActive=!item.isActive"><div class="line">{{item.Title}}<em></em></div></div>
        <div class="attribute-line">
          <div class="name-line">自定义属性值</div>
          <dl>
            <dd v-for="(itemE, indexE) in item.Custom">
              <div class="name" :class="itemE.state" @click="chooseAttributeE(index,indexE)">
                {{itemE.txt}}
              </div>
            </dd>
            <dd>
              <div class="add" @click="addAttribute(index)">
                +
              </div>
            </dd>
          </dl>
        </div>
        <div class="attribute-line" v-for="(item1, index1) in item.nameList">
          <div class="name-line">{{item1.Name}}</div>
          <dl>
            <dd v-for="(item2, index2) in item1.Item">
              <div class="name" :class="item2.state" @click="chooseAttribute(index,index1,index2)">
                {{item2.txt}}
              </div>
            </dd>
          </dl>
        </div>
      </li>
    </ul>
    <div class="button-line">
      <bl-button type="primary">确定</bl-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'attributeEdit',
  data () {
    return {
      memberId: null,
      customTxt: "",
      modalShow: false,
      attribute: [
        {
          isActive: true,
          Title: "颜色",
          Custom: [],
          nameList: [
            {
              Name: "颜色",
              Item: [
                {txt: "黑色", state: "select"},
                {txt: "白色", state: "select"},
                {txt: "蓝色", state: ""},
                {txt: "黄色", state: ""},
                {txt: "紫色", state: "disabled"},
                {txt: "深灰色", state: ""},
                {txt: "棕色", state: ""},
                {txt: "绿色", state: ""},
                {txt: "土黄色", state: "disabled"},
                {txt: "橘黄色", state: ""}
              ]
            }
          ]
        },
        {
          isActive: true,
          Title: "尺码",
          Custom: [],
          nameList: [
            {
              Name: "英文标识码",
              Item: [
                {txt: "XS", state: "select"},
                {txt: "S", state: "select"},
                {txt: "M", state: ""},
                {txt: "L", state: ""},
                {txt: "XL", state: "disabled"},
                {txt: "XXL", state: ""},
                {txt: "XXXL", state: ""}
              ]
            },
            {
              Name: "数字标识码",
              Item: [
                {txt: "155/60A", state: "select"},
                {txt: "160/62A", state: "select"},
                {txt: "165/64A", state: ""},
                {txt: "170/66A", state: ""},
                {txt: "175/68A", state: "disabled"}
              ]
            },
            {
              Name: "英国码",
              Item: [
                {txt: "55", state: "select"},
                {txt: "60", state: "select"},
                {txt: "65", state: ""},
                {txt: "70", state: ""},
                {txt: "75", state: "disabled"}
              ]
            },
            {
              Name: "美国码",
              Item: [
                {txt: "5", state: "select"},
                {txt: "6", state: "select"},
                {txt: "7", state: ""},
                {txt: "8", state: ""},
                {txt: "9", state: "disabled"}
              ]
            },
          ]
        }
      ],
      buttons: [{
        text: '取消',
        onClick: () => {
          this.modalShow = false;
        }
      },
      {
        text: '确定',
        onClick: () => {
          if (this.customTxt != "") {
            this.attribute[this.memberId].Custom.push({txt: this.customTxt, state: "select"})
            this.customTxt = ""
            this.modalShow = false
          } else {
            this.$toast('属性值不能为空')
            this.modalShow = false
          }
        }
      }]
    };
  },
  methods: {
    addAttribute(num) {
      this.memberId = num;
      this.modalShow = true;
    },
    chooseAttribute(num, num1, num2) {
      var state = this.attribute[num].nameList[num1].Item[num2].state
      if (state == "disabled") {
        return
      } else if (state == "select") {
        this.attribute[num].nameList[num1].Item[num2].state = ""
      } else {
        this.attribute[num].nameList[num1].Item[num2].state = "select"
      }
    },
    chooseAttributeE(num, num1) {
      var state = this.attribute[num].Custom[num1].state
      if (state == "select") {
        this.attribute[num].Custom[num1].state = ""
      } else {
        this.attribute[num].Custom[num1].state = "select"
      }
    }
  },
  watch: {
    'customTxt' (val) {
      if (val.length > 10) {
        this.$toast('上限10个字')
      }
    }
  }
};
</script>
