<style lang="scss" src="src/sass/goodsType.scss" scoped></style>
<template>
  <div class="ticketlist">
    <div class="content">
      <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"></div><i class="fback">返回</i>
        </div>
        <div slot="title">分类</div>
      </bl-bar>
    </div>
  <div class="content">
    <div class="coupon-list">
      <ul>
        <li>
          <div class="list-1" v-for="item in items" @click="returnBefore(item.classifyId,item.classifyName)">
            <div class="le-name">{{item.classifyName}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>
<script>
  import utils from 'src/utils';
  import goodslib from 'src/libs/goodslib'

  export default {

    name: 'goodsType',
    components: {
    },
    data() {
      return {
        items: [],
        flag: null
      };
    },
    methods: {
      returnBefore(id, name) {
        console.log("编辑父分类带过来的子分类id：" + id);
        var flag = this.flag;

        if (flag == 1) {
          let cachedItem = utils.storageGet('createdItem');
          let cId = cachedItem.classifyId;
          if (cachedItem != null && cId != id) {
            //清空属性名称
            cachedItem.selectedAttributesNameList = []
            //清空属性id
            cachedItem.selectedAttributesIdList = []
            cachedItem.classifyId = id;
            cachedItem.classifyName = name;
            cachedItem.parentClassifyName = this.parentClassifyName;
            console.log('cachedItem.parentClassifyName :', cachedItem.parentClassifyName)
            utils.storageSet('createdItem', cachedItem);
          }
          // this.$router.replace({path: '/createGoods'});
          this.$router.go(-2)
        } else {
          let editedCachedItem = utils.storageGet('editedItem');
          console.log("编辑缓存：", JSON.parse(JSON.stringify(editedCachedItem)));
          let eId = editedCachedItem.classifyId;
          console.log("编辑缓存中的子分类id：" + eId);
          console.log("编辑缓存中属性id：" + editedCachedItem.selectedAttributesIdList);
          console.log("编辑缓存中的属性名：" + editedCachedItem.selectedAttributesNameList);
          if (editedCachedItem != null && eId != id) {
            //清空属性名称
            editedCachedItem.selectedAttributesNameList = []
            //清空属性id
            editedCachedItem.selectedAttributesIdList = []
            editedCachedItem.classifyId = id;
            editedCachedItem.classifyName = name;
            editedCachedItem.parentClassifyName = this.parentClassifyName;
            console.log('editedCachedItem.parentClassifyName :', editedCachedItem.parentClassifyName)
            utils.storageSet('editedItem', editedCachedItem);
          }
          // this.$router.replace({path: '/editGoods/' + this.goodsId});
          this.$router.go(-2)
        }
      },

      /**
       * 查询二级分类
       */
      querySecondGoodsType() {
        let param = {
          parentId: this.$route.query.parentId
        }
        goodslib.queryGoodsType(param, (err, obj) => {
          if (err) {
            this.$toast(err)
          }
          if (obj) {
            this.items = obj;
          }
        })
      }
    },
    mounted() {
      this.flag = this.$route.query.flag;
      this.goodsId = this.$route.query.goodsId;
      this.parentClassifyName = this.$route.query.parentClassifyName;
      this.querySecondGoodsType()
      console.log('this.parentClassifyName: ', this.parentClassifyName)
    }
  };

</script>

