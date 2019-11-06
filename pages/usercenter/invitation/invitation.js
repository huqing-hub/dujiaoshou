// pages/usercenter/invitation/invitation.js
// pages/label/label.js
import api from '../../../utils/api/myRequests.js'
import tool from '../../../utils/publics/tool.js'
import auth from '../../../utils/publics/authorization.js'
import util from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systeamInfo: {},
    isTrue: false,
    isLoad: false,
    codeUrl: '',
    resultObj: {
      textObj: {
        txt_1: '加入蓝巫师',
        txt_2: '蜕变出最美的颜色'
      },
      honorObj: {

      },
      bgUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/bluennn/image/label/bg_invite.png',
      cardUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/bluennn/image/label/bg_ticket1.png',
      headUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/bluennn/image/label/header.jpg',
      nick: 'xLi',
      count: 2000,
      day: 27,
      sunUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/bluennn/image/label/sun.jpg',
      person : 6
    },
    labelList: [],
    height: '',
    width: '',
    time: 1,
    num: '',
    photoModal: false,
    showModalOptionOption: {
      isShow: false,
      title: "访问手机相册",
      test: "小程序将访问您的手机相册，将生成的海报保存到您的手机相册。",
      cancelText: "取消",
      confirmText: "确定",
      color_confirm: "#0BB20C"
    },
    isModal: false,
    posterImgUrl: '',
    photoModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.data.isLoad = true
    var _this = this;
    _this.setData({ userInfo: wx.getStorageSync("userInfo") })
    _this.setData({ codeUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/share_img.png' });
    tool.loading("生成中", "loading")
    setTimeout(() => {
      _this.setData({
        isLoad: true
      })
      tool.loading_h()
    }, 1000)
    let isTrue = wx.getStorage({
      key: 'isTrue'
    })

    // if (wx.getStorageSync('channelId') != '') {
    //   console.log('获取太阳码')
    //   api.channelImg({
    //     channelId: wx.getStorageSync('channelId')
    //   }).then((res) => {
    //     console.log('获取太阳码');
    //     console.log(res);
    //     if (res.data.code == '0000') {
    //       _this.setData({ codeUrl: res.data.result });
    //       console.log('获取成功')
    //     }
    //   }).catch((err) => {

    //   });
    // }

    this.setData({
      isTrue: wx.getStorageSync('isTrue')
    })
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth
    })

    _this.findResult()

  },
  measureText(text, fontSize = 10) {
    text = String(text);
    var text = text.split('');
    var width = 0;
    text.forEach(function (item) {
      if (/[a-zA-Z]/.test(item)) {
        width += 7;
      } else if (/[0-9]/.test(item)) {
        width += 5.5;
      } else if (/\./.test(item)) {
        width += 2.7;
      } else if (/-/.test(item)) {
        width += 3.25;
      } else if (/[\u4e00-\u9fa5]/.test(item)) { //中文匹配
        width += 10;
      } else if (/\(|\)/.test(item)) {
        width += 3.73;
      } else if (/\s/.test(item)) {
        width += 2.5;
      } else if (/%/.test(item)) {
        width += 8;
      } else {
        width += 10;
      }
    });
    return width * fontSize / 10;
  },
  getSharePoster() {
    var _this = this
    // tool.loading("海报生成中", "loading")
    var resultObj = _this.data.resultObj

    // let num = '';
    // let personList = '';
    // _this.data.positionList.forEach((item, index) => {
    //   if (item.title == _this.data.resultObj.figureName) {
    //     personList = item.position
    //   }
    // })
    // var s = resultObj.scripts,
    //   reg = /.{17}/g,
    //   rs = s.match(reg);
    // rs.push(s.substring(rs.join('').length));
    console.log(resultObj)
    let txt = '剩余' + resultObj.count + 'U点' + ' | ' + resultObj.day + '后到期'
    Promise.all([
      util.getImgLocalPath(resultObj.bgUrl),
      util.getImgLocalPath(resultObj.cardUrl),
      util.getImgLocalPath(resultObj.headUrl),

      util.getImgLocalPath(resultObj.sunUrl)
    ]).then(res => {
      tool.canvasImg({
        canvasId: 'myCanvas',
        imgList: [
          { url: res[0], imgW: 574, imgH: 1026, imgX: 0, imgY: 0 },
          { url: res[1], imgW: 494, imgH: 580, imgX: 40, imgY: 205, isRadius: false },
          { url: res[2], imgW: 100, imgH: 100, imgX: 235, imgY: 160, isRadius: true },

          { url: res[3], imgW: 120, imgH: 120, imgX: 65, imgY: 635, isRadius: false }
        ],
        textList: [
          {
            string: '加入蓝巫师',
            color: '#fff',
            fontSize: 38,
            fontFamily: 'Arial',
            bold: true,
            textX: 195,
            textY: 30
          },
          {
            string: '蜕变出自己最美的颜色',
            color: '#fff',
            fontSize: 30,
            fontFamily: 'Arial',
            bold: true,
            textX: 135,
            textY: 90
          },
          {
          string: resultObj.nick,
          color: '#373737',
          fontSize: 28,
          fontFamily: 'Arial',
          bold: false,
          textX: 265,
          textY: 270
          }, {
            string: '亲爱的!',
            color: '#000',
            fontSize: 24,
            fontFamily: 'Arial',
            bold: true,
            textX: 65,
            textY: 340
          }, {
            string: '送你一张免费U点券，快来领取吧',
            color: '#000',
            fontSize: 24,
            fontFamily: 'Arial',
            bold: true,
            textX: 65,
            textY: 390
          }, {
            string: '免费体验卡',
            color: '#2470BF',
            fontSize: 24,
            fontFamily: 'Arial',
            bold: true,
            textX: 95,
            textY: 465
          }, {
            string: txt,
            color: '#999',
            fontSize: 20,
            fontFamily: 'Arial',
            bold: false,
            textX: 95,
            textY: 515
          }, {
            string: '立即扫码领取',
            color: '#000',
            fontSize: 24,
            fontFamily: 'Arial',
            bold: true,
            textX: 220,
            textY: 660
          }, {
            string: '或者长按识别二维码领取',
            color: '#999',
            fontSize: 20,
            fontFamily: 'Arial',
            bold: true,
            textX: 220,
            textY: 710
          }]
      }, res => {
        tool.loading_h();
        console.log(res)
        _this.setData({
          isState: true,
          posterImgUrl: res,
          canvasHidden: true
        })

      })
    })
  },
  //保存到相册
  savePhoto() {
    tool.loading("海报保存中", "loading")
    this.isSettingScope()
  },
  closeIcon() {
    this.setData({
      getIcon: true,
      isState: false
    })
  },
  //判断是否授权访问手机相册
  isSettingScope() {
    let _self = this
    auth.isSettingScope("scope.writePhotosAlbum", res => {
      if (res.status == 0) {
        console.log('进上面')
        tool.loading_h()
        _self.showHideModal()
      } else if (res.status == 1 || res.status == 2) {
        console.log('进下面')
        _self.saveImageToPhotosAlbum(_self.data.posterImgUrl)
      }
    })
  },
  //将canvas生成的临时海报图片保存到手机相册
  saveImageToPhotosAlbum(imgUrl) {
    let _this = this;
    console.log(imgUrl)
    wx.saveImageToPhotosAlbum({
      filePath: imgUrl,
      success(res) {
        setTimeout(() => {
          tool.alert("已保存到手机相册!")
          _this.setData({
            canvasHidden: false,
            isShare: true
          })
        }, 600)

      },
      fail() {
        tool.alert("保存失败")
      },
      complete() {
        tool.loading_h()
      }
    })
  },
  //点击自定义Modal弹框上的确定按钮
  operation(e) {
    if (e.detail.confirm) {
      auth.openSetting(res => {//用户自行从设置勾选授权后
        if (res.authSetting["scope.writePhotosAlbum"] && this.data.posterImgUrl) {
          this.saveImageToPhotosAlbum(this.data.posterImgUrl)
        }
      })
    }
    this.showHideModal()
  },
  //打开、关闭自定义Modal弹框
  showHideModal() {
    let _showModalOption = this.data.showModalOption
    _showModalOption.isShow = !_showModalOption.isShow
    // this.setData({ showModalOption: _showModalOption })
    this.setData({ showModalOption: false })
  },
  hideModal() {
    this.setData({ photoModal: false })
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
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮

      // api.viewShare({
      //   token: wx.getStorageSync('token')
      // }).then((res) => {
      //   wx.setStorageSync('isShare', true)
      //   this.findCount();
      // }).catch((err) => {

      // })
    }

    return {
      title: '测一测你是哪种教练',
      path: 'pages/index/index?channelId=' + wx.getStorageSync('channelId'),
      imageUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/bg_share.png',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  },
  saveLong() {
    let $this = this;
    // $this.setData({
    //   photoModal: true
    // })
    api.viewSave({
      token: wx.getStorageSync('token')
    })

    $this.savePhoto()

  },
  hideCanvasModal() {
    let $this = this;
    $this.setData({
      Modal: false
    })
  },
  findResult() {
    let $this = this;
    let resultObj = new Object()

    // api.viewResults({
    //   token : wx.getStorageSync('token')
    // }).then((res)=>{
    //   wx.setStorageSync('batchNo', res.data.result[0].batchNo)
    //   $this.setData({
    //     labelList : res.data.result
    //   })
    //   let resultObj = new Object();
    //   let labelList=  new Array();
    //   let positionList = new Array();
    //   let topList = new Array();
    //   let scriptList = new Array();
    //   res.data.result.forEach((item)=>{
    //     let obj = new Object();
    //     obj.name = item.optionLabel
    //     obj.url = ''
    //     labelList.push(obj);
    //   })
    //   $this.data.urlObj.forEach((urlItem,urlIndex) => {
    //     if (urlItem.title == res.data.result[0].figureName){

    //       urlItem.label.forEach((labelItem) => {
    //         labelList.forEach((item) => {
    //           if (labelItem.title == item.name) {
    //             item.url = labelItem.url

    //             // item.x = $this.data.positionList[urlIndex].x
    //             // item.y = $this.data.positionList[urlIndex].y

    //             // positionList[urlIndex].position.forEach((pItem) => {
    //             //   if (labelItem.title == pItem.name) {
    //             //     item.x = pItem.x
    //             //     item.y = $this.data.positionList[urlIndex].y
    //             //   }
    //             // })
    //           }
    //         })

    //       })
    //       resultObj.nickUrl = urlItem.nickUrl
    //       resultObj.bgUrl = urlItem.bgUrl
    //       resultObj.pageUrl = urlItem.pageUrl
    //     }
    //   })
    //   scriptList.push(res.data.result[2].optionDescription)
    //   scriptList.push(res.data.result[4].optionDescription)
    //   scriptList.push(res.data.result[5].optionDescription)
    //   let scripts = res.data.result[2].optionDescription +"。" + res.data.result[4].optionDescription + "。" + res.data.result[5].optionDescription + "。"
    //   let top1 = new Object(),
    //       top2 = new Object();
    //   top1.name = res.data.result[1].optionTitle
    //   top1.url = ''
    //   top2.name = res.data.result[3].optionTitle
    //   top2.url = ''
    //   topList.push(top1)
    //   topList.push(top2)
    //   resultObj.topList = topList
    //   resultObj.labelList = labelList
    //   resultObj.figureName = res.data.result[0].figureName
    //   resultObj.figure = res.data.result[0].figure 
    //   resultObj.scriptList = scriptList
    //   resultObj.scripts = scripts
    //   $this.data.urlObj.forEach((item,index)=>{
    //     if(item.title == resultObj.figureName){
    //       resultObj.color =  item.color;
    //       $this.setData({
    //         num : index + 1
    //       })
    //       resultObj.topList.forEach((topItem)=>{
    //           item.labelList.forEach((labelItem)=>{
    //             if (topItem.name == labelItem.title){
    //               topItem.url = labelItem.url
    //             }                 
    //           })
    //       })
    //     }
    //   })
    //   $this.setData({
    //     resultObj: resultObj
    //   })
      $this.getSharePoster();
    // }).catch((err)=>{

    // })
  },
  again() {
    let $this = this;
    wx.setStorageSync('topicNum', 0)
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  toGetPrize() {
    let $this = this;
    wx.navigateTo({
      url: '/pages/raffle/raffle'
    })
  }
})