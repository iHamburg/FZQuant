<template>
  <div class="ticketlist">
    <div class="content">
      <bl-bar barStyle="bar-dark-linear">
        <div class="button" slot="left-button" @click="$router.go(-1)">
          <div class="iconfont arrow-back"></div>
        </div>
        <div slot="title">产地</div>
      </bl-bar>
    </div>

    <bl-popup v-model="popupVisibleAddressPicker" position="bottom" style="width: 100%;">
      <bl-picker ref="addressPicker" :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></bl-picker>
    </bl-popup>
    <div class="bl-address-picker-box">
      <bl-button type="other" size="middle" @click="popupVisibleAddressPicker = !popupVisibleAddressPicker">bl-address-picker</bl-button>
    </div>


  </div>
</template>

<script>
import allocationbond from 'components/choose-coupons/distribution'
import address from "../../static/address.json"
// import networklib from 'src/libs/networklib';

export default {
  name: 'goodsSource',
  components: {
    allocationbond
  },
  mounted() {

  },
  methods: {
    /*cityPicker: function () {
      console.log('选择产地');
      $("#home-city").cityPicker({
        title: "选择目的地",
        showDistrict: false,
        onChange: function (picker, values, displayValues) {
          console.log(values, displayValues);
        }
      });
    },*/
    onAddressChange(picker, values) {
      picker.setSlotValues(1, address[values[0]]);
      this.addressProvince = values[0];
      this.addressCity = values[1];
    },
  },
  data () {
    return {
      popupVisibleAddressPicker: false,
      items: [],
      couponTemplateId: null,
      addressSlots: [
        {
          flex: 1,
          values: Object.keys(address),
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['北京'],
          className: 'slot3',
          textAlign: 'center'
        }
      ],
    }
  }
}
</script>
