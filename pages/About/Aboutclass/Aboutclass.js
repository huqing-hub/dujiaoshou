// pages/Aboutclass/Aboutclass.js
import tool from '../../../utils/publics/tool.js'
import util from '../../../utils/util.js'
import auth from '../../../utils/publics/authorization.js'
const api = require('../../../utils/api/myRequests.js');
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['北京市', '北京市', '东城区'],
    showModalOption: {
      isShow: false,
      type: 0,
      title: "获取位置信息",
      test: "小程序将访问您的手机定位，自动定位到您当前所在城市信息。【如果您没有打开GPS，请通过手机设置打开GPS再授权哦！】",
      cancelText: "取消",
      confirmText: "授权",
      color_confirm: '#A3271F'
    },
    isShowLoading: false,
    useris: null,
    tabtype: 0,//类型选择
    tab: 0,//
    latitude: null,
    longitude: null,
    uid: 1,
    storedata: [],
    storeadd: null,
    storet: [],
    payalert: false,
    paymeet: 0,
    paydata: null,//支付对象
    teacherdata:null,//教师
    udata: null,
    storeId:null
  },
  /**
   * 教师课程
   */
  teacherlesson(){
    console.log(app.globalData.udata.userId)
    tool.loading("正在加载中")
    let _this = this;
    api.teacherlesson({
      time: this.data.storet[this.data.tab].courseTime,
      teacherId: this.data.teacherdata[0].teacherId
    }).then((res) => {
      console.log(res)
      tool.loading_h();
      if (res.data.Code == 200) {
        _this.setData({ storedata: res.data.Data });
        // teacherlesson
      } else {
        tool.alert('获取课程失败');
      }
    });
  },
  /**
   * 教师约课
   */
  teacherabout(){
    console.log(app.globalData.udata.userId)
    tool.loading("正在加载中")
    let _this = this;
    api.teachercourse({
      // storeId: this.data.storeadd[0].storeId
    }).then((res) => {
      console.log(res)
      tool.loading_h();
      if (res.data.Code == 200) {
        _this.setData({ teacherdata: res.data.Data });
        console.log(_this.data.teacherdata);
        _this.teacherlesson();
      } else {
        tool.alert('获取店铺列表失败');
      }
    });
  },
  /**
   * 支付
   */
  pay(e) {
    this.close();
    //U点是否充足
    this.setData({ paydata: e.target.dataset.index, udata: app.globalData.udata });
    if (app.globalData.udata.isVip) {
      this.setData({ paymeet: 1 });
      //支付是否足够
      console.log(this.data.paydata)
      if (this.data.paydata.coursePrice <= app.globalData.udata.token) {
        this.setData({ paymeet: 2 });
        return;
      }
      this.setData({ paymeet: 3 });
      return;
    }

    //U点足够
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({ payalert: false });
    this.getdata();
  },
  getdata() {
    console.log(app.globalData.udata.userId)
    if (app.globalData.udata.userId == null) {
      tool.alert('参数丢失');
      return;
    }
    tool.loading();
    let _this = this;
    api.uDetail({
      userId: app.globalData.udata.userId
    }).then((res) => {
      tool.loading_h();
      console.log(res)
      if (res.data.Code == 200) {
        app.globalData.udata = res.data.Data;
      } else {
        tool.alert('获取个人信息失败');
      }
    })
  },
  /**
   * 
   */
  close() {
    this.data.payalert ? this.setData({ payalert: false }) : this.setData({ payalert: true });
  },
  /**
   * 获取时间列表
   */
  storeTime() {
    console.log(this.data.storeadd)
    if (this.data.storeadd[0].storeId == null) {
      tool.alert('参数缺失');
      return;
    }
    let _this = this;
    api.storeTime({
      storeId: this.data.storeadd[0].storeId
    }).then((res) => {
      if (res.data.Code == 200) {
        _this.setData({ storet: res.data.Data });
        console.log(res)
        _this.timeCourse();
      } else {
        tool.alert('获取日期失败');
      }
    });
  },
  /**
   * 门店课程日期筛选
   */
  timeCourse() {
    if (this.data.storeadd[0].storeId == null) {
      tool.alert('参数缺失');
      return;
    }
    console.log('门店课程')
    let _this = this;
    tool.loading();
    api.getCourse({
      storeId: this.data.storeadd[0].storeId,
      time: this.data.storet[this.data.tab].courseTime
    }).then((res) => {
      console.log(res)
      tool.loading_h();
      if (res.data.Code == 200) {
        _this.setData({ storedata: res.data.Data })
      } else {
        tool.alert('获取课程列表失败');
      }
    });
  },
  /**
   * 店铺列表
   */
  storelist() {
    console.log(app.globalData.udata.userId)
    if (this.data.latitude == null || this.data.longitude == null || app.globalData.udata.userId == null) {
      tool.alert('参数缺失');
      return;
    }
    let _this = this;
    api.getStore({
      longitude: this.data.tabtype,
      latitude: this.data.latitude,
      userId: app.globalData.udata.userId
    }).then((res) => {
      console.log(res)
      if (res.data.Code == 200) {
        _this.setData({ storeadd: res.data.Data });
        _this.storeTime();
      } else {
        tool.alert('获取店铺列表失败');
      }
    })
  },
  /**
   * 星期选择
   */
  cut: function (e) {
    if (e.target.dataset.index == undefined) {
      return;
    }
    this.setData({ tab: e.target.dataset.index });
    if(this.data.tabtype==0){
      this.timeCourse();
      return;
    }
    this.teacherlesson();
  },
  /**
   * 选择类型
   */
  tabchoose(e) {
    this.setData({ tabtype: e.currentTarget.dataset.type });
    if (e.currentTarget.dataset.type==1){
      console.log('老师-------------------》')
      this.teacherabout();
      return;
    }
    this.timeCourse();
  },
  //loading框
  isShowLoading() {
    this.setData({
      isShowLoading: !this.data.isShowLoading
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ useris: app.globalData.footertab });
    //选择老师ID
    if (options.id!=undefined){
      this.storeTime();
      this.setData({ teacherid: options.id, tabtype:1});
      return;
    }
    //选择地理位置
    if (options.lat!=undefined){
      this.setData({ latitude: options.lat, longitude: options.lon });
      this.storelist();
      return;
    }
    if (app.globalData.ulogin) {
      this.getPosition()
    }
  },
  getPosition() {
    tool.loading("自动定位中")
    tool.getPosition().then(res => {
      console.log("定位详细信息", res)
      let _address_component = res.result.address_component
      console.log("经度---->", res.result.location.lng)
      console.log("纬度---->", res.result.location.lat)
      // latitude: null,
      // longitude: null
      console.log("省---->", _address_component.province)
      console.log("市---->", _address_component.city)
      console.log("区---->", _address_component.district)
      this.setData({ region: [_address_component.province, _address_component.city, _address_component.district], latitude: res.result.location.lat, longitude: res.result.location.lng });
      this.storelist();
      tool.loading_h()
    }).catch(err => {
      console.log("定位失败", err)
      tool.alert("定位失败")
      tool.loading_h()
      this.showHideModal()
    })
  },
  //点击自定义Modal弹框上的按钮
  operation(e) {
    if (e.detail.confirm) {
      auth.openSetting(res => {//用户自行从设置勾选授权后
        if (res.authSetting["scope.userLocation"]) {
          this.getPosition()
        }
      })
      this.showHideModal()
    } else {
      tool.loading("")
      this.showHideModal()
      setTimeout(() => {
        tool.loading_h()
        this.showHideModal()
      }, 600)
    }
  },
  //打开、关闭自定义Modal弹框
  showHideModal() {
    let _showModalOption = this.data.showModalOption
    _showModalOption.isShow = !_showModalOption.isShow
    this.setData({ showModalOption: _showModalOption })
  }
})