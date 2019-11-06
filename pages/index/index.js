// pages/dujiaoxi/dujiaoxi.js
const route = require("../../utils/tool/router.js");
const request_01 = require("../../utils/api/request_01.js");
const app = new getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    useris:false,
	STATICIMG: app.globalData.STATICIMG,
    more:false,//弹窗
	currtab:1
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
	//   this.getVideo();
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

		this.setData({ useris: app.globalData.footertab });
		console.log(this.data.useris)

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

	},
	viedeoDel(){
		route.jump_nav({ url: "/pages/videoDel/videoDel"})
	},
	changeTab(e){//切换tab
		let tab = e.currentTarget.dataset.tab
		this.setData({currtab:tab})
		console.log(e);
	},
	getVideo(){
		let dat = {
			isTecher:false
		}
		request_01.videoList(dat).then((res)=>{
			console.log(res.data)
		})
	}
})