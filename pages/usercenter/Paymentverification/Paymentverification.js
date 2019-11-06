// pages/usercenter/Paymentverification/Paymentverification.js
const request_01 = require("../../../utils/api/request_01.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexnum:0,
    iscode: false,
    second: 60,
    blank:0
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
  inputon:function(e){
    console.log(e.detail.value)
    
    if (e.target.dataset.index==4){
      console.log('输入完成')
    }
    if (e.target.dataset.index == 0 && e.detail.value == ''){
      return;
    }
    if (e.detail.value == '') {
      this.setData({ indexnum: e.target.dataset.index - 1 });
      return;
    }
    this.setData({ indexnum : e.target.dataset.index+1})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.blank){}
    this.opencode();
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
//   onShareAppMessage: function () {

//   }
	yueke(){
		let dat = {
			courseSectionId: '1188831408639053824',
			userId:wx.getStorageSync("userdata").userId
		}
		request_01.comYuyue(dat).then((res)=>{
			console.log(res.data);
		})
	}
})