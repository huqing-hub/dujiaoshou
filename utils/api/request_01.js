const alert = require('../../utils/publics/tool.js');
const _requst = require("../../utils/api/request.js");
const BASEURL = "http://119.23.75.89";
const PAYBASE = "http://tba.oomobi.com/";
let app = new getApp();
let tokenkey = app.globalData.token || wx.getStorageSync("token");
console.log("token", tokenkey, app.globalData.token, wx.getStorageSync("token"));
let method = 'get'
let header = { 'content-type': 'application/json','Authorization': tokenkey}



const videoList = (data = {}) => { //独角兽视频列表
	tokenkey = app.globalData.token || wx.getStorageSync("token");
	let url = `${BASEURL}/TopVideo?userId=${data.userId}&isTecher=${data.isTecher}`
	return _requst.postP(url, data, tokenkey);
}
const kaika = (data = {}) => { //点击立即开卡
	tokenkey = app.globalData.token || wx.getStorageSync("token");
	let url = `${BASEURL}/User/CreateUserCard`
	return _requst.postP(url, data, tokenkey);
}

const getUDdots = (data = {}) => { //获取U点
	tokenkey = app.globalData.token || wx.getStorageSync("token");
	let url = `${BASEURL}/UDot/GetUDdots`
	return _requst.getP(url, data, tokenkey);
}
const getGifts = (data = {}) => { //获取首充好礼信息
	tokenkey = app.globalData.token || wx.getStorageSync("token");
	let url = `${BASEURL}/UDot/GetGifts`
	return _requst.getP(url, data, tokenkey);
}
const getPay= (data = {}) => { //优惠券充值
	tokenkey = app.globalData.token || wx.getStorageSync("token");
	let url = `${BASEURL}/UDot/Charge`
	return _requst.postP(url, data, tokenkey);
}
const getDotrecord = (data = {}) => { //获取充值记录User/GetUserDetail
	tokenkey = app.globalData.token || wx.getStorageSync("token");
	let url = `${BASEURL}/UDot/GetChargeRecord`
	return _requst.getP(url, data, tokenkey);
}
const getUseinfo = (data = {}) => { //查询用户信息
	tokenkey = app.globalData.token || wx.getStorageSync("token");
	let url = `${BASEURL}/User/GetUserDetail`
	return _requst.getP(url, data, tokenkey);
}
const getOpenid = (data = {}) => { //查询用户信息
	tokenkey = app.globalData.token || wx.getStorageSync("token");
	let url = `${BASEURL}/Login/GetSessionKey`
	return _requst.getP(url, data, tokenkey);
}
const WXpay = (data = {}) => { //支付
	tokenkey = app.globalData.token || wx.getStorageSync("token");
	let url = `${PAYBASE}/order/create`
	return _requst.postP(url, data, tokenkey);
}
const TodayCours = (data = {}) => { //查询老师今天的课程
	tokenkey = app.globalData.token || wx.getStorageSync("token");
	let url = `${BASEURL}/Course/GetTodayCoursesForTeacher`
	return _requst.getP(url, data, tokenkey);
}
const startClass = (data = {}) => { //开始上课
	tokenkey = app.globalData.token || wx.getStorageSync("token");
	let url = `${BASEURL}/Course/StartCourse`
	return _requst.getP(url, data, tokenkey);
}
const endClass = (data = {}) => { //结束上课
	tokenkey = app.globalData.token || wx.getStorageSync("token");
	let url = `${BASEURL}/Course/EndCourse`
	return _requst.getP(url, data, tokenkey);
}
const GetStudents = (data = {}) => { //获取学生列表
	tokenkey = app.globalData.token || wx.getStorageSync("token");
	let url = `${BASEURL}/Course/GetStudents`
	return _requst.getP(url, data, tokenkey);
}
const comYuyue = (data = {}) => { //获取学生列表
	tokenkey = app.globalData.token || wx.getStorageSync("token");
	let url = `${BASEURL}/Course/OrderCourse`
	return _requst.getP(url, data, tokenkey);
}
module.exports = {
	videoList,
	kaika,
	getUDdots,
	getGifts,
	getPay,
	getDotrecord,
	getUseinfo,
	getOpenid,
	WXpay,
	TodayCours,
	startClass,
	endClass,
	GetStudents,
	comYuyue,
}