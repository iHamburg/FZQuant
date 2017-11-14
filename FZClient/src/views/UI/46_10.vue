<!--<style lang="scss" src="src/sass/parkinglot.scss" scoped></style>-->
<!--<style lang="scss" src="src/sass/parkinglot.scss" scoped></style>-->

<template>
  <div class="content-parking">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">券列表</div>
    </bl-bar>

    <div class="mark-box">
      <bl-navbar v-model="selected" :fixed="true">
        <bl-tab-item id="1">全部<i>5</i></bl-tab-item>
        <bl-tab-item id="2">发放中<i>2</i></bl-tab-item>
        <bl-tab-item id="3">待审核<i>2</i></bl-tab-item>
        <bl-tab-item id="4">审核失败<i>2</i></bl-tab-item>
        <bl-tab-item id="5">失效券<i>1</i></bl-tab-item>
      </bl-navbar>
      <bl-tab-container v-model="selected">
        <bl-tab-container-item id="1">

            <bl-check-box class="check-content"  v-for="(item, index) in itemcards">
                <div slot="check-box" class="checkbox cardlist">
                    <div class="tip"><em>{{ item.type }}</em> {{ item.title }}
                        <span v-if="item.state == 0" class="f">发放中</span>
                        <span v-if="item.state == 1" class="d">待审核</span>
                        <span v-if="item.state == 2" class="s">审核失败</span>
                        <span v-if="item.state == 3" class="y">已失效</span>
                    </div>
                    <div class="check-card">
                        <div class="card">{{ item.price }}元
                          <span>{{ item.toprice }}</span>
                        </div>
                        <dl>
                            <dd>{{ item.desc }}</dd>
                            <dd class="over">{{ item.scope }}</dd>
                            <dd>{{ item.range }}</dd>
                        </dl>
                    </div>
                    <div class="edit">
                        <span>共1000张</span> <span class="gray">已发200张</span>
                        <button>编辑</button>
                        <button>停止发放</button>
                    </div>
                </div>
            </bl-check-box>

        </bl-tab-container-item>

        <bl-tab-container-item id="2">
            <bl-check-box class="check-content"  v-for="(item, index) in itemcards" v-if="item.state == 0">
                <div slot="check-box" class="checkbox cardlist">
                    <div class="tip"><em>{{ item.type }}</em> {{ item.title }}
                        <span v-if="item.state == 0" class="f">发放中</span>
                        <span v-if="item.state == 1" class="d">待审核</span>
                        <span v-if="item.state == 2" class="s">审核失败</span>
                        <span v-if="item.state == 3" class="y">已失效</span>
                    </div>
                    <div class="check-card">
                        <div class="card">{{ item.price }}元
                          <span>{{ item.toprice }}</span>
                        </div>
                        <dl>
                            <dd>{{ item.desc }}</dd>
                            <dd>{{ item.scope }}</dd>
                            <dd>{{ item.range }}</dd>
                        </dl>
                    </div>
                    <div class="edit">
                        <span>共1000张</span> <span class="gray">已发200张</span>
                        <button>编辑</button>
                        <button>停止发放</button>
                    </div>
                </div>
            </bl-check-box>
        </bl-tab-container-item>

        <bl-tab-container-item id="3">
            <bl-check-box class="check-content"  v-for="(item, index) in itemcards" v-if="item.state == 1">
                <div slot="check-box" class="checkbox cardlist">
                    <div class="tip"><em>{{ item.type }}</em> {{ item.title }}
                        <span v-if="item.state == 0" class="f">发放中</span>
                        <span v-if="item.state == 1" class="d">待审核</span>
                        <span v-if="item.state == 2" class="s">审核失败</span>
                        <span v-if="item.state == 3" class="y">已失效</span>
                    </div>
                    <div class="check-card">
                        <div class="card">{{ item.price }}元
                          <span>{{ item.toprice }}</span>
                        </div>
                        <dl>
                            <dd>{{ item.desc }}</dd>
                            <dd>{{ item.scope }}</dd>
                            <dd>{{ item.range }}</dd>
                        </dl>
                    </div>
                    <div class="edit">
                        <span>共1000张</span> <span class="gray">已发200张</span>
                        <button>编辑</button>
                        <button>停止发放</button>
                    </div>
                </div>
            </bl-check-box>
        </bl-tab-container-item>

        <bl-tab-container-item id="4">
            <bl-check-box class="check-content"  v-for="(item, index) in itemcards" v-if="item.state == 2">
                <div slot="check-box" class="checkbox cardlist">
                    <div class="tip"><em>{{ item.type }}</em> {{ item.title }}
                        <span v-if="item.state == 0" class="f">发放中</span>
                        <span v-if="item.state == 1" class="d">待审核</span>
                        <span v-if="item.state == 2" class="s">审核失败</span>
                        <span v-if="item.state == 3" class="y">已失效</span>
                    </div>
                    <div class="check-card">
                        <div class="card">{{ item.price }}元
                          <span>{{ item.toprice }}</span>
                        </div>
                        <dl>
                            <dd>{{ item.desc }}</dd>
                            <dd>{{ item.scope }}</dd>
                            <dd>{{ item.range }}</dd>
                        </dl>
                    </div>
                    <div class="edit">
                        <span>共1000张</span> <span class="gray">已发200张</span>
                        <button>编辑</button>
                        <button>停止发放</button>
                    </div>
                </div>
            </bl-check-box>
        </bl-tab-container-item>

        <bl-tab-container-item id="5">
            <bl-check-box class="check-content"  v-for="(item, index) in itemcards" v-if="item.state == 3">
                <div slot="check-box" class="checkbox cardlist">
                    <div class="tip"><em>{{ item.type }}</em> {{ item.title }}
                        <span v-if="item.state == 0" class="f">发放中</span>
                        <span v-if="item.state == 1" class="d">待审核</span>
                        <span v-if="item.state == 2" class="s">审核失败</span>
                        <span v-if="item.state == 3" class="y">已失效</span>
                    </div>
                    <div class="check-card">
                        <div class="card">{{ item.price }}元
                          <span>{{ item.toprice }}</span>
                        </div>
                        <dl>
                            <dd>{{ item.desc }}</dd>
                            <dd>{{ item.scope }}</dd>
                            <dd>{{ item.range }}</dd>
                        </dl>
                    </div>
                    <div class="edit">
                        <span>共1000张</span> <span class="gray">已发200张</span>
                        <button>编辑</button>
                        <button>停止发放</button>
                    </div>
                </div>
            </bl-check-box>
        </bl-tab-container-item>

      </bl-tab-container>
    </div>

  </div>

