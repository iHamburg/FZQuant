<style lang="scss" src="src/sass/attributeEdit.scss" scoped></style>
<template>
  <div class="content">
    <bl-modal :buttons="buttons" v-if="modalShow" :title="'自定义属性值'">
      <div slot="inner">
        <input type="text" v-model="customTxt" class="attribute-input" placeholder="上限100个字" maxlength="100"/>
      </div>
    </bl-modal>
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="onBack()">
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">属性管理</div>
    </bl-bar>
    <ul class="attribute-list">
      <li v-for="(item, index) in attribute" :class="{show: item.isActive}">
        <div class="attribute-name" @click="item.isActive=!item.isActive"><div class="line">{{item.skuName}}<em></em></div></div>
        <div class="attribute-line" v-for="(itemE, indexE) in item.Custom">
          <div class="name-line" >{{itemE.skuName}}</div>
          <dl>
          <bl-tag :index2="indexE" :index3="index" :item2="itemE" :tagArray=itemE.Item :ifAdd=true @tagcallback="tagtap" @tagclick="chooseAttributeE" @tagadd="addAttribute"></bl-tag>
          </dl>
        </div>
        <div class="attribute-line" v-for="(item1, index1) in item.nameList">
          <div class="name-line">{{item1.skuName}}</div>
          <dl>
            <dd v-for="(item2, index2) in item1.Item">
              <div class="name" :id="item2.skuId" :class="item2.state" @click="chooseAttribute(index,index1,index2)">
                {{item2.skuName}}
              </div>
            </dd>
          </dl>
        </div>
      </li>
    </ul>
    <div class="button-line">
      <bl-button type="primary" @click="submit" style="background-color: #4B4B64">确定</bl-button>
    </div>
  </div>
</template>

