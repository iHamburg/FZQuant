<template>
  <div class="content" :style="{ 'height': brandHeight + 'px'}">

    <bl-bar barStyle="bar-dark-linear" ref="topbar">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"><i class="fback">返回</i></div>
        </div>
        <div slot="title">品牌目录</div>
    </bl-bar>

    <div class="brand">
        <div class="brand-list" :style="{ 'height': brandHeight + 'px'}"  ref="brand">
            <dl v-for="(item, index) in brands" class="scroll">
              <dt>{{ item.index}} </dt>
              <dd v-for="(key, val) in item.slip" :class="key.state" @click="checks(index, val)">{{ key.name }} <i></i></dd>
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
// import api from 'src/api/index'

export default {
  name: 'goodSales',

  data () {
    return {
      brandHeight: null,

      brands: [
        {
          "index": "0-9",
          "slip": [
              {"name": "21 forever", "state": ""},
              {"name": "3 more times", "state": ""}
          ]
        },
        {
          "index": "A",
          "slip": [
              {"name": "aforever", "state": "check"},
              {"name": "amore times", "state": ""},
              {"name": "aforever", "state": "check"},
              {"name": "amore times", "state": ""}
          ]
        },
        {
          "index": "B",
          "slip": [
              {"name": "bforever", "state": ""},
              {"name": "bmore times", "state": ""}
          ]
        },
        {
          "index": "C",
          "slip": [
              {"name": "cforever", "state": ""},
              {"name": "cmore times", "state": ""}
          ]
        },
        {
          "index": "D",
          "slip": [
              {"name": "dforever", "state": ""},
              {"name": "dmore times", "state": ""}
          ]
        },
        {
          "index": "E",
          "slip": [
              {"name": "eforever", "state": ""},
              {"name": "emore times", "state": ""}
          ]
        },
        {
          "index": "F",
          "slip": [
              {"name": "forever", "state": ""},
              {"name": "fmore times", "state": ""}
          ]
        },
        {
          "index": "G",
          "slip": [
              {"name": "gforever", "state": ""},
              {"name": "gmore times", "state": ""}
          ]
        },
        {
          "index": "H",
          "slip": [
              {"name": "horever", "state": ""},
              {"name": "hmore times", "state": ""}
          ]
        },
        {
          "index": "I",
          "slip": [
              {"name": "Ming", "state": ""},

          ]
        },
        {
          "index": "J",
          "slip": [
              {"name": "Ming", "state": ""},

          ]
        },
        {
          "index": "K",
          "slip": [
              {"name": "Ming", "state": ""},

          ]
        },
        {
          "index": "L",
          "slip": [
              {"name": "Ming", "state": ""},

          ]
        },
        {
          "index": "M",
          "slip": [
              {"name": "Ming", "state": ""},

          ]
        },
        {
          "index": "N",
          "slip": [
              {"name": "Ming", "state": ""},

          ]
        },
        {
          "index": "O",
          "slip": [
              {"name": "Ming", "state": ""},

          ]
        },
        {
          "index": "P",
          "slip": [
              {"name": "Ming", "state": ""},

          ]
        },
        {
          "index": "Q",
          "slip": [
              {"name": "Ming", "state": ""},

          ]
        },
        {
          "index": "R",
          "slip": [
              {"name": "Ming", "state": ""},

          ]
        },
        {
          "index": "S",
          "slip": [
              {"name": "Ming", "state": ""},

          ]
        },
        {
          "index": "T",
          "slip": [
              {"name": "Ming", "state": ""},

          ]
        },
        {
          "index": "U",
          "slip": [
              {"name": "Ming", "state": ""},

          ]
        },
        {
          "index": "V",
          "slip": [
              {"name": "Ming", "state": ""},

          ]
        },
        {
          "index": "W",
          "slip": [
              {"name": "Ming", "state": ""},

          ]
        },
        {
          "index": "X",
          "slip": [
              {"name": "Ming", "state": ""},

          ]
        },
        {
          "index": "Y",
          "slip": [
              {"name": "Ming", "state": ""},

          ]
        },
        {
          "index": "Z",
          "slip": [
              {"name": "Ming", "state": ""},

          ]
        }
      ],

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

  mounted() {
    this.$nextTick(function () {
      window.addEventListener('scroll', this.onScroll)
    })
    this.brandHeight = document.documentElement.clientHeight - this.$refs.topbar.$el.clientHeight;

    setTimeout(function() {
      document.querySelector('.brand-list').scrollTop = 1000;
    }, 1000)
  },
  methods: {
    checks (index, val) {
      var state = this.brands[index].slip[val].state;
      if (!state) {
        this.brands[index].slip[val].state = 'check';
      } else {
        this.brands[index].slip[val].state = '';
      }
    },
    onScroll (data, letkey) {
      let soll = document.querySelectorAll('.scroll');
      if (!soll[letkey]) {
        this.$refs.brand.scrollTop = 0
      } else {
        let total = soll[letkey].offsetTop;
        this.$refs.brand.scrollTop = total;
      }
    }
  },
  watch: {
    brands() {
      this.onScroll();
    }
  }
}
</script>
