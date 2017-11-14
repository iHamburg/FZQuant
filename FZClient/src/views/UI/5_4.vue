<style lang="scss" src="src/sass/setupSlide.scss" scoped></style>
<template>
    <div class="content">
			<bl-bar barStyle="bar-dark-linear">
				<div class="button" slot="left-button" @click="$router.go(-1)">
				  <div class="iconfont arrow-back"></div><i class="fback">返回</i>
				</div>
				<div slot="title">设置广告轮播图</div>
				<div slot="right-button" class="hrad-right">操作</div>
			</bl-bar>

			<div class="setupslide">

					<div class="setupbox" v-for="(item, index) in picture">
							<p>轮播图{{ index + 1 }}</p>
							<span class="pic"><img :src="item.url"></span>
			        <div class="badge-list">
			        		<div class="badge-li">
					            <div class="left-box">图片链接</div>
					            <div class="right-box" @click="">
					                <div class="right-r ellipsis" @click="url(index)">{{ item.link }}</div>
					                <div class="iconfont arrow-back"></div>
					            </div>
			        		</div>
			        </div>
			        <div class="badge-list">
			        		<div class="badge-li">
					            <div class="left-box">下线时间</div>
					            <div class="right-box" @click="">
					                <div class="right-r">{{ item.time }}</div>
					                <div class="iconfont arrow-back"></div>
					            </div>
			        		</div>
			        </div>
					</div>

					<div class="addpic">
					    <p>轮播图{{ key }}</p>
							<button>添加图片 ({{ key }}/6)</button>
							<span>图片尺寸应小于2M，支持PNG/JPG/JPGE格式的文件</span>
					</div>

			</div>

			<bl-button style="position:fixed;bottom:0;width:100%;" :disabled="!disabled">完成</bl-button>

			<bl-actionsheet :actions="actions" v-model="sheetVisible" @thisValue="returnVal"></bl-actionsheet>

			<bl-popup v-model="urlVisible" position="bottom" style="width: 100%;">
		      <bl-cust-picker show-toolbar @cancel="cancel" @getValues="getValues" :toolbarSubText="toolbarSubText">
		          <ul slot="content" class="seturl">
		              <li class="line font"><input type="text" ref="url" placeholder="填写自定义链接地址"></li>
		          </ul>
		      </bl-cust-picker>
	    </bl-popup>
			<div class="modal-bg" v-if="sheetVisible || urlVisible" @click="close"></div>
    </div>
</template>

<script type="text/babel">
  export default {
    name: 'dutyRoster',
    components: {
      'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker')
    },
    data () {
      return {
        sheetVisible: false,
        urlVisible: false,
        toolbarSubText: '自定义链接',
        key: '',
        fuckNumber: 0,
        actions: [{
          name: '商品链接',
          key: '0'
        }, {
          name: '活动链接',
          key: '1'
        }, {
          name: '自定义链接',
          key: '2'
        }],
        picture: [
          {'url': 'static/images/h_01.jpg', 'link': '选择链接地址', 'time': '2017-01-17  00:00:00'},
          {'url': 'static/images/h_01.jpg', 'link': '选择链接地址', 'time': '2017-01-17  00:00:00'},
          {'url': 'static/images/h_01.jpg', 'link': '选择链接地址', 'time': '2017-01-17  00:00:00'}
        ]
      }
    },
    mounted() {
      this.key = this.picture.length + 1
    },
    computed: {
      disabled() {
        return this.picture.length > 0
      }
    },
    methods: {
      returnVal(val) {
        if (val == 2) this.sheetVisible = false; this.urlVisible = true
      },
      cancel() {
        this.urlVisible = false
      },
      getValues() {
        this.urlVisible = false
        this.picture[this.fuckNumber].link = this.$refs.url.value
      },
      url(index) {
        this.sheetVisible = !this.sheetVisible
        this.fuckNumber = index
      },
      close() {
        (this.sheetVisible == false) ? (this.sheetVisible = true) : (this.sheetVisible = false);
        (this.urlVisible == false) ? (this.urlVisible = true) : (this.urlVisible = false);
      }
    }
  }
</script>
