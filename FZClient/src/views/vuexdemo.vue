<template>
  <div class="vuexdemo">
    <ul v-for="(val, key) in products">
      <li>val "{{ val.name }}" - key {{ key }}</li>
    </ul>
  </div>
</template>

<script>
// 导入vuex
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'vuexdemo',

  data () {
    return {

    };
  },
  computed: {
    ...mapGetters({
      products: 'allProducts'
    }),
    total () {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0)
    }
  },
  methods: {
    ...mapActions({
      addToCartMethod: 'addToCart'
    }),
    checkout (params) {
      this.$store.dispatch('addToCart', 'he')
    }
  },
  created() {
    this.$store.dispatch('getAllProducts').then(() => alert('success'), () => alert('fail'))
  }
};
</script>
