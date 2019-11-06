// pages/attendClass/attendClass.js
const route = require("../../utils/tool/router.js");
const request_01 = require("../../utils/api/request_01.js");
const app = new getApp();
let time = null;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		STATICIMG: app.globalData.STATICIMG,
		currTab:2,
		useris:false,
		teachData:null,
		classTime:'00：00：00',
		isstart:false,
		Student:null,
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
		this.setData({ useris: app.globalData.footertab });
		this.TodayCours();
		console.log(wx.getStorageSync('startclass'))
		if (wx.getStorageSync('startclass')){
			this.setData({ isstart:true});
			this.autoClass();
		}
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
	changeTabs(e){
		let tab = e.currentTarget.dataset.tab;
		this.setData({ currTab:tab})
		console.log(tab);
	},
	sweepYard(){
	    wx.scanCode({
				success(res) {

				}
		})
	},
	TodayCours(){//老师今天的课程
		let dat = {
			userId: wx.getStorageSync('userdata').userId
		}
		request_01.TodayCours(dat).then((res)=>{
			console.log(res);
			if(res.data.Code=="200"){
				this.setData({ teachData: res.data.Data })
				this.GetStudents();
			}
		})
	},
	autoClass(){//中途进来自动计时
		let timestamp = Date.parse(new Date());
		timestamp = timestamp / 1000;
		let val = timestamp-wx.getStorageSync('startclass');
		let that = this;
		clearInterval(time);
		time = setInterval(() => {
			that.setData({ classTime: this.minutesAndSeconds(++val, "：").tiem0 })
		}, 1000)
	},
	beginClass(){//店家开始上课
		if (this.data.isstart){
			this.endClass();
			clearInterval(time);
			return;
		}
		let m = 0;
		let that = this;
		let dat = {
			courseId: this.data.teachData.courseId
		}
		request_01.startClass(dat).then((res)=>{
			if(res.data.Code=="200"){
				let timestamp = Date.parse(new Date());
				timestamp = timestamp / 1000;
				console.log("当前时间戳为：" + timestamp);
				this.setData({ isstart: true });
				wx.setStorageSync("startclass", timestamp);
				clearInterval(time);
				time = setInterval(() => {
					that.setData({ classTime: this.minutesAndSeconds(++m, "：").tiem0 })
				}, 1000)
			}
		})
		
	},
	endClass(){//点击结束上课
		let dat = {
			courseId: this.data.teachData.courseId
		}
		request_01.endClass(dat).then(()=>{
			if(res.data.Code=="200"){
				wx.navigateTo({
					url: '/pages/classEnd/classEnd'
				})
			}
		})
		wx.setStorageSync('startclass',false);
	},
	GetStudents(){
		let dat = {
			courseId: this.data.teachData.courseId,
			type:0
		}
		request_01.GetStudents(dat).then((res)=>{
			console.log(res.data)
			if(res.data.Code=="200"){
				this.setData({ Student:res.data.Data})
			}
		})
	},
	minutesAndSeconds(time, symbols){
		let _d, _h, _m, _s
		_d = parseInt(time / 86400)
		_h = parseInt(time / 3600) - _d * 24
		_m = parseInt(time / 60) - _d * 1440 - _h * 60
		_s = parseInt(time) - _d * 86400 - _h * 3600 - _m * 60
		_d < 10 ? (_d = '0' + _d) : _d = String(_d)
		_h < 10 ? (_h = '0' + _h) : _h = String(_h)
		_m < 10 ? (_m = '0' + _m) : _m = String(_m)
		_s < 10 ? (_s = '0' + _s) : _s = String(_s)
		return {
			tiem0:_h + (symbols || '时') + _m + (symbols || '分') + _s + (symbols ? '' : '秒'),
			tiem: _d + (symbols || '天') + _h + (symbols || '时') + _m + (symbols || '分') + _s + (symbols ? '' : '秒'),
			tiems: { d: _d, h: _h, m: _m, s: _s }
		}
	}
})