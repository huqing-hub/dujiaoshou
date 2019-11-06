// pages/course/Somecode/Somecode.js
var QRCode = require('../../../utils/weapp-qrcode.js')
const app = new getApp();
const api = require('../../../utils/api/myRequests.js');
const tool = require('../../../utils/publics/tool.js');
var qrcode;

const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;

// 300rpx 在6s上为 150px
const code_w = 300 / rate;

Page({
  data: {
    text: 'https://github.com/tomfriwel/weapp-qrcode',
    image: '',
    code_w: code_w
  },
  onLoad: function (options) {
    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: "https://github.com/tomfriwel/weapp-qrcode",
      image: './bg.jpg',
      width: code_w,
      height: code_w,
      colorDark: "#1CA4FC",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
  coursecancel() {
    if (app.globalData.udata.userId == null || this.data.courseId == null || this.data.applyId == null) {
      tool.alert('参数缺失');
      return;
    }
    tool.loading();
    let _this = this;
    api.getCourse({
      userId: app.globalData.udata.userId,
      courseId: this.data.courseId,
      applyId: 0
    }).then((res) => {
      tool.loading_h();
      console.log(res)
      if (res.data.Code == 200) {
        wx.redirectTo({
          url: 'pages/course/schedule/schedule'
        });
      } else {
        tool.alert('取消失败');
      }
    });
  },
  cancel() {
    var _this = this;
    wx.showModal({
      title: '确定取消该课程吗？',
      content: '会立即取消课程',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确认回调')
          _this.coursecancel();
        } else {
          console.log('点击取消回调')
        }
      }
    });
  },
  confirmHandler: function (e) {
    var value = e.detail.value
    qrcode.makeCode(value)
  },
  inputHandler: function (e) {
    var value = e.detail.value
    this.setData({
      text: value
    })
  },
  tapHandler: function () {
    // 传入字符串生成qrcode
    qrcode.makeCode(this.data.text)
  },
  // 长按保存
  save: function () {
    console.log('save')
    wx.showActionSheet({
      itemList: ['保存图片'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          qrcode.exportImage(function (path) {
            wx.saveImageToPhotosAlbum({
              filePath: path,
            })
          })
        }
      }
    })
  }
})