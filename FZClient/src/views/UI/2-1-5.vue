<style lang="scss" src="src/sass/commonAttributes.scss" scoped></style>
<template>
  <div class="content">

    <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">设置常用属性</div>
    </bl-bar>

    <div class="common">
        <dfn>尺码</dfn>
        <bl-check-box class="check-attr" v-for="(item, index) in attrSize">
            <span slot="check" class="checkicon" :class="{'check':item.state}" @click="chooseAttrs(index, attrSize)">
                <i></i>
            </span>
            <div slot="check-box" class="checkbox">
                <div class="check-card" @click="pullAttrs(index, attrSize)">
                    <h2>{{ item.name }}</h2>
                    <div class="size" v-if="!item.isMore">{{ item.size }} <i class="iconfont arrow-back"></i></div>
                    <div class="param" v-else>{{ item.size }} <i class="iconfont arrow-back arrow-up"></i></div>
                    
                </div>
            </div>
        </bl-check-box>
        <dfn>颜色</dfn>
        <bl-check-box class="check-attr" v-for="(item, index) in attrColor">
            <span slot="check" class="checkicon" :class="{'check':item.state}" @click="chooseAttrs(index, attrColor)">
                <i></i>
            </span>
            <div slot="check-box" class="checkbox">
                <div class="check-card" @click="pullAttrs(index, attrColor)">
                    <h2>{{ item.name }}</h2>
                    <div class="size" v-if="!item.isMore">{{ item.color }} <i class="iconfont arrow-back"></i></div>
                    <div class="param" v-else>{{ item.color }} <i class="iconfont arrow-back arrow-up"></i></div>

                </div>
            </div>
        </bl-check-box>
    </div>

    <div class="boot">
      <bl-button>确 认</bl-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'serviceOrder',
  components: {
    'BlCheckBox': () => System.import('components/cloud-merchant/check-box'),
  },
  mounted() {

  },
  data () {
    return {
      attrSize: [
        {
          name: '英文标示码',
          size: 'XS、S、M、XM、L、XL、XL、XL、XL、XL、S、M、XM、L、XL、XL、XL、XL、XL',
          isMore: false,
          state: false
        },
        {
          name: '数字标示码',
          size: '5、5.5、6、6.5、7、7.57、7、7、7、7、5、5.5、6、6.5、7、7.57、7、7、7、7、7',
          isMore: false,
          state: false
        },
        {
          name: '美国码',
          size: '5、5.5、6、6.5、7、7.5、8、8.5、9、9.5、10、10.5、11、11.5、12、12.5、13、13.5、14、14.5、15、15.5、16、16.5、17、17.5、18、18.5、19、19.5、20',
          isMore: false,
          state: false
        },
        {
          name: '欧洲码',
          size: '4码、6码、8码、10码、12码、6码、8码、10码、12码',
          isMore: false,
          state: false
        }
      ],
      attrColor: [
        {
          name: '红色',
          color: '深红、大红、中红、樱桃红、唇红、橘红、樱桃红',
          isMore: false,
          state: false
        },
        {
          name: '白色',
          color: '奶白色、亮白色、灰白色、柔和白',
          isMore: false,
          state: false
        },
        {
          name: '灰色',
          color: '深灰、中灰、浅灰、花灰',
          isMore: false,
          state: false
        },
        {
          name: '绿色',
          color: '深绿、中绿、浅绿、草绿、钴绿',
          isMore: false,
          state: false
        },
        {
          name: '蓝色',
          color: '钴蓝、天蓝、深蓝、紫蓝、淡蓝',
          isMore: false,
          state: false
        }
      ]
    }
  },
  methods: {
    chooseAttrs(index, arrs) {
      for (let i = 0; i < arrs.length; i += 1) {
        arrs[i].state = false
      }
      let state = arrs[index].state;
      if (state === false) {
        arrs[index].state = true
      } else {
        arrs[index].state = false
      }
    },
    pullAttrs(index, arrs) {
      (arrs[index].isMore == false) ? (arrs[index].isMore = true) : (arrs[index].isMore = false)
    }
  },
  computed: {
  }
}
</script>

