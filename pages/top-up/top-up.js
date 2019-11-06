// pages/top-up/top-up.js
const route = require("../../utils/tool/router.js");
const request_01 = require("../../utils/api/request_01.js");
const tool = require("../../utils/publics/tool.js");
const app = new getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		STATICIMG: app.globalData.STATICIMG,
		currTab:null,
		upData:[],
		giftList:[],
		pid:null,
		price:null,
		myPhone:null,
		useData:null,
		openid:null,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getopenid();
		this.getUDdots();
		this.getGifts();
		this.getUseinfo();
		this.setData({ myPhone:wx.getStorageSync("userdata").phone})
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
	changeTab(e){
		let tab = e.currentTarget.dataset.tab;
		let price = e.currentTarget.dataset.price;
		this.setData({ currTab: tab, pid: e.currentTarget.dataset.pid, price: price});
		console.log(e);
	},
	getUDdots(){//获取u点充值列表
		request_01.getUDdots().then((res)=>{
			// console.log(res.data.code)
			if(res.data.Code==200){
				console.log(1)
				this.setData({upData:res.data.Data});
			}
		})
	},
	getGifts(){//获取首充好礼
		request_01.getGifts().then((res)=>{
			console.log(res.data);
			if(res.data.Code==200){
				this.setData({giftList:res.data.Data});
			}
		})
	},
	uprecod(){
		tool.jump_nav("/pages/top_record/top_record")
	},
	getPay(){
		let that = this;
		if (this.data.price==0){
			let dat = {
				tokenId: this.data.pid,
				type: 1
			}
			request_01.getPay(dat).then((res) => {
				console.log(res.data);
				if(res.data.Code==200){
					tool.jump_nav("/pages/usercenter/Paysuccess/Paysuccess")	
				}else{
					wx.showToast({
						icon:"none",
						title: res.data.Error
					})
				}
			})
		}else if(this.data.price>0){
			let dat = {
				OpenID:this.data.openid,
				TotalFee: this.data.price,
				Body:"mgud"
			}
			request_01.WXpay(dat).then((res)=>{
				// console.log(res.data);
				if (res.data.code =="OK")
				wx.requestPayment({
					timeStamp: res.data.time_stamp,
					nonceStr: res.data.nonce_str,
					package: res.data.package_value,
					signType: res.data.sign_type,
					paySign: res.data.pay_sign,
					success(res) {
						wx.showToast({
							title: '支付成功',
							icon: 'success',
							duration: 2000
						})
						that.getUDdots();
						that.getGifts();
					},
					fail(res) {
						wx.showToast({
							title: '取消支付',
							icon: 'none',
							duration: 2000
						})
					}
				})
			})
			console.log("微信支付")
			// tool.jump_nav("/pages/usercenter/Paysuccess/Paysuccess")
		} else if (this.data.price==null){
			tool.alert("请选择面值")	
		}
		
	},
	getUseinfo(){
		let dat = {
			userId: wx.getStorageSync("userdata").userId
		}
		request_01.getUseinfo(dat).then((res)=>{
			console.log(res.data);
			if (res.data.Code == 200) this.setData({ useData:res.data.Data})
		})
	},
	getopenid(){
		console.log(21)
		let that = this;
		wx.login({
			success(res) {
				let dat = {
					Code: encodeURIComponent(res.code)
				}
				request_01.getOpenid(dat).then((res) => {
					console.log(res.data.Data);
					if(res.data.Code==200){
						that.setData({ openid:res.data.Data.openid});
					}
				})
			}
		})
	}
	/**
	 * 用户点击右上角分享
	 */
	// onShareAppMessage: function () {

	// }
})