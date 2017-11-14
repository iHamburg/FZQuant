<template>
    <div @touchmove.prevent v-show="visible">
        <div class="menubox">

            <ul class="attr-list rightmenu">
                <li v-for="(item, index) in attribute" :class="{show: item.isActive}">
                    <div class="attribute-name" @click="item.isActive=!item.isActive">
                        <div class="line">{{item.Title}} <span>全部 <em></em></span></div>
                    </div>
                    <div class="attribute-line">
                        <dl>
                            <dd v-for="(item1, index1) in item.nameList">
                              <div class="name" :class="item1.state" @click="chooseAttribute(index,index1)">
                                {{item1.txt}}
                              </div>
                            </dd>
                        </dl>
                    </div>
                </li>
                <li style="border:none">
                    <div class="attribute-name">
                        <div class="line">价格区间</div>
                    </div>
                    <div class="price">
                        <input type="tel" placeholder="最低价"> 
                        <em>—</em> 
                        <input type="tel" placeholder="最高价">
                    </div>
                </li>
            </ul>

            <div class="fbtn">
                <button class="reset" @click="reset()">重置</button>
                <button @click="close()" class="sure">确定</button>
            </div>
        </div>
        <div class="modal-mask" @click="close()"></div>
    </div>
</template>

<script>
export default {

  name: 'batch-card',

  data () {
    return {
      visible: false,
      attribute: [
        {
          isActive: true,
          Title: "分类",
          nameList: [
            {txt: "黑色", state: "select"},
            {txt: "白色", state: "select"},
            {txt: "蓝色", state: ""},
            {txt: "黄色", state: ""},
            {txt: "深灰色", state: ""},
            {txt: "棕色", state: ""},
            {txt: "绿色", state: ""},
            {txt: "橘黄色", state: ""}
          ]
        },
        {
          isActive: true,
          Title: "品牌",
          nameList: [
            {txt: "5", state: "select"},
            {txt: "6", state: "select"},
            {txt: "7", state: ""},
            {txt: "8", state: ""}
          ]
        }
      ]
    }
  },
  props: {

  },
  methods: {
    chooseAttribute(num, num1) {
      var state = this.attribute[num].nameList[num1].state
      if (state === "disabled") {
        return
      } else if (state === "select") {
        this.attribute[num].nameList[num1].state = ""
      } else {
        this.attribute[num].nameList[num1].state = "select"
      }
    },
    reset() {
      this.attribute.forEach(function(item) {
        item.nameList.forEach(function(o) {
          o.state = ""
        })
      })
    },

    open() {
      this.visible = true;
    },

    close() {
      this.visible = false;
      this.$emit('child-say', this.visible);
    }
  }
};
</script>

<style lang="scss">
  @import "src/sass/tobe/function";
  .menubox{
    width: 90%;
    height: 100%;
    position: absolute;
    right:0;
    z-index: 1001;
  }
 .attr-list{
  width:100%;
  padding: 0 0 rem(70);
  overflow-y: auto;

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
        background:url("../../sass/base64/down.png") no-repeat center center;
        background-size:100% auto;
        float:right;
        margin:rem(36) rem(30) 0 rem(20);
        }
      }
    }
    .attribute-line{
      height: rem(90);
      overflow: hidden;
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
.select{background:url("../../sass/base64/attribute-select.png") no-repeat;background-size:100% 100%}
        .disabled{
          background:url("../../sass/base64/attribute-disable.png") no-repeat;
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
        background:url("../../sass/base64/up.png") no-repeat center center;
            background-size:100% auto;
      }
      .attribute-line{
        height: auto;
        display:block;
      }
    }
    .price{
      input{
        width: rem(280);
        height: rem(60);
        background: #F7F7F7;
        border-radius: rem(4);
        border:none;
        float:left;
        text-align: center;
      }
      em{
        float:left;
        color: #EFEFEF;
        line-height: rem(60);
        padding: 0 rem(10);
      }
    }
  }
} 
  .rightmenu{
      width: 100%;
      overflow: hidden;
      position: absolute;
      right: 0;
      height: 100%;
      bottom: 0;
      padding:0 0 0 rem(30);
      background: #fff;
      font-size: 14px;
      color: #666;
      li{
        border-bottom: 1px solid #d9d9d9;
        padding: rem(30) 0;
      }
  }
  .modal-mask{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 1000;
  }
  .fbtn{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
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
