<style lang="scss" src="src/sass/goodsType.scss" scoped></style>
<template>
  <div class="ticketlist">
    <div class="content">
      <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="count--;$router.go(-1)">
          <div class="iconfont arrow-back"></div><i class="fback">返回</i>
        </div>
        <div slot="title">分类</div>
      </bl-bar>
    </div>
  <div class="content">
    <div class="coupon-list">
      <ul>
        <li>
          <div class="list-1" v-for="item in items" @click="onSecondGoodsType(item.classifyId,item.classifyName)">
            <div class="le-name">{{item.classifyName}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>
<script>
  import goodslib from 'src/libs/goodslib'
  import utils from 'src/utils';
  export default {

    name: 'goodsType',
    components: {
    },
    data() {
      return {
        items: [],
        flag: null,
        count: 1,
        parentClassifyName: '',
        selectCategoryData: []
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
        }
      },
      queryFirstGoodsType() { //查询一级分类
        var param = {}
        if (this.$route.query.parentId) {
          param = {parentId: this.$route.query.parentId}
        }
        goodslib.queryGoodsType(param, (err, obj) => {
          if (err) {
            this.$toast(err)
          }
          if (obj) {
            this.items = obj;
          }
        })
      },
      querySubGoodsType(param, id, name) { //查询子级分类
        goodslib.queryGoodsType(param, (err, obj) => {
          if (err) {
            this.$toast(err)
          }
          if (obj) {
            //console.log('调用二级页面数据', obj)
            if (obj.length > 0) {
              this.count++;
              this.$router.push(
                {
                  path: '/goodsType',
                  query: {
                    flag: this.flag,
                    goodsId: this.goodsId,
                    parentClassifyName: name,
                    parentId: id,
                  }
                }
              )
            } else {
              var tempName = name;
              //由于this.selectCategoryData.length有可能大于count。所以用count控制层级更准确
              if (this.count > 2) {
                tempName = this.selectCategoryData[1].name
                for (var i = 2; i < this.count; i++) {
                  tempName += ' ' + this.selectCategoryData[i].name;
                }
              }
              this.returnBefore(id, tempName)
              this.$router.go(-this.count);
            }
          }
        });
      },

      /**
       * 跳转到二级分类页面
       */
      onSecondGoodsType(id, name) {
        if (this.count == 1) {
          this.parentClassifyName = name;
        }
        if (this.selectCategoryData.length < this.count) {
          this.selectCategoryData.push({'id': id, 'name': name})
        } else {
          this.selectCategoryData[this.count - 1] = {'id': id, 'name': name}
        }

        this.querySubGoodsType({parentId: id}, id, name)
        //console.log('调用二级页面', id)
      }
    },
    mounted() {
      this.flag = this.$route.query.flag;
      this.goodsId = this.$route.query.goodsId;
      this.queryFirstGoodsType();
    },
    watch: {
      '$route'() {
        this.flag = this.$route.query.flag;
        this.goodsId = this.$route.query.goodsId;
        this.queryFirstGoodsType();
      }
    }
  };

</script>

