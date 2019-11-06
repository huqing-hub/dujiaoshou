// pages/course/Coursedetails/Coursedetails.js
const app = new getApp();
const api = require('../../../utils/api/myRequests.js');
const tool = require('../../../utils/publics/tool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId:null,
    starOption: {
      type: 5,//几颗星
      width: 24,//星星大小
      spacing: 10,//星星间距
      score: 0,//默认分数
    },
    tcourese: {
      data:{},
      index:{}
    },//当前课堂
    courseId: null,
    coursedata: {},
    statustxt: ['已完成','正在进行时','未开始']
  },
  coursecancel(){
    if (app.globalData.udata.userId == null || this.data.courseId == null || this.data.coursedata.applyId == null) {
      tool.alert('参数缺失');
      return;
    }
    tool.loading();
    let _this = this;
    api.getCourse({
      userId: app.globalData.udata.userId,
      courseId: this.data.courseId,
      applyId: this.data.coursedata.applyId,
      storeId: this.data.storeId
    }).then((res) => {
      tool.loading_h();
      if (res.data.Code == 200) {
        tool.alert('取消成功');
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          });
        },200);
      } else {
        tool.alert('取消失败');
      }
    });
  },
  cancel(){
    var _this = this;
    wx.showModal({
      title: '确定取消该课程吗？',
      content: '会立即取消课程',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确认回调')
          _this.coursecancel();
        } else {
          console.log('点击取消回调')
        }
      }
    });
  },
  getdetails() {
    if (this.data.courseId == null) {
      tool.alert('参数缺失');
      return;
    }
    tool.loading();
    let _this = this;
    api.mycuresDetail({
      userId: app.globalData.udata.userId,
      courseId: this.data.courseId,
      storeId: this.data.storeId
    }).then((res) => {
      tool.loading_h();
      console.log(res)
      if (res.data.Code == 200) {
        _this.setData({ coursedata: res.data.Data, 'starOption.score': res.data.Data.teacherScore});
        for (var x in res.data.Data.classProgress) {
          console.log(res.data.Data.classProgress[x].status)
          if (res.data.Data.classProgress[x].status==2){
            _this.setData({ 'tcourese.data': res.data.Data.classProgress[x],'tcourese.index':x})
            return;
          }
        }
        console.log(_this.data.starOption)
      } else {
        tool.alert('获取课程详情失败');
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id == undefined || options.storeId==undefined){
      tool.alert('参数错误');
      return;
    }
    this.setData({ courseId: options.id, storeId: options.storeId });
    this.getdetails();
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