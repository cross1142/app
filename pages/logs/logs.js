//logs.js
const util = require('../../utils/util.js')
import utilsList from '../../utils/httpserve.js'
import api from '../../utils/api.js'
import urls from '../../utils/config.js'

Page({
  data: {
    avatar:'',
    userName: '',
    butShow: true,
    hasInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    wait: false

  },
  onLoad: function () {
    const uid =  wx.getStorageSync('uid');
    const userInfo = wx.getStorageSync("userInfo");
    if(!uid){
      wx.login({
        success(res) {
          if (res.code) {
            // 发起网络请求
            wx.request({
              url: 'http://59.110.138.169/admin/xy/lite/student/onLogin',
              data: {
                code: res.code
              },
              success(res) {
                console.log(res);
                wx.setStorageSync("uid", res.data.data.id);
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
    if (userInfo) {
      console.log('userInfo',userInfo);
      this.setData({
        avatar: userInfo.avatarUrl,
        userName: userInfo.nickName,
        hasInfo: true
      })
    }
    utilsList.ghServe(urls.getStudentInfo, {id:uid})
    .then(res=>{
      console.log(res.data.data);
      if (res.data.data.status >= 0 && res.data.data.name){
        console.log('hah')
        this.setData({
          wait: true
        })
      }else{
        this.setData({
          wait: false
        })
      }
    })
  },
  onShow: function () {
    const wait = wx.getStorageSync('wait');
    this.setData({
      wait: wait
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo,
    })
    this.setData({
      avatar: e.detail.userInfo.avatarUrl,
      userName: e.detail.userInfo.nickName,
      butShow: false
    })
  }
})

