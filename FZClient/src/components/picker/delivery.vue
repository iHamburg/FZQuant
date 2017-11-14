<template>
  <div class="page-picker">

    <button @click="popupVisible = !popupVisible">配送</button>

    <bl-popup v-model="popupVisible" position="bottom" style="width: 100%;">
        <bl-cust-picker  show-toolbar @cancel="cancel" @getValues="getValues">
            <div slot="content"  class="cust">
                <dl>
                    <dt>自提</dt>
                    <dd @click="ifSince = !ifSince">
                        <span class="checkicon" :class="{check : ifSince}">
                            <i></i>
                        </span>
                        <span>到店自提</span>
                    </dd>
                </dl>
                <dl>
                    <dt>物流</dt>
                    <dd @click="shiPing">
                        <div class="line">
                          <span class="checkicon" :class="{check : ifPost1}">
                              <i></i>
                          </span>
                          <span>包邮</span>
                        </div>
                    </dd>
                    <dd @click="shiPing">
                        <div class="line">
                          <span class="checkicon" :class="{check : ifPost2}">
                              <i></i>
                          </span>
                          <span>不包邮</span>
                        </div>
                    </dd>
                </dl>

            </div>
        </bl-cust-picker>
    </bl-popup>

    <!--遮罩-->
    <div v-if="popupVisible" @click="popupVisible = !popupVisible"><div class="modal-bg"></div></div>

  </div>
</template>

<style lang="scss" scoped>


.cust{
  width: 100%;
  background: #efeff4;
  color: #888;
  text-align: left;
  dt{
    width: 100%;
    font-size: .28rem;
    line-height: .64rem;
    padding: 0 0 0 .3rem;
  }
  dd{
    background: #fff;
    font-size: .34rem;
    color: #000;
    line-height: .88rem;
    padding: 0 0 0 .3rem;

  }
  .line{
    border-bottom:1px solid #d9d9d9;
  }

  .checkicon{
    float: left;
    margin: .2rem .2rem 0 0;
    i{
      width: .46rem;
      height: .46rem;
      border:1px solid #aaa;
      border-radius:50%;
      display: block;
    }
  }

}
  .check i{
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAAXNSR0IArs4c6QAABZNJREFUaAXNmm9MG2Ucx5/n7oB2riAvEGmMjrA0GzLUFQwu2QgwnQ6YmVvgrdmybrxYpnHBbUGpg8xNs0TF0bXJ3pm9IFsQdMg2ceqcwSCLcQ7cNE4TU1ZlswIZwto7v0+bK6Vc27u2B72E3t3z+/N8+rvf8+vzPAclSR42m30Zx4mbJEmsIURaJUl0JVzm4NpECJ2hlExJEvHg/iburwkC7Ttx4vD3lFIpma5pIsb797/7wOTkxDZJkraif0ATozY/1A39T3ie68nP587b7XZRmz1CoMWgq6uLHxi4thPRewvQD2uxjaH7I6J/0Ols74uhs0CkGtxme7OWUv87iG7xAi8paaBfIY6vu1xt36lxx8dTYlHOzbV8gCi/B928ePpJyFdgPOywWtfPDg9f/iaen5gRt9mOYpBNdQH6uXiOUiunp81mYSdy/79ofqOC79ljXyGKPuSdtDqasb7tdEgQhC2dnfbbSv1wSo3NzcdMknT/3NJBMyqp3Ofz9SLqBiXGBeCoFtTrnfxIv0GohBGtTSp3u32nlKQLBufYmP8wvq1NSXmJ2taUlVViwH49b8DOy/GmpjfW+/0iypK2+q73F0KdF5EI68JL5bxU8fulo+kGzYKC9AWndCw8QCHwpqaWLRCuCxem17VUuXt3y2aZKQCOkcv5/eSI3JiuZ0T+bcbK+AIfbrf4AqL9eLoCh3GVejziphA4cv/FMOGiXHIcR6qrK0hdXRUxGrNU94niEWDlWN3GX51qyxQoMuhduxpJY2Mdqa+vIdu344GrP+oZM+/x0KexCHhVvV1ymjL02rVzmenxjJOrV6+rdWzq7//yHHLcFxqpai0T1VOCvnvXS7q7L2hyKYpSLYePEk1WCSpHgz5+/BS5c8eryStjRsSpRZMVlPFLpskkFvT4+D+afAWVqUUAQz4mVKqPkhJLYGBNT88Qp/M0uXXrz5i2qYdmgSP5iDhbjas/qqoqiMGQRXJzs8m+fS+TwsJHohrrAR3sTDKhHJLMqD0rCEZGfgm1Go2GqPD6QSPUYOat1kpWChUn6yHCsAuWGgZDJikqejTQmpEhEKu1hNy48RvxeicCbXpCB1HoBMA3NOHmwWCDus+RkV+jwk9MTAXGQHidZiWPVY/EBqISE/XwZWUb6iEqVBLHaosGb7EUktLSVSHT1EMHBucwm2SNhnrReHHmTD+5eHFuYcJyvrh4ZciLHtBB5/RnBv5FqKcELiLhZRf6QbOIcwOoKkI/6uK03GEi50h4faHJtChy5wM/gTZbSw+KDFZAyR0VFU+SgoI8cunSICrMZHLOolrTj12u9q0Ck3Mc7cbvf9Lgg4M/RO0uVQJMN7oDzOwjO3v5WTT8lSrnevkB422TKfss8x/YV7ly5fNZ7F3cQ7rU6tVpKvxiUL7W0dEyyHyxqhI4Cgp4Fy7w1iA9DxSQkZqaNaFdrRA4Vs8+PIqD6YnN5id8c0NDg1/mm7cFh22uUUwB2CTkKVkhTc4fopK8H84SirjcaDZnYO5C534OZcGSnemFjRufeCWye8WlzN69R/JmZu4N4QE9FmmwuPcU05Hlz7hcB/6N7HdBxJlCR8ehvwWBYM+A/hFpsFj3bDBynLBZCZoxKIIzQWdn+2hW1rLypUkb2puTk11x8qT9d8aidCimSrgiqk2m233fgbYd4e06XWP1S9udzrZWVLiYK+G44DIgdkpfYpuOuNe8KyD7iH2m3/I8PeBwtF2OrReUqgZn6oi+gDcWNgzaVnyJh9R0EF+HXud5csjhaO+NrzunoQlcNmMvt7BE24aJGXsl/iwWr0ZZpvI8hlT4FPv1PWYz9xkCou8rcSUo9k8IlPqeh6waf6vxJYpwzsFTMaEyzCJnJ9Hmwf1NzEJ/IkToczhah+LlsFJf4W3/A3BpFtEkhdl/AAAAAElFTkSuQmCC) no-repeat center;
      background-size: 120%;
  }




.modal-bg{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.6);
  z-index: 19;

}

</style>
<script type="text/babel">

  export default {
    components: {
      'BlCustPicker': () => System.import('components/cloud-merchant/cust-picker'),
      'BlCheckBox': () => System.import('components/cloud-merchant/check-box')

    },

    methods: {
      cancel() {
        this.popupVisible = false;
      },
      getValues() {
        this.popupVisible = false
      },

      shiPing() {
        if (this.ifPost1 === false) {
          this.ifPost1 = true
          this.ifPost2 = false
        } else {
          this.ifPost1 = false
          this.ifPost2 = true
        }
      }
    },
    data() {
      return {
        isCheck: true,
        popupVisible: false,

        ifSince: false,
        ifPost1: false,
        ifPost2: false,
      };
    }
  };
</script>
