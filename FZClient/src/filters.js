
/**
 * Created by zhangyiqing on 17/4/26.
 *
 * Filter
 */

import utils from './utils'

export default {
  'number-util' (val) {
    return utils.fmtDate(new Date(val), 'MM-dd')
  },

  testFilter(val) {
    return val + 'ssss';
  },
  'plusXing-util' (val) {
    return utils.plusXing(val, 3, 4)
  },

  'goodsState-util'(val) {
    return utils.goodsState(val)
  },

  /**
   * 货币 后缀加.00
   * @param value
   * @return {string}
   */
  'toFixed2' (value) {
    return Number(value).toFixed(2)
  }
}
