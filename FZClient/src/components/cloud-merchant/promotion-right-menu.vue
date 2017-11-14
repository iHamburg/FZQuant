<template>
    <div>
        <div class="menubox1" v-show="visible">
            <div class="auto1"  @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
                <ul class="attr-list1 rightmenu1">
                    <li v-for="(item, index) in attribute" :class="{show: item.isActive}" v-if="item.nameList.length > 0">
                      <!--@click="item.isActive=!item.isActive"-->
                        <div class="attribute-name" >
                            <div class="line">{{item.Title}} <span @click="clickAllSelect(index)">{{item.allSelectState}} <em></em></span></div>
                        </div>
                        <div class="attribute-line">
                            <dl>
                                <dd v-for="(item1, index1) in item.nameList">
                                  <div class="name" :class="item1.status" @click="chooseAttribute(index,index1,item1)">
                                    {{item1.classifyName}}
                                  </div>
                                </dd>
                            </dl>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="fbtn1">
                <button class="reset" @click="reset()">重置</button>
                <button @click="close(1)" class="sure">确定</button>
            </div>
        </div>
        <div class="modal-mask1" @click="close(0)"  @touchmove="notouch"></div>
    </div>
</template>

<script>
export default {

  name: 'batch-card',

  data () {
    return {
      visible: false,
      submitList: [],
      startX: 0,
      startY: 0,
      dataTT: [
        {
          classifyId: 1,
          classifyName: '分类01',
          status: '',
          typeList: [
            {
              classifyId: 2,
              classifyName: '分类021',
              status: '',
              typeList: [
                {
                  classifyId: 3,
                  classifyName: '分类031',
                  status: '',
                  typeList: [
                    {
                      classifyId: 13,
                      classifyName: '分类041',
                      status: '',
                      typeList: [
                      ]
                    }
                  ]
                }
              ]
            },
            {
              classifyId: 4,
              classifyName: '分类022',
              status: '',
              typeList: [

              ]
            },
            {
              classifyId: 5,
              classifyName: '分类023',
              status: '',
              typeList: [

              ]
            },
            {
              classifyId: 6,
              classifyName: '分类024',
              status: '',
              typeList: [

              ]
            }
          ]
        },
        {
          classifyId: 7,
          classifyName: '分类1',
          status: '',
          typeList: [
            {
              classifyId: 8,
              classifyName: '分类21',
              status: '',
              typeList: [
                {
                  classifyId: 9,
                  classifyName: '分类31',
                  status: '',
                  typeList: [

                  ]
                }
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            },
            {
              classifyId: 10,
              classifyName: '分类22',
              status: '',
              typeList: [
              ]
            }
          ]
        }
      ],
      attribute: [
        {
          isActive: true,
          Title: "1级分类",
          allSelectState: '全选',
          nameList: [
          ]
        },
        {
          isActive: true,
          Title: "可选2级分类",
          allSelectState: '全选',
          nameList: [
          ]
        },
        {
          isActive: true,
          Title: "可选3级分类",
          allSelectState: '全选',
          nameList: [
          ]
        }
      ]
    }
  },
  props: {
    categoryData: Array
  },
  watch: {
    categoryData: function(val, oldValue) {
      if (val.length == 0) {
        return;
      }
      console.log('分类数据更新了，，')
      this.dataTT = val;
      this.attribute = [];
      var self = this;
      for (var i = 0; i < this.dataTT.length; i++) {
        let data = this.dataTT[i];
        var tempList = [];
        this.lastCategorys(self, tempList, data)
        this.attribute.push({isActive: true, Title: data.classifyName, nameList: tempList, allSelectState: '全选'});
      }
    }
  },
  created() {
    console.log('create 执行了  ');
//    this.attribute = [];
//    var self = this;
//    for (var i = 0; i < this.dataTT.length; i++) {
//      let data = this.dataTT[i];
//      var tempList = [];
//      this.lastCategorys(self, tempList, data)
//      this.attribute.push({isActive: true, Title: data.classifyName, nameList: tempList});
//      console.log(' dasfa  ')
//    }
  },
  methods: {
    notouch(e) {
      e.preventDefault()
      console.log(e)
    },
    //点击头全选按钮
    clickAllSelect(index) {
      var state = this.attribute[index].allSelectState;
      if (state == '全选') {
        this.attribute[index].allSelectState = '全不选';
        this.changeListState(this.attribute[index].nameList, 'select');
      } else {
        this.attribute[index].allSelectState = '全选';
        this.changeListState(this.attribute[index].nameList, '');
      }
    },
    //设置list内状态
    changeListState(list, sate) {
      list.forEach(function (item) {
        item.status = sate;
      })
    },
    chooseAttribute(num, num1, item) {
      var status = this.attribute[num].nameList[num1].status
      console.log('点击了Item   ' + status)
      if (status === "disabled") {
        return
      } else if (status === "select") {
        this.attribute[num].nameList[num1].status = ""
        //this.deleteCategory(num + 1, this.returnCategorySubCategorys(this.attribute[num].nameList[num1]));
      } else {
        this.attribute[num].nameList[num1].status = "select"
        //this.addCategory(num + 1, this.returnCategorySubCategorys(this.attribute[num].nameList[num1]));
      }
    },
    //将category的所有末级分类数据保存在saveList内
    lastCategorys(self, saveList, category) {
      if (category.typeList.length == 0) {
        saveList.push(category);
        return;
      }
      category.typeList.forEach(function (item) {
        self.lastCategorys(self, saveList, item);
      })
    },
    //返回分类下一级子分类list
    returnCategorySubCategorys(cateroryMssage) {
      var tempList = [];
      cateroryMssage.typeList.forEach(function (item) {
        tempList.push(item);
      })
      return tempList;
    },
    //添加分类，index 表示层级， list为数据
    addCategory(index, list) {
      console.log('addcategory -- ' + JSON.stringify(list) + '---' + index);
      if (index > this.attribute.length - 1) {
        return;
      }
      let self = this;
//      this.attribute[index].nameList = this.attribute[index].nameList.concat(list);
      list.forEach(function (item) {
        item.status = '';
        self.attribute[index].nameList.push(item);
      })
      console.log('data -- ' + JSON.stringify(this.attribute));
    },
    //删除分类，index 表示层级， list为数据
    deleteCategory(index, list) {
      console.log('delCategory -- ' + JSON.stringify(list));
      if (index > this.attribute.length - 1 || this.attribute[index].nameList.length == 0) {
        return;
      }
      let self = this
      var tempList = this.attribute[index].nameList;
      if (tempList.length > list.length) {
        list.forEach(function (item) {
          for (var i = 0; i < tempList.length; i++) {
            if (item.classifyId == tempList[i].classifyId) {
              if (tempList[i].typeList.length > 0) {
                self.deleteCategory(index + 1, self.returnCategorySubCategorys(tempList[i]));
              }
              tempList.splice(i, 1);
              break;
            }
          }
        })
      } else {
        this.deleteLayerData(index);
      }

      console.log('data -- ' + JSON.stringify(this.attribute));
    },
    //删除index层及以下的所有子层数据。
    deleteLayerData(index) {
      for (var i = index; i < this.attribute.length; i++) {
        let tempItem = this.attribute[i];
        if (i == 0) {
          tempItem.nameList.forEach(function(o) {
            o.status = ""
          })
        } else {
          //清空数组
          tempItem.nameList.splice(0, tempItem.nameList.length);
        }
      }
    },
    //将categoryMassage内最底层的分类ID保存到submitList 数组。flag为1是排查子select，0，不排查，直接选择最终子分类。
    returnSubmitCategotyIds(self, categoryMassage, flag) {
      if (categoryMassage.typeList.length == 0) {
        self.submitList.push(categoryMassage.classifyId);
        return;
      }
      if (flag) {
        var selectCount = 0;
        categoryMassage.typeList.forEach(function (item) {
          if (item.status == 'select') {
            selectCount++
          }
        })
        if (selectCount == 0) {
          self.returnSubmitCategotyIds(self, categoryMassage, 0);
          return;
        }
        categoryMassage.typeList.forEach(function (item) {
          if (item.status == 'select') {
            self.returnSubmitCategotyIds(self, item, 1);
          }
        })
      } else {
        categoryMassage.typeList.forEach(function (item) {
          self.returnSubmitCategotyIds(self, item, 0);
        })
      }
    },
    //重制数据
    reset() {
      //this.deleteLayerData(0);
      this.attribute.forEach((item) => {
        this.changeListState(item.nameList, '');
        item.allSelectState = '全选';
      })
    },
    touchMove(e) {
      //this.$emit('touchMove111', e);
//      e.preventDefault();
      var moveEndX = e.changedTouches[0].pageX;
      var moveEndY = e.changedTouches[0].pageY;
      var X = moveEndX - this.startX;
      var Y = moveEndY - this.startY;
      var ulheight = e.currentTarget.offsetHeight;
      var scrollTop = e.currentTarget.scrollTop;
      var scrollheight = e.currentTarget.scrollHeight;
      console.log(' move-- ' + ulheight + ' -- ' + scrollTop + ' -- ' + scrollheight + ' -- ' + X + ' -- ' + Y + ' -- ');
      if (ulheight + scrollTop + 20 >= scrollheight) { //滚到底部20px左右
        if (Math.abs(Y) > Math.abs(X) && Y > 0) {
          console.log('1')
        }
        if (Math.abs(Y) > Math.abs(X) && Y < 0) {
          console.log('2')
          e.preventDefault(); //滑动到底部，再往下滑动，阻止滑动！
        }
      }
      if (scrollTop < 20) { //滚到顶部20px左右
        if (Math.abs(Y) > Math.abs(X) && Y > 0) {
          console.log('3')
          e.preventDefault();
        }
        if (Math.abs(Y) > Math.abs(X) && Y < 0) {
          console.log('4')
        }
      }
    },
    touchStart(e) {
      //e.preventDefault();
      this.startX = e.changedTouches[0].pageX;
      this.startY = e.changedTouches[0].pageY;
      console.log('start');
    },
    touchEnd(e) {
    },
    open() {
      this.visible = true;
      //this.attribute.length
    },

    close(type) {
      this.submitList.splice(0, this.submitList.length);
      this.visible = false;
      if (type == 0) {
        this.$emit('child-say', null);
        return;
      }
      /*
      var selectCount = 0;
      this.attribute[0].nameList.forEach(function (item) {
        if (item.status == 'select') {
          selectCount++
        }
      })
      if (selectCount == 0) {
        console.log('没有选择分类');
      } else if (selectCount >= this.attribute[0].nameList.length) {
        var selectCount1 = 0;
        this.attribute[1].nameList.forEach(function (item) {
          if (item.status == 'select') {
            selectCount1++
          }
        })
        if (selectCount1 == 0) {
          console.log('全选分类');
        } else {
          let self = this;
          this.attribute[0].nameList.forEach(function (item) {
            if (item.status == 'select') {
              self.returnSubmitCategotyIds(self, item, 1);
            }
          })
        }
      } else {
        let self = this;
        this.attribute[0].nameList.forEach(function (item) {
          if (item.status == 'select') {
            self.returnSubmitCategotyIds(self, item, 1);
          }
        })
      }
      */
      let self = this;
      this.attribute.forEach(function (item) {
        item.nameList.forEach(function (item1) {
          if (item1.status == 'select') {
            self.submitList.push(item1.classifyId);
          }
        })
      })
      //console.log('submit -- ' + JSON.stringify(this.attribute));
      console.log('submitId -- ' + JSON.stringify(this.submitList));
      var data;
      if (this.submitList.length == 0) {
        data = {type: '1', param: this.submitList};
      } else {
        data = {type: '2', param: this.submitList};
      }
      this.$emit('child-say', data);
    }
  }
};
</script>

<style lang="scss">
  @import "src/sass/tobe/function";
  .menubox1{
    width: 90%;
    height: 100%;
    position: fixed;
    right:0;
    top: 0;
    height: 100%;
    overflow: hidden;
    z-index: 1001;
    background-color: #fff;
  }
  .auto1{
    width: 100%;
    height: 94%;
    overflow-y:auto;
    position: relative;
    z-index: 1000;
  }
 .attr-list1{
  width:100%;
  padding: 0 0 rem(70);

  li{
    width:100%;
    margin-top:rem(40);
    overflow: hidden;
    .attribute-name{
      width:100%;
      background:#ffffff;
      height:rem(88);
      line-height:rem(88);
      font-size:rem(34);
      color:#000;
      .line{
        width:100%;
        height:rem(88);
            line-height:rem(88);
            font-size:18px;
          span{
            float: right;
            color: #888;
            font-size: 14px;
          }
        em{
          width:rem(24);
          height:rem(16);
        background:inline-image("base64/down.png") no-repeat center center;
        background-size:100% auto;
        float:right;
        margin:rem(36) rem(30) 0 rem(20);
        }
      }
    }
    .attribute-line{
      display:none;
    }

    dl{
      width:100%;
      padding-bottom:rem(26);
      background:#fff;
      padding-right:rem(30);
      dd{
        width:33%;
        padding:rem(26) rem(30) 0 0 ;
        float:left;
        display:inline;
        .name{
          width:100%;
          height:rem(60);
          line-height:rem(60);
          background:#f4f4f4;
          background-size:100% 100%;
          text-align:center;
          padding:0 rem(10);
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          font-size:rem(26);
        }
.select{background:url('data:image/png;base64,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') no-repeat;background-size:100% 100%}
        .disabled{
          background:inline-image("base64/attribute-disable.png") no-repeat;
          background-size:100% 100%;
        }
        .add{
          width:100%;
          height:rem(60);
          line-height:rem(60);
          border:1px solid #00A699;
          border-radius:2px;
          text-align:center;
          padding:0 rem(10);
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          font-size:rem(40);
          color:#00A699;
        }
      }
    }
    &.show{
      .attribute-name .line em{
        background:inline-image("base64/up.png") no-repeat center center;
            background-size:100% auto;
      }
      .attribute-line{
        display:block;
      }
    }
  }
}
  .rightmenu1{
      width: 100%;
      overflow: hidden;
      /*position: relative;*/
      /*right: 0;*/
      /*bottom: 0;*/
      padding:0 0 rem(70) rem(30);
      background: #fff;
      font-size: 14px;
      color: #666;
      li{
        border-bottom: 1px solid #d9d9d9;
        padding: rem(30) 0;
      }
      z-index: 1002;
  }
  .modal-mask1{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 1000;
  }
  .fbtn1{
    position: fixed;
    bottom: 0;
    right: 0;
    width: 90%;
    z-index: 1999;
    button{
      width: 50%;
      border:none;
      float: left;
      height: rem(70);
    }
    .reset{
      border-top:1px solid #aaa;
      background: #fff;
      color: #4B4B64;

    }
    .sure{
      background: #66667B;
      color: #fff;
    }
  }
</style>
