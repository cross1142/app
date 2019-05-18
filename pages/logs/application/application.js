// pages/logs/application/application.js
import util from '../../../utils/httpserve.js'
import urls from '../../../utils/config.js'
import qs from '../../../utils/qs.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: '0',
    job: '1',
    course: '',
    uname: '',
    index: null,
    count: null,
    clazzArr:['前端开发','UI设计'],
    picker: ['高中', '专科', '本科','本科以上'],
    tel: '',
    age: '',
    result: '',
    school:'',
    major: '',
    nowDate: '',
    courseshow: false,
    startDate: '',
    date: '2019-5-16',
    wait: false,
    dormStartTime: ''
  },
  switch1Change(e) {
    this.setData({
      sex: e.detail.value === true? '0':'1'
    })
  },
  switch2Change(e) {
    this.setData({
      job: e.detail.value === true? '0': '1'
    })
  },
  radioChange(e){
    console.log(e.detail.value);
    this.setData({
      count: e.detail.value
    })
  },
  getname(e){
    this.setData({
      uname: e.detail.value
    })
  },
  getage(e){
    this.setData({
      age: e.detail.value
    })
  },
  getschool(e){
    this.setData({
      school: e.detail.value
    })
  },
  gettel(e){
    this.setData({
      tel: e.detail.value
    })
    var regNum = new RegExp('[0-9]', 'g');//判断用户输入的是否为数字
    // 电话号码的正则
    // var regNum = new RegExp (/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/);
    var rsNum = regNum.exec(e.detail.value);
    if (e.detail.value.trim() == ''){
      this.setData({
        result: '请输入联系方式!'
      })
    }
    if (!rsNum){
      this.setData({
        result: '格式不正确!'
      })
    }else{
      this.setData({
        result: ''
      })
    }
  },
  dateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  getprofessional(e){
    this.setData({
      major: e.detail.value
    })
  },
  bindPickerChange(e) {
    console.log(e.detail.value);
    if (e.detail.value != '0'){
      this.setData({
        courseshow: true
      })
    }else{
      this.setData({
        courseshow: false
      })
    }
    this.setData({
      index: e.detail.value
    })
  },
  mesgDialog(mesg){
    wx.showToast({
      title: mesg,
      icon: 'none',
      duration: 1000
    })
  },
  onsubmit(){
    var id= wx.getStorageSync('uid');
    console.log(id);
    let obj = {
      id: id,
      name: this.data.uname,
      age: this.data.age,
      sex: this.data.sex,
      tel: this.data.tel,
      school: this.data.school,
      education: this.data.index,
      major: this.data.major,
      dormStartTime : this.data.date,
      classType: this.data.count
    }
    if(this.data.uname.trim() == ''){
      this.mesgDialog('请输入用户名!')
    } else if (this.data.age.trim() == ''){
      this.mesgDialog('请输入年龄!')
    } else if (this.data.tel.trim() == ''){
      this.mesgDialog('请输入电话!')
    }else{
    util.phParams(urls.updateStudentInfo, obj )
    .then(res=>{
      if(res.code == 'success'){
        wx.navigateBack()
        wx.setStorage({
          key: 'wait',
          data: 'true',
        })
      }
    })
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      wx.request({
        url: 'http://59.110.138.169/admin/xy/lite/student/list',
        data: {
        },
        success(res) {
          console.log('学员列表',res.data);
        }
      })
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
    var date = new Date().toLocaleDateString();
    var newDate = date.replace(/\//g, '-')
    this.setData({
      startDate: newDate
    })
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