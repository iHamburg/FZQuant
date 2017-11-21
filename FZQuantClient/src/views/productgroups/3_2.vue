<template>
  <div>
    <form class="form-horizontal well">
      <div class='form-group'>
        <label class="control-label ">名称 Title<span class="text-danger"> * </span></label>
        <input type="text" name="title"  class="form-control"  v-model="item.title"/>
        <label class="control-label ">介绍 desc<span class="text-danger"> </span></label>
        <input type="text" name="desc"  class="form-control" v-model="item.desc"/>
        <label class="control-label">图片地址</label>
        <input  name="imgUrl"  class="form-control" v-model="item.imgUrl"/>
        <label class="control-label">商品id列表 [12,23,45]</label>
        <input  name="productIds"  class="form-control" v-model="item.productIds" />

        <label class="col-sm-2">
          <input type="checkbox" name="status" id="status" v-model="item.status">
          上架
        </label>

        <br/>
        <div class="form-group ">
          <div v-if="item.id">
            <input type="submit" name="" value="更新" class="btn btn-primary"
                   @click.prevent="onUpdate" />
            <button class="btn btn-danger" @click.prevent="onDelete">删除</button>
          </div>
          <input v-else type="submit" name="" value="新建" class="btn btn-primary" @click.prevent="onCreate" />

        </div>
      </div>
    </form>

</div>
</template>

<script>

  export default {
//    商品组详情
    name: 'keepProductgroups',

    data () {
      return {
        item: {
          productIds: ''
        },
        show: false,
        products: [],
        text: '',
        api: '/productgroups',
      }
    },
    created() {
    },
    activated() {
      let id = this.$route.params.id;

      if (id) {
        this.fetchData(id);
      }
    },
    methods: {

      onCreate: function () {
        this.$networklib.post(this.api, this.item).then(() => {
          alert('新建商品组成功')
          this.item = {};
        }).catch(err => {
          alert('操作失败' + err);
        });
      },

      onUpdate: function () {
        if (!window.confirm('确定要更新商品组?')) { return }
        // 判断productId是否格式正确
        try {
          JSON.parse(this.item.productIds);

          this.$networklib.put(this.api + '/' + this.item.id, this.item).then(() => {
            alert('操作成功');
          }).catch(err => {
            alert('操作失败 ' + err)
          });
        } catch (err) {
          alert('商品id输入有错误');
        }
      },
      onDelete: function () {
        if (!window.confirm('确定要删除商品组?')) { return }

        this.$networklib.deleteapi(this.api + '/' + this.item.id).then(() => {
          alert('操作成功');
          this.$router.go(-1);
        }).catch(err => {
          alert('操作失败 ' + err)
        });
      },

      /**
       * 获取数据
       * @param id
       */
      fetchData(id) {
        this.$networklib.get(this.api + '/' + id).then(obj => {
          console.log('obj ',obj);
          this.item = obj;
        }).catch(err => {
          console.log('err', err);
        });
      }

    }
  };
</script>
