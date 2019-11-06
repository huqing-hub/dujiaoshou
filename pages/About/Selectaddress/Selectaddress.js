// pages/About/Selectaddress/Selectaddress.js
//index.js
//获取应用实例

var app = getApp();
const api = require('../../../utils/api/myRequests.js');
const tool = require('../../../utils/publics/tool.js');
Page({
  data: {
    speed: 0,
    accuracy: 0,
    adata: null,
    near: null
  },
  blank(){
    if (this.data.adata.longitude != undefined && this.data.adata.latitude != undefined) {
      wx.redirectTo({
        url: 'pages/About/Aboutclass/Aboutclass?lat=' + this.data.adata.latitude + "&lon=" + this.data.adata.longitude
      });
      return;
    }
    tool.alert('请选择地址');
  },
  //事件处理函数
  bindViewTap: function() {

  },
  getdata() {
    if (app.globalData.udata.userId == null) {
      tool.alert('参数丢失');
      return;
    }
    tool.loading();
    let _this = this;
    api.recommendshop({
      longitude: this.data.adata.longitude,
      latitude: this.data.adata.latitude
    }).then((res) => {
      tool.loading_h();
      console.log(res)
      if (res.data.Code == 200) {
        _this.setData({
          near: res.data.Data
        })
        console.log(res.data.Data)
      } else {
        tool.alert('获取个人信息失败');
      }
    })
  },
  //移动选点
  onChangeAddress: function() {
    console.log('123')
    var _page = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
        _page.setData({
          adata: res
        });
        _page.getdata();
      },
      fail: function(err) {
        console.log(err)
      }
    });
  },
  onLoad: function() {
    var that = this
    wx.showLoading({
      title: "定位中",
      mask: true
    })
    wx.getLocation({
      type: 'gcj02',
      altitude: true, //高精度定位
      //定位成功，更新定位结果
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy

        that.setData({
          longitude: longitude,
          latitude: latitude,
          speed: speed,
          accuracy: accuracy
        })
      },
      //定位失败回调
      fail: function() {
        wx.showToast({
          title: "定位失败",
          icon: "none"
        })
      },

      complete: function() {
        //隐藏定位中信息进度
        wx.hideLoading()
      }

    })
  },
})