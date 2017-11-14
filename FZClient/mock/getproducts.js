/**
 * Created by an.han on 16/10/15.
 * 基于 express 的接口处理定义
 * See http://expressjs.com/zh-cn/4x/api.html
 */

module.exports = {
  api: '/mockapi/getproducts',
  response: function (req, res) {
    res.json(
      [
        {
          "name": '1'
        },
        {
          "name": '2'
        }
      ]
    )
  }
}
