import util from '../../../utils/httpserve.js'
import urls from '../../../utils/config.js'
// pages/logs/status/status.js
Page({
      
  /**
   * 页面的初始数据
   */
  data: {
    studentDetail: {},
    educationList:['高中','专科','本科','本科以上'],
    code: 0,
    codeType: '',
    classType: '',
    applyStudy: true,
    sex: ''
  },
  /**
   * 获取学院详细信息
   */
  getStudentDetail() {
    let id = wx.getStorageSync('uid')
    util.ghServe(urls.getStudentInfo, { id: id })
      .then(res => {
        console.log('性别',res.data.data);
        wx.setStorage({
          key: 'sex',
          data: res.data.data.sex,
        })
        this.setData({
          classType: res.data.data.classType
        })
        switch (res.data.data.status) {
          case '0':
            if (res.data.data.manID) {
              this.setData({
                applyStudy: false
              })
              res.data.data.status = "正在申请";
            } else {
              this.setData({
                applyStudy: true
              })
              res.data.data.status = "试听申请成功";
            }
            break;
          case '1':
            if (res.data.data.manID) {
              this.setData({
                applyStudy: false
              })
              res.data.data.status = "等待申请审核";
            } else {
              this.setData({
                applyStudy: true
              })
              res.data.data.status = "试听申请成功";
            }
            break;
          case '2':
            if (res.data.data.manID) {
              this.setData({
                applyStudy: false
              })
            }
            res.data.data.status = "入学申请成功";
            break;
          case '3':
            if (res.data.data.manID) {
              this.setData({
                applyStudy: false
              })
            }
            res.data.data.status = "毕业";
            break;
          default:
            break;
        }
        this.setData({
          studentDetail: res.data.data
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStudentDetail()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getStudentDetail()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})