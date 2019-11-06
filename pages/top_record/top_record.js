// pages/top_record/top_record.js
const request_01 = require("../../utils/api/request_01.js");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		recordData:null,
		isHas:false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getDotrecord();
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
	// onShareAppMessage: function () {

	// }
	getDotrecord(){
		let dat = {
			type:1
		}
		request_01.getDotrecord(dat).then((res)=>{
			console.log(res.data);
			if (res.data.Code == 200) this.setData({ recordData: res.data.Data, isHas:!res.data.Data.length>0})
		})
	}
})