</template>

<script>
export default {
  name: 'parkingRecord',

  components: {
    'BlCheckBox': () => System.import('components/cloud-merchant/check-box')
  },
  mounted() {

  },
  data () {
    return {
      selected: '1',
      isCheck: false,
      isAllCheck: false,
      isDel: false,
      nowCheck: '1',
      delArr: 0,

      itemcards: [
        {
          price: "50",
          toprice: "满减券",
          title: "百联商城停车券",
          desc: "无门槛",
          scope: "领取后7天有效",
          range: '限西郊百联，百联又一城',
          state: 0,
          number: '1000',
          issued: '200',
          type: '满减券'

        },
        {
          price: "50",
          toprice: "满减券",
          title: "百联商城停车券",
          desc: "无门槛",
          scope: "领取后7天有效",
          range: '限西郊百联，百联又一城',
          state: 1,
          number: '1000',
          issued: '200',
          type: '满减券'

        },
        {
          price: "50",
          toprice: "满减券",
          title: "百联商城停车券",
          desc: "无门槛",
          scope: "领取后7天有效",
          range: '限西郊百联，百联又一城',
          state: 2,
          number: '1000',
          issued: '200',
          type: '满减券'

        },
        {
          price: "50",
          toprice: "满减券",
          title: "百联商城停车券",
          desc: "无门槛",
          scope: "领取后7天有效",
          range: '限西郊百联，百联又一城',
          state: 3,
          number: '1000',
          issued: '200',
          type: '满减券'

        },
        {
          price: "50",
          toprice: "满减券",
          title: "百联商城停车券",
          desc: "无门槛",
          scope: "领取后7天有效",
          range: '限西郊百联，百联又一城',
          state: 1,
          number: '1000',
          issued: '200',
          type: '满减券'

        },
      ],

      shopcards: [
        {
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          "scope": "领取后7天有效",
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },
        {
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          "scope": "领取后7天有效",
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },
        {
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          "scope": "领取后7天有效",
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },
        {
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          "scope": "领取后7天有效",
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },
        {
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          "scope": "领取后7天有效",
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },
        {
          "price": "50元",
          "toprice": "抵用券",
          "title": "ZARA优惠券",
          "desc": "无门槛",
          "scope": "领取后7天有效",
          "state": "",
          "shop": "限西郊百联，百联又一城"
        },
      ],
    }
  },
  methods: {

  }

}
</script>
