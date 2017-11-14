<!-- 品牌目录 -->
<style lang="scss" src="src/sass/listBrand.scss" scoped></style>

<template>
  <div class="content" :style="{ 'height': brandHeight + 'px'}">

    <bl-bar barStyle="bar-dark-linear" ref="topbar">
      <div class="button" slot="left-button" @click="onBack">
        <div class="iconfont arrow-back"><i class="fback">返回</i></div>
      </div>
      <div slot="title">品牌目录</div>
    </bl-bar>

    <div class="brand">
      <div class="brand-list" :style="{ 'height': brandHeight + 'px'}"  ref="brand">
        <dl v-for="(item, index) in brandsListData" class="scroll">
          <dt>{{ item.index}} </dt>
          <dd v-for="(key, val) in item.slip" :class="key.state" @click="checks(index, val)"><div  class="bname">{{ key.zhname }} &nbsp;&nbsp;{{ key.name }} </div><i></i></dd>
        </dl>
      </div>

      <div class="brand-nav">
        <ul>
          <li v-for="(data, letkey) in letter" @click="onScroll(data.name, letkey)"> {{ data.name }}</li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>

  import networklib from 'src/libs/networklib';
  import merchantlib from 'src/libs/merchantlib';
  import uiMixin from 'src/mixins/uiMixin';

  export default {

    name: 'goodSales',
    data () {
      return {
        selectedCount: 0,
        counts: 0,
        brandHeight: null,
        items: [],
        getBrandIds: [],
        brandsListData: [],
        item: null,
        letterListData: [],
        queryParam: {
          merchantId: null
        },
        queryMerchantParam: {
          brandIds: null,
          memberId: null,
          merchantId: null,
          type: null
        },
        letter: [
          {"name": "0"},
          {"name": "A"},
          {"name": "B"},
          {"name": "C"},
          {"name": "D"},
          {"name": "E"},
          {"name": "F"},
          {"name": "G"},
          {"name": "H"},
          {"name": "I"},
          {"name": "J"},
          {"name": "K"},
          {"name": "L"},
          {"name": "M"},
          {"name": "N"},
          {"name": "O"},
          {"name": "P"},
          {"name": "Q"},
          {"name": "R"},
          {"name": "S"},
          {"name": "T"},
          {"name": "U"},
          {"name": "V"},
          {"name": "W"},
          {"name": "X"},
          {"name": "Y"},
          {"name": "Z"},
          {"name": "#"},
        ]
      }
    },
    mixins: [uiMixin],
    mounted() {
      console.log('2.1.1 mounted');
      let self = this;
      this.$nextTick(function () {
        window.addEventListener('scroll', self.onScroll)
      })

      this.brandHeight = document.documentElement.clientHeight - this.$refs.topbar.$el.clientHeight;
      this.getBrandIds = this.$route.query.brandIds;
      this.selectedCount = this.getBrandIds.length
      console.log('品牌选中数量：', this.selectedCount)
      // 调用查询品牌目录方法.
      this.queryData(function (err) {
        if (err) {
          self.$toast({message: '服务器载入失败:' + err});
        }
      });
    },
    methods: {
      onBack() {
        console.log('back clicked');
        this.$router.go(-1);
      },
      // 修改商户设置接口.
      updateMerchant(statu, callback) {
        let apiId = '1022';
        networklib.post(apiId, this.queryMerchantParam).then(() => {
          if (this.queryMerchantParam.type == 1) {
            statu.state = "check";
          } else {
            statu.state = "";
          }
        }, (err) => {
          callback(err);
        });
      },

      // 查询品牌目录接口方法.
      queryData(callback) {
        let re = /^[0-9]+.?[0-9]*$/;
        this.startLoading();
        let apiId = '1024';
        let brandIds = [];
        brandIds = this.getBrandIds;
        networklib.post(apiId, this.queryParam).then((obj) => {
          this.stopLoading();
          let arrs = obj.brandList;

          let dataIndex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

          let dataArrayModel = [];
          let arrayModel = [];
          let numberModel = [];
          let self = this;
          for (var i = 0; i < dataIndex.length; i++) {
            arrayModel = [];
            // 查出来的.
            arrs.forEach(function(item) {
              //console.log('item ', item);
              self.counts ++;
              // 传过来的Id.
              for (var j = 0; j < brandIds.length; j++) {
                if (brandIds[j] == item.brandId) {
                  item.state = "check"
                } else {
                  if (item.state != "check") {
                    item.state = "";
                  }
                }
              }

              if (item.brandEnglishName.toUpperCase().indexOf(dataIndex[i]) == 0 && !re.test(dataIndex[i])) {
                let slip = {"name": item.brandEnglishName, "zhname": item.brandName, "brandId": item.brandId, "state": item.state};
                arrayModel.push(slip);
              } else if (item.brandEnglishName.toUpperCase().indexOf(dataIndex[i]) == 0 && re.test(dataIndex[i])) {
                let slip = {"name": item.brandEnglishName, "zhname": item.brandName, "brandId": item.brandId, "state": item.state};
                numberModel.push(slip);
              }
            })
            //console.log("this.count", self.counts);
            if (arrayModel.length > 0) {
              let slipArray = {"index": dataIndex[i], "slip": arrayModel};
              dataArrayModel.push(slipArray);
            }
          }

          if (numberModel.length > 0) {
            let slipArray = {"index": "0-9", "slip": numberModel};
            dataArrayModel.unshift(slipArray);
          }

          this.brandsListData = dataArrayModel;
        }, (err) => {
          this.stopLoading();
          callback(err);
        });
      },

      //选中按钮/反选按钮.
      checks (index, val) {
        if (!merchantlib.isManager()) {
          this.$toast('没有权限进行这项操作')
          return
        }

        let self = this;

        this.queryMerchantParam.brandIds = this.brandsListData[index].slip[val].brandId;
        this.queryMerchantParam.memberId = merchantlib.memberId;
        this.queryMerchantParam.merchantId = merchantlib.getMerchantId();

        var state = this.brandsListData[index].slip[val].state;
        // console.log('状态：', state)
        if (!state) {
          //this.brandsListData[index].slip[val].state = 'check';
          this.selectedCount += 1
          this.queryMerchantParam.type = 1;
        } else {
          //this.brandsListData[index].slip[val].state = '';
          if (this.selectedCount == 1) {
            this.$toast('品牌不能少于1个')
            return
          }
          this.queryMerchantParam.type = 0;
          this.selectedCount -= 1
        }
        console.log('品牌选中数量-----------：', this.selectedCount)

        // 调接口.删除 // 调接口.增加
        this.updateMerchant(this.brandsListData[index].slip[val], function (err) {
          if (err) {
            setTimeout(function() {
              self.$toast({message: '服务器载入失败:' + err});
            }, 500);
          }
        });
      },

      //点击字母定位.
      onScroll (data, letkey) {
        console.log(data);
        let soll = document.querySelectorAll('.scroll');
        if (!soll[letkey]) {
          this.$refs.brand.scrollTop = 0
        } else {
          let total = soll[letkey].offsetTop;
          this.$refs.brand.scrollTop = total;
        }
      }
    },
  }
</script>
