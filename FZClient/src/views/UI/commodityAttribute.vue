

<template>
  <div>
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
        返回
      </div>
      <div slot="title">{{title}}</div>
      <div slot="right-button" class="hrad-right" @click="" >增加属性</div>
    </bl-bar>
    <div class="attribute">
      <ul>
        <li v-for="(item , index) in attribute">
          <div class="attribute-button" v-bind:class="{ 'on' : item.condition }" @click="statebutton(index)"><button></button></div>
          <div class="attribute-info">
            <span>颜色：<i>{{ item.color }}</i></span>
            <span>尺码：<i>{{ item.size }}</i></span>
          </div>
          <div class="attribute-state">{{ item.state }}</div>
        </li>
      </ul>
    </div>
    <bl-button type="primary" class="bottom-attribute-button">保存</bl-button>
  </div>
</template>

<script>
export default {
  name: 'commodityAttribute',
  data () {
    return {
      title: '商品属性',
      attribute: [{
        color: '红色',
        size: 'M',
        state: '有货',
        condition: false
      },
      {
        color: '绿色',
        size: 'S',
        state: '无货',
        condition: false
      },
      {
        color: '棕色',
        size: 'L',
        state: '无货',
        condition: false
      }]
    };
  },
  methods: {
    statebutton: function(index) {
      if (this.attribute[index].condition == true) {
        this.attribute[index].condition = false
      } else {
        this.attribute[index].condition = true
      }
    }
  }
};
</script>
