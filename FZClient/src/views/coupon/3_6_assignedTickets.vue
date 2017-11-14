<style lang="scss" src="src/sass/assignedTickets.scss" scoped></style>
<template>
	<div class="content">
    <bl-bar barStyle="bar-dark-linear">
      <div class="button" slot="left-button" @click="$router.go(-1)">
        <div class="iconfont arrow-back"></div>
      </div>
      <div slot="title">分配券</div>
    </bl-bar>
    <allocationbond1 :isActive="isActive" ></allocationbond1>
    <div v-for="number in numbers" class="number-check">
      <div class="number-line">
        <em class="reduce" :class="{'disable':isMin}" v-on:click="reduce">-</em>
        <input class="number" type="number" :min="number.min" :max="number.max" id="numberinput" v-model="num" ref="numberinput"/>
        <em class="add" :class="{'disable':isMax}" v-on:click="add">+</em>
      </div>
      <div class="message">最多可分配{{usable}}张</div>
      <bl-button type="primary" v-on:click="submit">下一步</bl-button>
    </div>
  </div>
</template>
<script>
  // import networklib from 'src/libs/networklib';
  import allocationbond1 from 'components/choose-coupons/choose';
export default {
    name: 'assignedTickets',
    components: {
      allocationbond1
    },
    data () {
      return {
        datas: [
          {"number": "1", "shuliang": "选择分配数量", "number02": "2", "people": "选择发券人"}
        ],
        numbers: [
          {"min": 1, "max": 100, "value1": 1}
        ],
        num: 1,
        usable: 0,
        isActive: true,
        couponTemplateId: null,
      };
    },
    mounted() {
      this.couponTemplateId = this.$route.query.couponTemplateId;
      console.log('=====' + this.couponTemplateId);
      this.usable = this.$route.query.num;
      this.numbers[0].max = this.usable;
    },
    methods: {
      add() {
        this.num ++
      },
      reduce() {
        if (this.num > 1) {
          this.num --
        } else {
          this.num = 1;
          this.$toast('已到最小数量');
        }
      },
      submit() {
        if (this.num <= 0) {
          this.num = 1
          return;
        }
        let num = this.num;
        console.log('---' + num);
        this.$router.push({path: '/allocationbond', query: { num: this.num, couponTemplateId: this.couponTemplateId }});
         // 跳转页面  num couponTemplateId ；
      }
    },
    computed: {
      isMin() {
        if (this.num <= this.numbers[0].min) {
          return true;
        } else {
          return false;
        }
      },
      isMax() {
        if (this.num >= this.numbers[0].max) {
          return true;
        } else {
          return false;
        }
      }
    },
    watch: {
      'num' (val) {
        if (val - this.numbers[0].max > 0) {
          this.$toast('已到最大数量')
          this.num = this.numbers[0].max
        }
        // if (val <= 0) {
        //   this.$toast('已到最小数量')
        //   //this.num = 1
        // }
        console.log(val)
      }
    }
};
</script>
