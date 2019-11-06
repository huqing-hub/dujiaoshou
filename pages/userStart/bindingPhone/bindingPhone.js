// pages/userStart/bindingPhone/bindingPhone.js
const api = require('../../../utils/api/myRequests.js');
const tool = require('../../../utils/publics/tool.js');

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iscode: false,
    second: 60,
    isinput:false,
    phone: null,
    code: null,
    ucode:null,
    invitation:null
  },
  login(){
    if(this.data.code==null){
      tool.alert('请先获取验证码');
      return;
    }
    if (this.data.ucode == null) {
      tool.alert('请输入验证码');
      return;
    }
    // if (this.data.ucode != this.data.code) {
    //   tool.alert('验证码错误');
    //   return;
    // }
    api.getOpenid({
      phone: this.data.phone,
      verifyCode: this.data.ucode,
      invitation:''
    }).then((res) => {
      console.log()
      if (res.data.Code == 200) {
        wx.setStorageSync('userdata', res.data.Data);
        wx.setStorageSync('token', res.data.Data.tokenKey);
        app.globalData.udata = res.data.Data;
        app.globalData.ulogin = true;
        app.globalData.token = res.data.Data.tokenKey;
        res.data.Data.identity == 1 ? app.globalData.footertab = true : app.globalData.footertab = false;
        wx.redirectTo({
          url: './../../usercenter/index/index'
        });
      } else {
        tool.alert('注册失败');
      }
    })

  },
  getphonecode() {
    // Getcode
    api.Getcode({
      phone: this.data.phone,
    }).then((res) => {
      console.log(res)
      if (res.data.Code == 200) {
        this.setData({ code: res.data.Data });
      } else {
        tool.alert('获取失败');
      }
    })
  },
  oninput(e) {
    if (e.target.dataset.value=='code'){
      this.setData({ ucode: e.detail.value});
      return;
    }
    if (e.target.dataset.value == 'invitation') {
      this.setData({ invitation: e.detail.value });
      return;
    }
    this.setData({ phone: e.detail.value });
  },
  opencode() {
    var _this = this;
    if (this.data.second != 60) {
      return;
    }
    if (this.data.phone == null || this.data.phone.length != 11) {
      console.log(this.data.phone)
      tool.alert('请输入手机号码');
      return;
    }
    this.getphonecode();
    this.setData({ iscode: true });
    let result = setInterval(() => {
      _this.setData({ second: --this.data.second });
      if (this.data.second < 0) {
        clearInterval(result);
        _this.setData({ iscode: false, second: 60 });
        console.log(this.data.iscode)
      }
    }, 1000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.phone)
    if (options.phone!=undefined){
      this.setData({isinput:true});
      this.setData({ phone : options.phone});
    }
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