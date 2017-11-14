<template>
<div class="badge">
   <div v-for="data in datas" class="bl-steps gift-item">
     <div class="bl-step" :class="{'active': isActive}">
       <div class="bl-step-inner">
         <div class="steps-head">
           <div class="steps-line"></div>
           <span class="steps-num">{{data.number}}</span>
         </div>
         <div class="steps-main">{{data.shuliang}}</div>
       </div>
     </div>
     <div class="bl-step" :class="{'active': !isActive}">
       <div class="bl-step-inner">
         <div class="steps-head">
           <div class="steps-line"></div>
           <span class="steps-num">{{data.number02}}</span>
         </div>
         <div class="steps-main">{{data.people}}</div>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  name: 'allocationbond',
  data () {
    return {
      datas: [
        {"number": "1", "shuliang": "选择分配数量", "number02": "2", "people": "选择发券人"}
      ],
      items: [
      ]
    }
  },
  props: {
    isActive: Boolean
  }
}
</script>
<style lang="scss">
@import "src/sass/tobe/function";
.bl-steps {
    white-space: nowrap;
    font-size: 0;
    text-align: center;
    padding: rem(20) rem(72);
    background-color: #ffffff;
    margin:rem(30) 0 rem(40) 0;
    .bl-step {
        position: relative;
        width: rem(306);
        text-align: center;
        vertical-align: top;
        display: inline-block;
        .bl-step-inner {
            width: rem(180);
            margin-left: auto;
        }
        &:first-child {
            .bl-step-inner {
                margin-left: 0;
            }
            .steps-line {
                right: 0;
                left: auto;
            }
        }
        &.active {
            .steps-main {
                color: #333333;
            }
            .steps-line {
                background-color: #F13149;
            }
            .steps-num {
                background-color: #F13149;
            }
        }
    }
    .steps-head {
        .steps-num {
            display: inline-block;
            width: rem(40);
            line-height: rem(40);
            background: #BBBBBB;
            font-size: rem(28);
            color: #ffffff;
            border-radius: 50%;
            border: rem(10) solid #dddddd;
            -webkit-box-sizing: content-box;
            box-sizing: content-box;
        }
    }
    .steps-main {
        font-size: rem(28);
        color: #bbbbbb;
        margin-top: rem(12);
    }
    .steps-line {
        position: absolute;
        left: 0;
        top: rem(28);
        width: rem(170);
        height: rem(4);
        background-color: #cccccc;
    }
}
.gift-item{
  .bl-step.active{
    .steps-line{
      background: #455A64;
    }
    .steps-num{
      background: #455A64;
    }
  }
  .steps-line{
    width:rem(180);
  }
}
</style>
