import qs from './qs.js'
export default {
  /**
   * get 方式
   * 无参请求
   */
  gnServe(url) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '正在加载',
        mask: true
      })
      wx.request({
        url: url,
        success(res) {
          wx.hideLoading();
          resolve(res.data);
        },
        fail(err) {
          wx.hideLoading();
          console.log(err, "err======");
        }
      })
    })
  },

  /**
   * get 方式
   * 带参请求
   */
  ghServe(url, params) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '正在加载',
        mask: true
      })
      wx.request({
        url: url,
        data: params,
        success(res) {
          wx.hideLoading();
          resolve(res);
        },
        fail(err) {
          wx.hideLoading();
          console.log(err, "err======");
        }
      })
    })
  },

  /**
   * 有参数的网络请求封装
   */
  phParams: function (url, params, cb) {
    params = {
      xyUserLite: params
    }
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '正在加载',
        mask: true
      })
      wx.request({
        url: url,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(params, { arrayFormat: 'repeat', allowDots: true, allowDots: true }),
        method: 'POST',
        success: function (res) {
          wx.hideLoading();
          resolve(res.data);
        },
        fail: function (err) {
          wx.hideLoading();
          console.log(err)
        }
      })
    })
  },
}
