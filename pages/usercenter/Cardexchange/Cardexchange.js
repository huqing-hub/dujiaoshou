// pages/usercenter/Cardexchange/Cardexchange.js
const api = require('../../../utils/api/myRequests.js');
const tool = require('../../../utils/publics/tool.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carddat: null,
    code: null
  },
  useCoupons(e) {
    if (this.data.carddat.ticketId==undefined){
      tool.alert('参数有误');
      return;
    }
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '是否确定使用该卷？',
      success(res) {
        if (res.confirm) {
          api.useCoupon({
            ticketId: _this.data.carddat.ticketId
          }).then((res) => {
            tool.loading_h();
            if (res.data.Code == 200) {
              tool.alert('使用成功');
              _this.setData({ code: '', carddat:null });
            } else {
              tool.alert('使用失败');
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  oninput(e) {
    this.setData({ code: e.detail.value })
  },
  exchange() {
    if (this.data.code == null) {
      tool.alert('请填写正确的兑换码');
      return;
    }
    if (app.globalData.udata.userId == null || this.data.code == null) {
      tool.alert('参数缺失');
      return;
    }
    tool.loading();
    let _this = this;
    api.exCoupon({
      ticketId: this.data.code,
      userId: app.globalData.udata.userId
    }).then((res) => {
      tool.loading_h();
      console.log(res)
      if (res.data.Code == 200) {
        if (!res.data.Data){
          tool.alert('兑换码错误');
          return;
        }
        _this.setData({ carddat: res.data.Data });
        console.log(_this.data.carddat)
      } else {
        tool.alert('查询失败');
      }
    })
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