import api from '../../../utils/api.js'
import util from '../../../utils/httpserve.js'
import urls from '../../../utils/config.js'
import qs from '../../../utils/qs.js'
// pages/logs/apply-study/apply-study.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    dormList:[],
    index: null,
    classArr:[],
    count: null,
    dormAddressShow:false,
    startDate: '',
    date: '2019-5-16',
    manID:'',
    tel2:'',
    clazzDetail:'',
    address:'',
    dormLs:[]
  },
/**
 * 地址选择
 */
  RegionChange(e){
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 宿舍地址
   */
  dormAddress(e){
    this.setData({
      address: e.detail.value
    })
  },
  /**
   * 宿舍选择
   */
  PickerChange(e){
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })  
  },
  /**
   * 获取班级列表
   */
  getClassName(e){
    this.setData({
      count: e.detail.value
    })
  },
  /**
   * 动态绑定身份信息
   */
  changemanId(e){
    this.setData({
      manID: e.detail.value
    })
  },
  /**
   * 紧急联系人
   */
  phoneChange(e){
    this.setData({
      tel2: e.detail.value
    })
  },
  /**
   * 选择日期
   */
  dateChange(e){
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 提交申请
   */
  mesgDialog(mesg) {
    wx.showToast({
      title: mesg,
      icon: 'none',
      duration: 1000
    })
  },
  onsubmit(){
    if (this.data.manID.trim() == '') {
      this.mesgDialog('请输入身份证号!')
    } else if (this.data.tel2.trim() == '') {
      this.mesgDialog('请输入电话!')
    } else if (!this.data.count) {
      this.mesgDialog('请选择班级!')
    } else if (!this.data.index) {
      this.mesgDialog('请选择宿舍!')
    }
    else if (!this.data.index) {
      this.mesgDialog('请选择宿舍!')
    }else{
      const id = wx.getStorageSync('uid');
      const classId = this.data.clazzDetail[this.data.count].id;
      const className = this.data.classArr[this.data.count];
      var dormName = '';
      var dormId = '';
      var address = ''
      if (this.data.index == ~~(this.data.dormList.length - 1)) {
        address = this.data.address
      } else {
        dormName = this.data.dormList[this.data.index];
        dormId = this.data.dormLs[this.data.index].id;
      }
      let obj = {
        id: id,
        manID: this.data.manID,
        tel2: this.data.tel2,
        classId: classId,
        classname: className,
        dormname: dormName,
        dormId: dormId,
        address:address
      }
    util.phParams(urls.updateStudentInfo, obj)
    .then(res=>{
      console.log(res);
      if (res.code === 'success'){
        wx.switchTab({
          url: '/pages/logs/logs',
        })
      }
    })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    api.getDormLs()
    .then(res=>{
      console.log('宿舍列表',res.data);
      var dormArr = [];
      var dormLs = [];
      var dormSex = wx.getStorageSync('sex');
      res.data.list.forEach(item=>{
        if (item.type == ~~(dormSex)){
        dormArr.push(item.name);
        dormLs.push(item);
        }
      })
      dormArr.push('不住宿');
      this.setData({
        dormList: dormArr ,
        dormLs: dormLs
      })
    })
    api.getClassLs()
    .then(res=>{
      console.log(res.data)
      var classNameArr = [];
      var clazz = [];
      res.data.list.forEach(item=>{
        if (item.type == ~~(options.classType)){
        classNameArr.push(item.className);
        clazz.push(item);
        }
        that.setData({
          classArr: classNameArr,
          clazzDetail: clazz
        })
      })

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
/**
 * 单选
 */
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