<template>

  <div class="scratchableLatex02">
  <div class="item02">
    <div class="tabIndex" @click="changeView(tabIndex.path, $el)">
        <a href="javascript:;">
            <img :src="tabIndex.imgUrl1" v-if="isOn">
            <img :src="tabIndex.imgUrl01" v-else>
            <div class="txt">
              {{tabIndex.workbench}}
              <!-- <span :class="{'active': !isActive}">{{tabIndex.number}}</span> -->
            </div>
        </a>
    </div>
    <div class="tabIndex" @click="changeView(tabIndex.path02, $el)">
      <a href="javascript:;">
          <img :src="tabIndex.imgUrl2" v-if="!isOn">
          <img :src="tabIndex.imgUrl02" v-else>
          <div class="txt">
            {{tabIndex.message}}
            <span :class="{'active': isActive, 'longSize': tabIndex.number > 99}" v-if="tabIndex.number > 0">{{msgCountStr}}</span>
          </div>
      </a>
    </div>
  </div>
  </div>

</template>

<script>
export default {
  name: 'homepageEntrance',
  data () {
    return {
      isOn: false,
    };
  },
  props: {
    tabIndex: Object,
    isActive: Boolean,
  },
  methods: {
    changeView(view, el) {
      if (view.indexOf('cloudStoreIndex') != -1) {
        this.isOn = false
      } else {
        this.isOn = true
      }

      if (!view == '') {
        console.log('change view ', view);
        this.currentView = view
      }
      this.$router.push({ path: view })
//      this.$router.push({ path: '/orderManage' })
    },
  },
  mounted() {
    // console.log('tab-index', this.isActive)
  },
  watch: {
    'tabIndex.number': {
      handler: (val, oldVal) => {
        console.log('--- ', val, '=== ' + oldVal, this)
      },
      // 深度观察
      deep: true
    }
  },
  computed: {
    msgCountStr: function () {
      console.log('---112 ', this.tabIndex.number)
      if (this.tabIndex.number > 99) {
        return '99+'
      } else {
        return '' + this.tabIndex.number
      }
    },
  }
};
</script>
<style lang="scss">
@import "src/sass/tobe/function";
.scratchableLatex02 {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index:100;
    .item02 {
        font-size: 0;
        overflow: hidden;
        margin-top: rem(54);
        background-color: #ffffff;
        border-top: 1px solid #ececec;
        border-bottom: 1px solid #ececec;
        .tabIndex {
            float: left;
            padding-top: rem(12);
            padding-bottom: rem(7);
            width: 50%;
            border-right: none;
            border-top: none;
            text-align: center;
            position: relative;
            a {
                img {
                    width: rem(56);
                    height: auto;
                    margin-bottom: rem(18);
                }
                .txt {
                    font-size: rem(28);
                    color: #222222;
                    line-height: rem(28);
                    span {
                        width: rem(36);
                        height: rem(36);
                        line-height: rem(36);
                        background-color: #F76260;
                        border-radius: rem(18);
                        position: absolute;
                        top: rem(10);
                        right: rem(140);
                        color: #ffffff;
                        font-size: rem(24);
                    }
                    span.active {
                        display: none;
                    }
                    span.longSize{
                      width: rem(64);
                      border-radius: rem(18);
                      right: rem(120);
                    }
                }
            }
        }
        li:before {
            background-color: #fff;
        }
    }
}
</style>
