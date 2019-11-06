// pages/usercenter/Changephone/Changephone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iscode: false,
    second: 60
  },
  opencode() {
    var _this = this;
    if (this.data.second != 60) {
      return;
    }
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