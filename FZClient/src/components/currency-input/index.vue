<template>
    <input type="tel" class="vueinput" :style=inputWidth :placeholder="placeholderStr" :readonly="readonlyBool"
      ref="input"
      v-bind:value="value"
      v-on:input="updateValue($event.target.value)"
      v-on:focus="selectAll"

    >
    <!-- v-on:blur="formatValue" -->
</template>

<script>

export default {

  name: 'currency-input',

  data () {
    return {
    };
  },

  props: {
    value: {  //传入的值
      type: Number,
      default: 0
    },
    maxNumber: {    //输入的最大值
      type: String,
      default: '99999999999999'
    },
    minNumber: {   // 支持输入的最小值
      type: String,
      default: '-99999999999999'
    },
    inputWidth: {  // 输入框的宽度样式
      type: String,
      default: 'width:100%'
    },
    // 3.输入纯数字支持前面输入0，和位数。 但是数据通过  otherInput 回传。
    inputType: {  //输入框的类型，1、支持输入小数，2、为纯数字（不支持0开头）
      type: String,
      default: '1'
    },
    placeholderStr: {  // 提示文案
      type: String,
      default: ''
    },
    readonlyBool: {  // 是否是只读，true 不能输入
      type: Boolean,
      default: false
    },
    numberLenght: { //支持输入字符的个数 对于type=3设置
      type: Number,
      default: 10000
    },
    initStr: {  // 第一次输入的值.当有值时会展示在输入框 对于type=3设置
      type: String,
      default: '@%¥#'
    },
  },

  mounted: function () {
    if (this.inputType != 1) {
      if (this.value == -1 && this.$refs.input.value == -1 && this.initStr !== '@%¥#') {
        this.$refs.input.value = this.initStr;
      }
    }
  },
  created() {

  },
  activated() {
    if (this.inputType != 1) {
      if (this.value == -1 && this.$refs.input.value == -1 && this.initStr !== '@%¥#') {
        this.$refs.input.value = this.initStr;
      }
    }
  },
  methods: {
    // 输入内容改变执行
    updateValue: function (value) {
      // console.log('updateValue:', value)
      var result;
      if (this.inputType == 1) {
        result = this.parse(value, this.value)
      } else if (this.inputType == 2) {
        result = this.parse2(value, this.value)
      } else if (this.inputType == 3) {
        result = this.parse3(value, this.value)
      }
      //console.log(' ---  ', result.value, ' -- ' + value)
      if (this.inputType == 1 || this.inputType == 2) {
        if (result.value === '') {
          this.$emit('input', Number(-1))
          setTimeout(() => {
            this.$refs.input.value = ''
          }, 10)
        } else {
          this.$emit('input', Number(result.value))
        }
      } else {
        this.$emit('otherInput', result.value)
      }
      this.$refs.input.value = result.value
    },
    activatedUpdate() {
      //初始化时 显示调用会将 -1 转成空 展示 placeholder
      if ((this.inputType == 2 || this.inputType == 3) && this.value == -1) {
        this.$refs.input.value = '';
      }
    },
    //数据格式化
    formatValue: function () {
      // console.log('value:', this.value)
      this.$refs.input.value = this.format(this.value)
    },
    // 输入框获得焦点执行
    selectAll: function (event) {
      // Workaround for Safari bug
      // http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome
      if (this.inputType == 2 && !this.readonlyBool) {
      } else {
        setTimeout(function () {
          event.target.select()
        }, 0)
      }
    },
    //  格式化方法
    format: function (number) {
      return (Math.trunc(number * 100) / 100).toFixed(2)
    },
    //  支持 输入小数
    parse: function (newString, oldNumber) {
      var CleanParse = function (value) {
        return { value: value }
      }
      var CurrencyWarning = function (warning, value) {
        return {
          warning: warning,
          value: value,
          attempt: newString
        }
      }
      var NotAValidDollarAmountWarning = function (value) {
        return new CurrencyWarning(newString + ' is not a valid dollar amount', value)
      }
      var AutomaticConversionWarning = function (value) {
        return new CurrencyWarning(newString + ' was automatically converted to ' + value, value)
      }

      var newNumber = Number(newString)
      var indexOfDot = newString.indexOf('.')
      var indexOfE = newString.indexOf('e')

      if (isNaN(newNumber)) {
        if (
          indexOfDot === -1 &&
          indexOfE > 0 &&
          indexOfE === newString.length - 1 &&
          Number(newString.slice(0, indexOfE)) !== 0
        ) {
          return new CleanParse(oldNumber)
        } else {
          return new NotAValidDollarAmountWarning(oldNumber)
        }
      }

      var newCurrencyString = this.format(newNumber)
      var newCurrencyNumber = Number(newCurrencyString)

      if (newCurrencyNumber === newNumber) {
        if (indexOfE !== -1 && indexOfE === newString.length - 2) {
          return new AutomaticConversionWarning(newNumber)
        } else {
          return new CleanParse(newNumber)
        }
      } else {
        return new NotAValidDollarAmountWarning(
          newNumber > newCurrencyNumber
            ? newCurrencyNumber
            : oldNumber
        )
      }
    },
    //只能输入数字 不能0开头 可以控制大小
    parse2: function (newString, oldNumber) {
      // console.log('只能输入数字---newString:', newString, ', oldNumber:', oldNumber)
      var CleanParse = function (value) {
        return { value: value }
      }
      var CurrencyWarning = function (warning, value) {
        return {
          warning: warning,
          value: value,
          attempt: newString
        }
      }
      var NotAValidDollarAmountWarning = function (value) {
        return new CurrencyWarning(' is not a valid dollar amount', value)
      }
      var temp = newString.replace(/\D/g, '');
      //console.log(newString, '---' + temp);
      if (temp !== '' && temp == 0) {
        return new NotAValidDollarAmountWarning(0)
      }
      if (this.maxNumber != '99999999999999' && temp > Number(this.maxNumber)) {
        temp = this.maxNumber;
      } else if (this.minNumber != '-99999999999999' && temp < Number(this.minNumber)) {
        temp = this.minNumber;
      }
      return new NotAValidDollarAmountWarning(temp)
    },
    //只能输入数字 没有控制区间 支持位数
    parse3(newString, oldNumber) {
     // console.log('只能输入数字33---newString:', newString, ', oldNumber:', oldNumber)
      var CleanParse = function (value) {
        return { value: value }
      }
      var CurrencyWarning = function (warning, value) {
        return {
          warning: warning,
          value: value,
          attempt: newString
        }
      }
      var NotAValidDollarAmountWarning = function (value) {
        return new CurrencyWarning(' is not a valid dollar amount', value)
      }
      var temp = newString.replace(/\D/g, '');
      if (temp.length > this.numberLenght) {
        temp = temp.substring(0, this.numberLenght)
      }
      //console.log(newString, '---' + temp.length);
      return new NotAValidDollarAmountWarning(temp)
    },
  }
};
</script>

<style lang="scss">
.vueinput{
  border:0;
}
</style>
