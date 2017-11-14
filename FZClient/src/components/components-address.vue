<template>
  <div class="page-picker">
    <h1 class="page-title">Address Picker</h1>


    <div class="page-picker-wrapper">
      <bl-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></bl-picker>
    </div>
    <p class="page-picker-desc">地址:{{addressCountry}} {{ addressProvince }} {{ addressCity }}</p>


    <hr>
    <button @click="popupVisible = !popupVisible">配送</button>

    <button @click="popupVisible2 = !popupVisible2">审核不通过</button>

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

    <bl-popup v-model="popupVisible2" position="bottom" style="width: 100%;">
        <bl-cust-picker  show-toolbar @cancel="cancel2" @getValues="getValues2">
            <div slot="content"  class="cust">
                <dl>
                    <dt>请选择审核不通过的理由</dt>
                    <dd v-for="(item, index) in itemcards" @click="chooseAttr(index, itemcards)">
                      <div class="line">
                        <span class="checkicon" :class="item.state">
                            <i></i>
                        </span>
                        <span>{{ item.name }}</span>
                      </div>
                    </dd>
                </dl>
            </div>
        </bl-cust-picker>
    </bl-popup>

    <!--遮罩-->
    <div v-if="popupVisible || popupVisible2" @click="popupVisible = !popupVisible"><div class="modal-bg"></div></div>

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

<script>
  
  const country = {
    '中国': ['北京', '广东', '上海', '天津', '重庆'],
    '德国': ['柏林'],
    '俄罗斯': ['莫斯科'],
    '美国': ['华盛顿']
  };

  const chinaAddress = {
    '北京': ['北京'],
    '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
    '上海': ['上海'],
    '天津': ['天津'],
    '重庆': ['重庆']
  }

  const germanyAddress = {
    '柏林': ['柏林'],
    '汉堡': ['汉堡']
  }

  const russiaAddress = {
    '莫斯科': ['莫斯科', '莫斯科', '莫斯科'],
    '圣彼得堡': ['圣彼得堡']
  }

  const usaAddress = {
    '华盛顿': ['华盛顿'],
    '纽约': ['纽约']
  }
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

      cancel2() {
        this.popupVisible2 = false;
      },
      getValues2() {
        this.popupVisible2 = false
      },

      shiPing() {
        if (this.ifPost1 === false) {
          this.ifPost1 = true
          this.ifPost2 = false
        } else {
          this.ifPost1 = false
          this.ifPost2 = true
        }
      },
      chooseAttr(index, arrs) {
        let state = this.itemcards[index].state;
        if (state == "check") {
          arrs[index].state = ""
        } else {
          arrs[index].state = "check"
        }
      },

      onAddressChange(picker, values) {
        // console.log(values);
        switch (values[0]) {
          case '中国':
            this.addressSlots[2].values = Object.keys(chinaAddress);
            picker.setSlotValues(2, chinaAddress[values[1]]);
            break;
          case '德国':
            this.addressSlots[2].values = Object.keys(germanyAddress);
            picker.setSlotValues(2, germanyAddress[values[1]]);
            break;
          case '俄罗斯':
            this.addressSlots[2].values = Object.keys(russiaAddress);
            picker.setSlotValues(2, russiaAddress[values[1]]);
            break;
          case '美国':
            this.addressSlots[2].values = Object.keys(usaAddress);
            picker.setSlotValues(2, usaAddress[values[1]]);
            break;
          default:
            picker.setSlotValues(2, chinaAddress[values[1]]);
        }

        this.addressCountry = values[0];
        this.addressProvince = values[1];
        this.addressCity = values[2];
      }
    },
    data() {
      return {
        isCheck: true,
        popupVisible: false,
        popupVisible2: false,

        ifSince: false,
        ifPost1: false,
        ifPost2: false,

        itemcards: [
          {'name': '品名错误', 'state': ''},
          {'name': '规格错误', 'state': ''},
          {'name': '图片错误', 'state': ''},
          {'name': '品牌错误', 'state': ''},
          {'name': '重量错误', 'state': ''},
          {'name': '其他原因，请与审核人确认', 'state': ''}
        ],

        addressSlots: [
          {
            flex: 1,
            values: Object.keys(country),
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: Object.keys(chinaAddress),
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            values: Object.keys(chinaAddress),
            className: 'slot5',
            textAlign: 'center'
          }

        ],

        addressCountry: '中国',
        addressProvince: '北京',
        addressCity: '北京'
      };
    }
  };
</script>
