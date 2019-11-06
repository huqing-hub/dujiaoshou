// pages/usercenter/index/index.js
var app = getApp();
const api = require('../../../utils/api/myRequests.js');
const tool = require('../../../utils/publics/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userdata: null,
    ulogin:false,//是否登录
    utype:1,//用户类型 1非VIP 2vip 3老师
    useris:null//
    
  },
  getdata(){
    console.log(app.globalData.udata.userId)
    if (app.globalData.udata.userId==null){
      tool.alert('参数丢失');
      return;
    }
    tool.loading();
    let _this = this;
    api.uDetail({
      userId: app.globalData.udata.userId
    }).then((res) => {
      tool.loading_h();
      console.log(res)
      if (res.data.Code == 200) {
        app.globalData.udata = res.data.Data;
        _this.setData({ userdata : res.data.Data })
        console.log(res.data.Data)
      } else {
        tool.alert('获取个人信息失败');
      }
    })
  },
  blank(e){
    if (!e.currentTarget.dataset.index){
      return;
    }
    if (e.currentTarget.dataset.index.indexOf('top-up') > -1) {
      wx.navigateTo({
        url: './../../' + e.currentTarget.dataset.index
      });
      return;
    }
    if (e.currentTarget.dataset.index.indexOf('userStart')>-1){
      wx.navigateTo({
        url: './../..'+e.currentTarget.dataset.index
      });
      return;
    }
    if (e.currentTarget.dataset.index.indexOf('fill_info') > -1) {
      wx.navigateTo({
        url: './../..' + e.currentTarget.dataset.index
      });
      return;
    }
    console.log(e.currentTarget.dataset.index.indexOf('page') > -1);
    wx.navigateTo({
      url: './../' + e.currentTarget.dataset.index
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    if (app.globalData.ulogin) {
      this.getdata();
    }
    //是否为老师
    this.setData({ useris: app.globalData.footertab, ulogin: app.globalData.ulogin })
    // console.log(app.globalData.footertab);
    console.log(app.globalData)
    // console.log(this.)
    if (!app.globalData.ulogin) {
      return;
    }    
    //判断是否开通了会员
    if (this.data.useris) {
      this.setData({ utype: 3 })
    } else if (app.globalData.udata.isVip) {
      this.setData({ utype: 2 })
    }
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