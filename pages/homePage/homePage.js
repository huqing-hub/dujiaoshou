// pages/usePage/usePage.js
const app = new getApp();
const route = require("../../utils/tool/router.js");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		STATICIMG: app.globalData.STATICIMG,
		currtab: 1
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

	},
	changeTab(e) {
		let tab = e.currentTarget.dataset.tab;
		this.setData({ currtab: tab })
		console.log(e.currentTarget.dataset.tab);
	}
})