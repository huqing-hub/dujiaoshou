// pages/login/login.js
const api = require('../../../utils/api/myRequests.js');
const tool = require('../../../utils/publics/tool.js');
const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        resolve(res)
      }
    })
  })
}
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    session_key: null,
    getphone: false,//获取手机号码
  },
  /**
   * 获取手机号
   */
  getPhoneNumber: function (e) {
    console.log(e)
    if (this.data.session_key==null){
      tool.alert("注册失败，请稍后试试");
      return;
    }
    if (e.detail.encryptedData == undefined) {
      tool.alert("为了用户体验，请先注册我们的会员");
      return;
    }
    // encodeURIComponent
    console.log(encodeURIComponent(JSON.stringify({ aesIv: e.detail.iv, EncryptedData: e.detail.encryptedData, SessionKey: this.data.session_key })))
    api.decryptnumber({ AesIv: e.detail.iv, EncryptedData: e.detail.encryptedData, SessionKey: this.data.session_key }).then(res => {
      console.log(res)
      tool.loading_h();
      if (res.data.Code === 200) {
        wx.redirectTo({
          url: "/pages/userStart/bindingPhone/bindingPhone?phone=" + res.data.Data.phoneNumber
        });
      } else {
        tool.alert("登录失败");
      }
    })
  },
  logincode() {
    var _this = this;
    login().then(res => {
      return res.code;
    }).then(res => {
      tool.loading("");
      api.getSessionKey({ Code: encodeURIComponent(res) }).then(dat => {
        console.log(dat)
        tool.loading_h();
        if (dat.data.Code == 200) {
          if (dat.data.Data.openid != null) {
            wx.setStorageSync('openid', dat.data.Data.openid);
            _this.setData({ session_key: dat.data.Data.session_key });
          }
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.logincode();
    wx.removeStorage({
      key: 'token',
      success(res) {
        console.log(res)
      }
    });
    wx.removeStorage({
      key: 'userdata',
      success(res) {
        console.log(res)
      }
    });
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