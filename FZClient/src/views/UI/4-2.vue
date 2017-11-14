<template>
  <div class="content management">
    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">查询申请授权的用户</div>
    </bl-bar>

    <div class="queryauth">
        <bl-navbar v-model="selected" :fixed="true">
            <bl-tab-item id="1">待商户审核</bl-tab-item>
            <bl-tab-item id="2">待平台审核</bl-tab-item>
            <bl-tab-item id="3">审核未通过</bl-tab-item>
        </bl-navbar>
        <bl-tab-container v-model="selected">
            <bl-tab-container-item id="1">
                <div class="badge" v-if="data">
                  <p class="tip">以下用户向申请成为贵店的合伙人, 请审核</p>
                  <div class="grant" v-for="item in data">
                      <em class="pic"><img :src="item.photoUrl"></em>
                      <ul class="info">
                        <li>合作网红</li>
                        <li>{{ item.name }}</li>
                        <li>{{ item.num }}</li>
                      </ul>
                      <div class="iconfont arrow-back"></div>
                  </div>
                </div>
                <div v-else class="nouser">
                    目前暂无待商户审核的申请
                </div>
            </bl-tab-container-item>
            <bl-tab-container-item id="2">
                <div class="badge" v-if="data2 != ''">
                  <p class="tip">以下用户向已通过您的审核, 等待云店平台审核</p>
                  <div class="grant" v-for="item in data2">
                      <em class="pic"><img :src="item.photoUrl"></em>
                      <ul class="info">
                        <li>合作网红</li>
                        <li>{{ item.name }}</li>
                        <li>{{ item.num }}</li>
                      </ul>
                      <div class="iconfont arrow-back"></div>
                  </div>
                </div>
                <div v-else class="nouser">
                    目前暂无待商户审核的申请
                </div>
            </bl-tab-container-item>  
            <bl-tab-container-item id="3">
                <div class="badge" v-if="data3 != ''">
                  <p class="tip">以下用户未通过您／云店平台的审核</p>
                  <div class="grant" v-for="item in data3">
                      <em class="pic"><img :src="item.photoUrl"></em>
                      <ul class="info">
                        <li>合作网红</li>
                        <li>{{ item.name }}</li>
                        <li>{{ item.num }}</li>
                      </ul>
                      <div class="iconfont arrow-back"></div>
                  </div>
                </div>
                <div v-else class="nouser">
                    目前暂无待商户审核的申请
                </div>
            </bl-tab-container-item> 
        </bl-tab-container>
    </div>

  </div>

</template>

<script>
import allocationbond from 'components/choose-coupons/distribution';
export default {
  name: 'queryAuth',
  components: {
    allocationbond
  },
  mounted() {

  },
  data () {
    return {
      selected: '1',
      data: [
        {"photoUrl": "/static/images/yy.png", "num": "310************009", "name": "霍子俊"},
        {"photoUrl": "/static/images/yy.png", "num": "310************009", "name": "霍子俊"},
        {"photoUrl": "/static/images/yy.png", "num": "310************009", "name": "霍子俊"},
        {"photoUrl": "/static/images/yy.png", "num": "310************009", "name": "霍子俊"},
        {"photoUrl": "/static/images/yy.png", "num": "310************009", "name": "霍子俊"},
        {"photoUrl": "/static/images/yy.png", "num": "310************009", "name": "霍子俊"},
        {"photoUrl": "/static/images/yy.png", "num": "310************009", "name": "霍子俊"},
        {"photoUrl": "/static/images/yy.png", "num": "310************009", "name": "霍子俊"}
      ],
      data2: [],
      data3: []
    }
  },
  methods: {

  }

}
</script>
