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
import networklib from 'src/libs/networklib';

export default {
  name: 'productgroups',

  data () {
    return {
      item:{},
      show:false,
      products:[],
    }
  },
  created(){

    let id = this.$route.params.id;

    if(id){ // fetch productgroup 详情,编辑模式
      this.fetchData(id);
    }

  },
  methods: {

    onCreate:function () {

      networklib.post('/productgroups',this.item).then(obj=>{

        alert('新建商品组成功')
        this.item={};
      }).catch(err=>{

        alert('操作失败'+err);
      });

    },

    onUpdate:function () {

      try{
        console.log(JSON.parse(this.item.productIds));

        networklib.put('/productgroups/'+this.item.id,this.item).then(()=>{
          alert('操作成功');
        }).catch(err=>{
          alert('操作失败 '+err)
        });
      }
      catch (err){
        alert('商品id输入有错误');
      }


    },
    onDelete:function () {

      networklib.deleteapi('/productgroups/'+this.item.id).then(()=>{
        alert('操作成功');
        this.$router.go(-1);
      }).catch(err=>{
        alert('操作失败 '+err)
      });

    },

    /**
     * 获取数据
     * @param id
     */
    fetchData(id){
      networklib.get('/productgroups/'+id).then(obj=>{

        this.item = obj;

      }).catch(err=>{
        console.log('err',err);
      });
    }

  }
};


</script>
