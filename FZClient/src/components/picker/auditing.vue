<template>
  <div class="page-picker">

   <bl-popup v-model="popupVisible2" position="bottom" style="width: 100%;">
        <bl-cust-picker  show-toolbar @cancel="cancel2" @getValues="getValues2">
            <div slot="content"  class="cust">
                <dl>
                    <dt>请选择审核不通过的理由</dt>
                    <dd v-for="(item, index) in itemcards" @click="chooseAttr(index, item)">
                      <div class="line">
                        <span class="checkicon" :class="item.state">
                            <i></i>
                        </span>
                        <span>{{ item.name }}</span>
                      </div>
                    </dd>
                </dl>
            </div>
        </bl-cust-picker>
    </bl-popup>

    <!--遮罩-->
    <div v-if="popupVisible2" @click="popupVisible2 = !popupVisible2"><div class="modal-bg"></div></div>
  </div>
</template>

<style lang="scss" scoped>


.cust{
  width: 100%;
  background: #efeff4;
  color: #888;
  text-align: left;
  dt{
    width: 100%;
    font-size: .28rem;
    line-height: .64rem;
    padding: 0 0 0 .3rem;
  }
  dd{
    background: #fff;
    font-size: .34rem;
    color: #000;
    line-height: .88rem;
    padding: 0 0 0 .3rem;

  }
  .line{
    border-bottom:1px solid #d9d9d9;
  }

  .checkicon{
    float: left;
    margin: .2rem .2rem 0 0;
    i{
      width: .46rem;
      height: .46rem;
      border:1px solid #aaa;
      border-radius:50%;
      display: block;
    }
  }

}


.modal-bg{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.6);
  z-index: 19;

}

</style>
<script type="text/babel">

  export default {
    components: {
      'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker'),
      'BlCheckBox': () => System.import('components/cloud-merchant/check-box')

    },

    methods: {
      cancel2() {
        this.popupVisible2 = false;
      },
      getValues2() {
        this.popupVisible2 = false
      },

      chooseAttr(index, item) {
        let state = this.itemcards[index].state;
        if (state == "check") {
          state = ""
        } else {
          state = "check"
        }
      },
    },
    data() {
      return {
        isCheck: true,
        popupVisible2: false,
        itemcards: [
          {'name': '品名错误', 'state': ''},
          {'name': '规格错误', 'state': ''},
          {'name': '图片错误', 'state': ''},
          {'name': '品牌错误', 'state': ''},
          {'name': '重量错误', 'state': ''},
          {'name': '其他原因，请与审核人确认', 'state': ''}
        ],

      };
    }
  };
</script>
