// pages/fill_info/fill_info.js

const route = require("../../utils/tool/router.js");
import WxValidate from '../../utils/plugins/wx-validate/WxValidate.js';
const tool = require('../../utils/publics/tool.js');
const api = require('../../utils/api/myRequests.js');
const request_01 = require('../../utils/api/request_01.js');
const App = new getApp();
Page({
  data: {
    form: {
      userName: '',
    },
    array: ['男', '女'],
    sex: 3,
    STATICIMG: App.globalData.STATICIMG,
    date: '0000-00-00',
    region: ['xxx', 'xxx', 'xxx'],
    arrayStore: ["选择门店", "门店2", "门店3", "门店4", "门店5"],
    currstroe: 0,
    danceType: ["选择课程", "舞种2", "舞种3", "舞种4", "舞种5"],
    currDance: 0,
	phone:null,
	second: 60,
  },
  onLoad() {
    this.initValidate();
    console.log(this.WxValidate)
  },
  showModal(error) {
    tool.alert(error.msg);
  },
  submitForm(e) { // 提交立即办卡
    const params = e.detail.value
	  
    console.log(params)
	// return;
    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
	let dat = {
		userId:wx.getStorageSync("userdata").userId,
		userName: params.userName,
		userCardId: params.idcard,
		sex:params.sex,
		birthday: params.brith,
		address: params.address.toString() + params.deladdress,
		storeName: params.mendian > 0 ? this.data.arrayStore[parseInt(params.mendian)]:null,
		danceType: params.kecheng > 0 ? this.data.danceType[parseInt(params.kecheng)]:null,
	}
	  if (params.brith =="0000-00-00"){
		  wx.showToast({
			  icon:'none',
			  title: '请填写出生年月',
		  })
		  return;
	  }	
	  if (params.address.toString().indexOf("xxx")>-1) {
		  wx.showToast({
			  icon: 'none',
			  title: '请填写地址',
		  })
		  return;
	  }
	  console.log(dat);
	  request_01.kaika(dat).then((res)=>{
		  console.log(res);
		  if(res.data.Code=="200"){
			  tool.jump_red("/pages/usercenter/successful/successful")
		  }else{
			  console.log("提交失败")
		  }

	  })
  },
  initValidate() {
    // 验证字段的规则
    const rules = {
		tel: {
			required: true,
			tel: true
		},
		code:{
			required: true,
		},
       userName: {
        required: true
       },
		idcard: {
			required: true,
			idcard: '请输入正确的身份证号码',
		},
		sex:{
			required: true
		},
		brith:{
			required:true	
		},
		address:{
			required:true
		},
		deladdress:{
			required: true
		}
    }

    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
		code:{
			required:"请填写验证码"
		},
		tel: {
			required: '请输入手机号',
			tel: '请输入正确的手机号',
		},
		code:{
			required: '请填写验证码',	
		},
      userName: {
        required: '请填写姓名',
      },
	  sex: {
        required: '请选择性别',
      },
      idcard: {
        required: '请输入身份证号码',
        idcard: '请输入正确的身份证号码',
      },
		brith: {
			required: '请填写生日',
		},
		address: {
			required: '请填写地址',
		},
		deladdress: {
			required: '请填写详细地址',
		}
    }

    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)

    // 自定义验证规则
    this.WxValidate.addMethod('brith', (value, param) => {
		console.log(this.WxValidate.optional(value))
		return this.WxValidate.optional(value) || (value =="0000-00-00")
    }, '请勾选1-2个敲码助手')
  },
 
  bindPickerChange(e) {//选择性别
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sex: e.detail.value
    })
  },
  bindDateChange(e) {//选择日期
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindRegionChange(e) {//选择地区
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindstroeChange(e) {//选择门店
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      currstroe: e.detail.value
    })
  },
  binddanceChange(e) {//选择舞种
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      currDance: e.detail.value
    })
  },
	getValue(e){
		// console.log(e);
		this.setData({phone:e.detail.value});
	},
	opencode() {
		var _this = this;
		if (this.data.second != 60) {
			return;
		}
		console.log(this.data.phone)
		if (this.data.phone ==null || this.data.phone.toString().length!= 11) {
			console.log(this.data.phone)
			tool.alert('请正确填写手机号码');
			return;
		}
		this.getphonecode();
		this.setData({ iscode: true });
		let result = setInterval(() => {
			_this.setData({ second: --this.data.second });
			if (this.data.second < 0) {
				clearInterval(result);
				_this.setData({ iscode: false, second: 60 });
				console.log(this.data.iscode)
			}
		}, 1000);
	},
	getphonecode() {
		// Getcode
		api.Getcode({
			phone: this.data.phone,
		}).then((res) => {
			console.log(res)
			if (res.data.Code == 200) {
				this.setData({ code: res.data.Data.verifyCode });
			} else {
				tool.alert('获取失败');
			}
		})
	},
})


