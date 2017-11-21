<template>
  <div class="container">
    <h2>用户登录</h2>
    <b-form @submit="onSubmit">
      <b-form-group id="exampleInputGroup1"
                    label="用户名:" label-for="exampleInput1"
                    description="">
        <b-form-input id="exampleInput1"
                      type="text" v-model="form.username" required
                      placeholder="admin"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="密码:" label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="text" v-model="form.password" required
                      placeholder="admin"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="exampleGroup4">
        <b-form-checkbox v-model="form.checked" id="exampleInput4">
          保持登录
        </b-form-checkbox>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</div>
</template>

<script>

  export default {
    name: 'productgroups',

    data () {
      return {
        items:[],
        form: {
          email: '',
          username: 'admin',
          password: 'admin',
          food: null,
          checked: false,
          secret: 'S3CR3T'
        },
        foods: [
          { text: 'Select One', value: null },
          'Carrots', 'Beans', 'Tomatoes', 'Corn'
        ]
      }
    },

    created(){

    },
    methods: {
      onSubmit() {
        console.log('onSubmit');
        this.$userlib.login(this.form.username, this.form.password, (err, obj) => {
          console.log('result ', err, obj);
          if (err) {
            alert(err)
          }
        })
      }
    }
  };


</script>
