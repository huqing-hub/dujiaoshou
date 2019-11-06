// pages/About/Chooseteacher/Chooseteacher.js
import tool from '../../../utils/publics/tool.js'
const api = require('../../../utils/api/myRequests.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdata:[],
  },
  bank(e){
    console.log(e)
    if (e.currentTarget.dataset.id==undefined){
      tool.alert('参数缺失');
      return;
    }
    // wx.redirectTo({
    //   url: '/pages/About/Aboutclass/Aboutclass?id=' + e.currentTarget.dataset.id
    // });
  },
  getlist(id) {
    // console.log(app.globalData.udata.userId)
    tool.loading("正在加载中")
    let _this = this;
    api.allTeacher({
     
    }).then((res) => {
      console.log(res)
      tool.loading_h();
      if (res.data.Code == 200) {
        _this.setData({ listdata: res.data.Data });
      } else {
        // tool.alert('获取店铺列表失败');
      }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlist(options.storeid);
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