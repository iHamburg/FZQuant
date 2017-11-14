<style lang="scss" src="src/sass/events.scss" scoped></style>
<template>
  <div class="events">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">选择提报商品</div>
    </bl-bar>

    <div class="issue-box notop">

        <bl-check-box class="check-content"  v-for="(item, index) in itemcards">
            <span slot="check" class="checkicon"  :class="item.state" @click="chooseAttr(index, itemcards)">
                <i></i>
            </span>
            <div slot="check-box" class="checkbox">
                <div class="check-card check-pic">
                    <div class="picture">
                      <img :src="item.url">
                    </div>
                    <dl>
                        <dt>{{ item.title }}</dt>
                        <dd><span class="pl">&yen;{{ item.sale }}</span> <span class="pr">吊牌价：&yen;{{ item.price}}</span></dd>
                    </dl>
                </div>

            </div>
        </bl-check-box>

    </div>
    <div class="bot">
      <bl-button :disabled="!disabled">确定({{ stateNumber }}/10)</bl-button>
    </div>

  </div> 
</template>

<script>
export default {
  name: 'events',
  components: {
    'BlCheckBox': () => System.import('components/cloud-merchant/check-box')
  },
  mounted() {

  },

  data () {
    return {
      setNumber: 10,
      stateNumber: 0,
      itemcards: [
        {
          "url": "static/images/s_01.png",
          "title": "商品标题商品标题商品标题商品标题商品标题商品标题商品标标题商品标标题商品标",
          "price": "366.00",
          "sale": "166.00",
          "state": "",
        },
        {
          "url": "static/images/s_01.png",
          "title": "商品标题商品标题商品标题商品标题商品标题商品标题商品标标题商品标标题商品标",
          "price": "366.00",
          "sale": "166.00",
          "state": "",
        },
        {
          "url": "static/images/s_02.png",
          "title": "商品标题商品标题商品标题商品标题商品标题商品标题商品标标题商品标标题商品标",
          "price": "366.00",
          "sale": "166.00",
          "state": "",
        },
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "price": "366.00",
          "sale": "166.00",
          "state": "",
        },
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "price": "366.00",
          "sale": "166.00",
          "state": "",
        },
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "price": "366.00",
          "sale": "166.00",
          "state": "",
        },
        {
          "url": "static/images/s_02.png",
          "title": "商品标题商品标题商品标题商品标题商品标题商品标题商品标标题商品标标题商品标",
          "price": "1366.00",
          "sale": "166.00",
          "state": "",
        },
        {
          "url": "static/images/s_02.png",
          "title": "商品标题商品标题商品标题商品标题商品标题商品标题商品标标题商品标标题商品标",
          "price": "366.00",
          "sale": "166.00",
          "state": "",
        },
        {
          "url": "static/images/s_02.png",
          "title": "商品标题商品标题商品标题商品标题商品标题商品标题商品标标题商品标标题商品标",
          "price": "366.00",
          "sale": "166.00",
          "state": "",
        },
        {
          "url": "static/images/s_02.png",
          "title": "商品标题商品标题商品标题商品标题商品标题商品标题商品标标题商品标标题商品标",
          "price": "1366.00",
          "sale": "166.00",
          "state": "",
        },
        {
          "url": "static/images/s_02.png",
          "title": "商品标题商品标题商品标题商品标题商品标题商品标题商品标标题商品标标题商品标",
          "price": "366.00",
          "sale": "166.00",
          "state": "",
        },
        {
          "url": "static/images/s_02.png",
          "title": "商品标题商品标题商品标题商品标题商品标题商品标题商品标标题商品标标题商品标",
          "price": "366.00",
          "sale": "166.00",
          "state": "",
        }
      ]
    }
  },
  methods: {
    chooseAttr(index, arrs) {
      let state = arrs[index].state;
      if (state == "check") {
        arrs[index].state = ""
        this.stateNumber -= 1
      } else {
        arrs[index].state = "check"
        this.stateNumber += 1
      }
    }
  },
  computed: {
    disabled () {
      return this.stateNumber == this.setNumber
    }
  }
}
</script>