<script>
  import networklib from 'src/libs/networklib';
  import utils from 'src/utils';
  import uiMixin from 'src/mixins/uiMixin';
  import merchantlib from 'src/libs/merchantlib';
  // require('src/assets/css/attributeEdit.css')

  export default {
    name: 'attributeEdit',
    components: {
      'BlTag': () => System.import('components/bl-cloudstore-merchant/bl-cloudStore-tag')
    },
    data () {
      return {
        goodsId: null,
        classifyId: '100001',  //默认 100001
        merchantId: '', //
        memberId: '',
        customTxt: "",
        //itemSelectGroupCount: 0, //记录尺码选择的组数
        modalShow: false,
        attribute: [],
        selectedAttributesIdList: [],
        selectedAttributesNameList: [],
        oldIdList: [],
        propertyList: [], //接口返回的原始数据
        buttons: [{
          text: '取消',
          onClick: () => {
            this.modalShow = false;
          }
        },
        {
          text: '确定',
          onClick: () => {
            //
            if (this.customTxt.replace(/(^\s*)|(\s*$)/g, "") != "") {
              let apiId = '1013';
              let queryParam = {classifyId: this.classifyId, merchantId: merchantlib.getMerchantId(), parentId: this.memberId, propertyName: this.customTxt};
              console.log('======param:' + this.memberId);
              networklib.post(apiId, queryParam).then((obj) => {
                console.log('成功的回调', obj)
                   //location.reload(true);
                this.querySku();
              }).catch(err => {
                console.log('失败的回调', apiId, err)
              })

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
    created() {
      console.log('-----created');
      if (this.$route.query.classifyId) {
        this.classifyId = this.$route.query.classifyId;
      }
      if (this.$route.query.flag) { // 新建
        this.flag = this.$route.query.flag;
      }
      if (this.$route.query.goodsId) {
        this.goodsId = this.$route.query.goodsId;
      }

      //DONE: 孙传奇 根据入参更改相应的item的status
      if (this.$route.query.selectedAttributesIdList) {
        console.log('用于回显的属性值', JSON.parse(JSON.stringify(this.$route.query.selectedAttributesIdList)));
        this.selectedAttributesIdList = this.$route.query.selectedAttributesIdList;
      }
      Array.prototype.push.apply(this.oldIdList, this.selectedAttributesIdList);
//      this.startLoading();
      this.querySku();
    },
    activated() {
      console.log('-----activated');
    },
    mixins: [uiMixin],
    methods: {
      addAttribute(itemE) {
        this.memberId = itemE.skuId;
        this.modalShow = true;
      },
      tagtap(index, index1, index2) {
        //console.log('---长按了 - ', index, index1, index2)
        var self = this
        this.$modal({
          content: '您确定要移除该标签吗？',
          buttons: [
            {text: '取消', onClick: function () {}},
            {text: '移除',
              onClick: function () {
                self.hiddeSkUProperty(index, index1, index2);
              }}
          ]
        });
      },
      //操作系统选项
      chooseAttribute(num, num1, num2) {
        console.log('--- 111s2 ', num + ' -- ', num1 + ' -- ' + num2)
        var state = this.attribute[num].nameList[num1].Item[num2].state
        var name = this.attribute[num].skuName;
        if (name == "尺码" && this.itemSelectGroupCount > 1 && state == 'disabled') {
          //选中组数大于1时不能选中只能取消选中。
          //console.log('不能选中！');
          this.$toast('请先清除其他尺码选项组的选择！');
          return;
        }
        if (name == "尺码" && this.itemSelectGroupCount == 1 && state == 'disabled') {
          // 选中数组等于一组时，选中的元素，为另外的组时不可选中
          var count = 0;
          this.attribute[num].nameList[num1].Item.forEach((item) => {
            if (item.state == 'select') {
              count++;
            }
          })
          if (count == 0) {
            this.$toast('尺码只能在一种属性内勾选！如需调整请取消原勾选项');
            return;
          }
        }
        if (state === "disabled") {
          this.attribute[num].nameList[num1].Item[num2].state = "select"
          this.selectedAttributesIdList.push(this.attribute[num].nameList[num1].Item[num2].skuId);
        } else {
          this.attribute[num].nameList[num1].Item[num2].state = "disabled"
          //TODO
          this.selectedAttributesIdList.splice(this.selectedAttributesIdList.indexOf(this.attribute[num].nameList[num1].Item[num2].skuId), 1);
        }
      },
      //操作自定义选项
      chooseAttributeE(num, num1, num2) {
        var state = this.attribute[num].Custom[num1].Item[num2].state
//        var name = this.attribute[num].skuName;
        if (state === "disabled") {
          this.selectedAttributesIdList.splice(this.selectedAttributesIdList.indexOf(this.attribute[num].Custom[num1].Item[num2].skuId), 1);
        } else {
          this.selectedAttributesIdList.push(this.attribute[num].Custom[num1].Item[num2].skuId);
        }
      },
      onBack: function () {
        console.log("属性id：" + 'this.oldIdList:', this.oldIdList.join(","));
        console.log("属性id：" + 'this.selectedAttributesIdList:', this.selectedAttributesIdList.join(","));
        console.log("isOneArray：" + this.isOneArray(this.oldIdList, this.selectedAttributesIdList))
        if (this.isOneArray(this.oldIdList, this.selectedAttributesIdList)) {
          this.$router.go(-1);
        } else {
          this.$modal({
            title: '',
            content: '您确定要离开吗？若离开，已输入的内容将丢失。',
            buttons: [
              {
                text: '取消',
                onClick: () => {}
              },
              {
                text: '确定',
                onClick: () => {
                  this.$router.go(-1);
                }
              }
            ]
          })
        }
      },
      querySku() {
        this.attribute = [];
        let apiId = '1005';
        let queryParam = {merchantId: merchantlib.getMerchantId(), classifyId: this.classifyId};
        networklib.post(apiId, queryParam).then((obj) => {
//          this.stopLoading();
          console.log('成功的回调', obj)
          let proList = obj.list;
          this.propertyList = obj.list;
          this.$goodslib.transformPropertyList(this.propertyList);
          for (let i = 0; i < proList.length; i++) {
            let skuId = proList[i].skuID;
            let skuName = proList[i].skuName;
            let skuTwoList = proList[i].list;
            let custom = [];
            let nameList = [];
            for (let j = 0; j < skuTwoList.length; j++) {
              let skuTwoId = skuTwoList[j].skuID;
              let skuTwoName = skuTwoList[j].skuName;
              let skuThreeList = skuTwoList[j].list;
              let proThreeList = [];
              for (let k = 0; k < skuThreeList.length; k++) {
                let skuThreeId = skuThreeList[k].skuID;
                let skuThreeName = skuThreeList[k].skuName;
                if (this.selectedAttributesIdList.indexOf(skuThreeId) != -1) {
                  proThreeList.push({skuId: skuThreeId, skuName: skuThreeName, state: 'select'});
                } else {
                  proThreeList.push({skuId: skuThreeId, skuName: skuThreeName, state: 'disabled'});
                }
              }

              // 根据不同的二级属性区分
              if (skuTwoName === '自定义属性值') { //cus
                custom.push({skuId: skuTwoId, skuName: skuTwoName, Item: proThreeList});
              } else {
                nameList.push({skuId: skuTwoId, skuName: skuTwoName, Item: proThreeList});
              }
            }
            this.attribute.push({isActive: true, skuId: skuId, skuName: skuName, Custom: custom, nameList: nameList})
          }
          console.log("attribute:" + this.attribute + '--- ' + this.itemSelectGroupCount);
        }).catch(err => {
          console.log('失败的回调', apiId, err);
        })
      },

      isOneArray(arr1, arr2) {
        if (arr1.length != arr2.length) {
          return false;
        }
        for (let i = 0; i < arr1.length; i++) {
          if (arr2.indexOf(arr1[i]) === -1) {
            return false;
          }
        }
        return true;
      },
      /**
       * 重置SKU库存
       * @param tab
       */
      generateGroup(tab) {
        console.log('generateGroup参数' + tab);
        let apiId = '1020';
        let queryParam = {goodsId: tab, propertiesList: this.selectedAttributesIdList, stockState: 0};
        console.log('1020参数' + queryParam);
        networklib.post(apiId, queryParam).then((obj) => {
          console.log('成功的回调1020', obj)
        }).catch(err => {
          console.log('失败的回调', apiId, err);
        })
      },
      /**
       * 隐藏自定义属性
       */
      hiddeSkUProperty(index, index1, index2) {
        this.$goodslib.queryHiddeGoodsSKUProperty({'skuId': this.attribute[index].Custom[index1].Item[index2].skuId}, (err, obj) => {
          if (err) {
            return this.$toast(err)
          }
          console.log('隐藏自定义属性返回 ', obj);
          //this.querySku();
          if (this.selectedAttributesIdList.indexOf(this.attribute[index].Custom[index1].Item[index2].skuId) != -1) {
            this.selectedAttributesIdList.splice(this.selectedAttributesIdList.indexOf(this.attribute[index].Custom[index1].Item[index2].skuId), 1);
          }
          this.attribute[index].Custom[index1].Item.splice(index2, 1);
          return this.$toast("移除成功!")
        })
      },
      /**
       * 配置selectedAttributesNameList
       */
      getSkuName() {
        this.selectedAttributesNameList = [];
        for (let i = 0; i < this.attribute.length; i++) {
          let arr = [];
          for (let j = 0; j < this.attribute[i].Custom.length; j++) {
            for (let k = 0; k < this.attribute[i].Custom[j].Item.length; k++) {
              if (this.selectedAttributesIdList.indexOf(this.attribute[i].Custom[j].Item[k].skuId) != -1) {
                arr.push(this.attribute[i].Custom[j].Item[k].skuName);
              }
            }
          }
          for (let m = 0; m < this.attribute[i].nameList.length; m++) {
            for (let n = 0; n < this.attribute[i].nameList[m].Item.length; n++) {
              if (this.selectedAttributesIdList.indexOf(this.attribute[i].nameList[m].Item[n].skuId) != -1) {
                arr.push(this.attribute[i].nameList[m].Item[n].skuName);
              }
            }
          }
          this.selectedAttributesNameList.push({ key: this.attribute[i].skuName, list: arr });
        }
      },
      /**
       * 校验
       */
      validate() {
        // 判断selectedAttributesIdList 不能为空
        if (this.$_.isEmpty(this.selectedAttributesIdList)) {
          return '请选择至少一个属性'
        }

        // 选中的子属性所对应的一级父属性
        let selectedParentPropertyList = []
        this.selectedAttributesIdList.map(id => {
          this.propertyList.map(property => {
            property.subsubList.map(subsubProperty => {
              if (subsubProperty.skuID == id) {
                selectedParentPropertyList.push(property.skuName)
              }
            })
          })
        })

        // 去重
        selectedParentPropertyList = this.$_.union(selectedParentPropertyList)
        var propertyListName = [];
        this.propertyList.map(property => {
          propertyListName.push(property.skuName);
        })
        //console.log('ssss   ', selectedParentPropertyList, propertyListName)
        var flag = false;
        var unSelelctName = '';
        for (var j = 0; j < propertyListName.length; j++) {
          var flag1 = true;
          for (var i = 0; i < selectedParentPropertyList.length; i++) {
            if (selectedParentPropertyList[i] == propertyListName[j]) {
              flag1 = false;
              break;
            }
          }
          if (flag1) {
            unSelelctName = propertyListName[j]
            flag = true;
            break;
          }
        };
        if (flag) {
          return '请选择' + unSelelctName + '属性'
        }
        return true
      },
      // 确认
      submit() {
        let validate = this.validate()
        if (validate !== true) {
          return this.$toast(validate)
        }
        this.getSkuName();
        console.log('selectedAttributesNameList ', this.selectedAttributesNameList);
        console.log('attribute ', this.attribute);
        console.log("属性id：" + 'selectedAttributesIdList:', this.selectedAttributesIdList.join(","));
        console.log('propertyList ', this.propertyList);
//        console.log("属性名称：数组长度" + 'selectedAttributesNameList:', this.selectedAttributesNameList.length);
//        console.log("属性名称：颜色==" + this.selectedAttributesNameList[0].key + 'selectedAttributesNameList:', this.selectedAttributesNameList[0].list.join(","));
        var flag = this.flag;

        if (flag == 1) { // 新建商品
          let cachedItem = utils.storageGet('createdItem');
          console.log("上新缓存：" + cachedItem);
          if (cachedItem != null) {
            cachedItem.selectedAttributesIdList = this.selectedAttributesIdList;
            cachedItem.selectedAttributesNameList = this.selectedAttributesNameList;
            utils.storageSet('createdItem', cachedItem);
          }
          this.$router.go(-1)
        } else {
            // 编辑商品
          let editedCachedItem = utils.storageGet('editedItem');
          console.log("编辑缓存：" + editedCachedItem);
          editedCachedItem.selectedAttributesIdList = this.selectedAttributesIdList;
          editedCachedItem.selectedAttributesNameList = this.selectedAttributesNameList;
          console.log('sku管理页面属性名称：', this.selectedAttributesNameList)
          utils.storageSet('editedItem', editedCachedItem);
          this.$router.go(-1)
        }
      }
    },
    computed: {
      itemSelectGroupCount: function () { //记录尺码选择的组数
        var count = 0;
        this.attribute.forEach((item) => {
          if (item.skuName == "尺码") {
//            item.Custom.forEach((item1) => {
//              for (var i = 0; i < item1.Item.length; i++) {
//                if (item1.Item[i].state == 'select') {
//                  count++
//                  break
//                }
//              }
//            })
            item.nameList.forEach((item1) => {
              for (var i = 0; i < item1.Item.length; i++) {
                if (item1.Item[i].state == 'select') {
                  count++
                  break
                }
              }
            })
          }
        })
        console.log('选择尺码的组数', count)
        return count;
      }
    },

    watch: {
      'customTxt' (val) {
        if (val.length > 100) {
          this.$toast('上限100个字')
        }
      }
    }
  };
</script>
