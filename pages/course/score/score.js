// pages/course/score/score.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starOption:{
      type: 5,//几颗星
      width: 40,//星星大小
      spacing: 16,//星星间距
      score: 0//默认分数
    },
    formdata:{
      teacherScore:null,
      teacherContent:null,
      courseScore:null,
      courseContent:null,
      serviceScore:null,
      serviceContent:null
    }
  },
  submit(){
    console.log(this.data.formdata)
  },
  /**
   * 输入数据
   */
  oninput(e){
    this.data.formdata[e.currentTarget.dataset.index] = e.detail.value;
    this.setData({ formdata: this.data.formdata });
  },
  /**
   * 星星回调事件
   */
  curStar(e){
    this.data.formdata[e.currentTarget.dataset.type] = e.detail.star;
    this.setData({ formdata: this.data.formdata});
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