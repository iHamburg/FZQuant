<style lang="scss" src="src/sass/events.scss" scoped></style>
<template>
  <div class="events">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">提报商品(8件)</div>
    </bl-bar>

    <div class="issue-box notop">

        <div class="subgoods"  v-for="(item, index) in itemcards">
            <div class="check-content">
                <div class="checkbox">
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
            </div>
            <div class="tags" :class="{'open':item.open}">
                <div class="tagline">
                    <div class="left-box left-name">选择商品标签</div>
                    <div class="right-box" @click="item.open = !item.open">
                        <div class="right-r" v-if="!item.open">展开</div>
                        <div class="right-r" v-else>收起</div>
                        <div class="iconfont arrow-back"></div>
                    </div>
                </div>

                <ul class="tagsbox">
                  <li v-for="(tag, key) in item.tags" :class="{'on' : tag.state}" @click="chooseTag(index, key)">{{tag.name}}</li>
                </ul>
            </div>
            <bl-comli>
                <div slot='left-text' class="left-box left-name">提报理由(选填)</div>
                <div slot='right-text' class="right-box">
                    <div class="right-r text-r">未选择</div>
                    <div class="iconfont arrow-back"></div>
                </div>
            </bl-comli>
        </div>


    </div>
    <div class="bot">
      <bl-button @click="modal">提报参加</bl-button>
    </div>

    <bl-modal :buttons="buttons" v-show=button>
      <div slot="inner"></div>
    </bl-modal>

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
      button: false,
      buttons: [{text: '知道了'}],
      itemcards: [
        {
          "url": "static/images/s_01.png",
          "title": "商品标题商品标题商品标题商品标题商品标题商品标题商品标标题商品标标题商品标",
          "price": "366.00",
          "sale": "166.00",
          open: false,
          tags: [
            {name: '男神礼物', state: true},
            {name: '七夕节买买买', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false}
          ]
        },
        {
          "url": "static/images/s_01.png",
          "title": "商品标题商品标题商品标题商品标题商品标题商品标题商品标标题商品标标题商品标",
          "price": "366.00",
          "sale": "166.00",
          tags: [
            {name: '男神礼物', state: true},
            {name: '七夕节买买买', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false}
          ]
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
          tags: [
            {name: '男神礼物', state: true},
            {name: '七夕节买买买', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false}
          ]
        },
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "price": "366.00",
          "sale": "166.00",
          tags: [
            {name: '男神礼物', state: true},
            {name: '七夕节买买买', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false}
          ]
        },
        {
          "url": "static/images/s_01.png",
          "title": "CHOCOOLATE 拼色POLO衫 CHOCOOLATE 拼色POLO衫",
          "price": "366.00",
          "sale": "166.00",
          tags: [
            {name: '男神礼物', state: true},
            {name: '七夕节买买买', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false}
          ]
        },
        {
          "url": "static/images/s_02.png",
          "title": "商品标题商品标题商品标题商品标题商品标题商品标题商品标标题商品标标题商品标",
          "price": "1366.00",
          "sale": "166.00",
          tags: [
            {name: '男神礼物', state: true},
            {name: '七夕节买买买', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false}
          ]
        },
        {
          "url": "static/images/s_02.png",
          "title": "商品标题商品标题商品标题商品标题商品标题商品标题商品标标题商品标标题商品标",
          "price": "366.00",
          "sale": "166.00",
          tags: [
            {name: '男神礼物', state: true},
            {name: '七夕节买买买', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false}
          ]
        },
        {
          "url": "static/images/s_02.png",
          "title": "商品标题商品标题商品标题商品标题商品标题商品标题商品标标题商品标标题商品标",
          "price": "366.00",
          "sale": "166.00",
          tags: [
            {name: '男神礼物', state: true},
            {name: '七夕节买买买', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false}
          ]
        },
        {
          "url": "static/images/s_02.png",
          "title": "商品标题商品标题商品标题商品标题商品标题商品标题商品标标题商品标标题商品标",
          "price": "1366.00",
          "sale": "166.00",
          tags: [
            {name: '男神礼物', state: true},
            {name: '七夕节买买买', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false}
          ]
        },
        {
          "url": "static/images/s_02.png",
          "title": "商品标题商品标题商品标题商品标题商品标题商品标题商品标标题商品标标题商品标",
          "price": "366.00",
          "sale": "166.00",
          tags: [
            {name: '男神礼物', state: true},
            {name: '七夕节买买买', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false}
          ]
        },
        {
          "url": "static/images/s_02.png",
          "title": "商品标题商品标题商品标题商品标题商品标题商品标题商品标标题商品标标题商品标",
          "price": "366.00",
          "sale": "166.00",
          tags: [
            {name: '男神礼物', state: true},
            {name: '七夕节买买买', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false},
            {name: '标签内容', state: false}
          ]
        }
      ]
    }
  },
  methods: {
    modal() {
      this.buttons = [{text: '知道了'}]
      this.$modal({
        title: '提报成功',
        content: '前往［已报名专题］查看审核结果'
      })
    },
    chooseTag(index, key) {
      var state = this.itemcards[index].tags[key].state;
      if (state) {
        this.itemcards[index].tags[key].state = false
      } else {
        this.itemcards[index].tags[key].state = true
      }
    }
  },
  computed: {
  }
}
</script>
