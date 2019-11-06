// pages/shopDel/shopDel.js
const route = require("../../utils/tool/router.js");

const app = new getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		STATICIMG: app.globalData.STATICIMG,
		buyNum:1,
		currSize:null,
		popShow:false,
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
	closePop(){
		this.setData({popShow:false})
	},
	openPop(){
		this.setData({ popShow: true })
	},
	checkSize(e){
		console.log(e);
		let tab = e.currentTarget.dataset.size;
		this.setData({ currSize:tab})
	},
	runNnm(e){
		let type = e.currentTarget.dataset.type=="add"?true:false;
		if(type){
			this.setData({buyNum:++this.data.buyNum})
		}else{
			this.setData({ buyNum: this.data.buyNum>1?--this.data.buyNum:1})
		}
	},
	nextStep(){
		if(!this.data.currSize) return;
		console.log(this.data.currSize,this.data.buyNum)
	}
	/**
	 * 用户点击右上角分享
	 */
	// onShareAppMessage: function () {

	// }
})