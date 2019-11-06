// components/tabber/cmp.js
const router = require('../../utils/tool/router.js');

const method = require('../../utils/tool/method.js');

const app = new getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    usertype:{
      type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal, changedPath) {
        this.setData({ useris: newVal});
        this.initData();
        // this.initData();
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    oData:{
      type: Array,
      value:[],
      observer: function (newVal, oldVal, changedPath) {
        // this.initData();
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    IMGSERVICE:{
      type:String,
		value: app.globalData.STATICIMG
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:null,
    tabbarList:[],
    useris:false,
    isIponeX:false,
	IMG: app.globalData.STATICIMG
  },
  attached(){
    this.initData();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //数据初始化
    // { text: '独角兽', path: '/pages/index/index', icon: 'tab_home_' },
    // { text: '独角兽', path: '/pages/index/index', icon: 'tab_unicorn_' },
    initData(){
	console.log(this.data.IMG)
      if (this.data.useris) {
		  this.setData({ tabbarList: [ { text: '上课', path: '/pages/attendClass/attendClass', icon: 'tab_appointCourse_' }, { text: '课表', path: '/pages/course/schedule/schedule', icon: 'tab_classSchedule_' }, { text: '我的', path: '/pages/usercenter/index/index', icon: 'tab_myCenter_' }] });
      } else {
        this.setData({ tabbarList: [ { text: '约课', path: '/pages/About/Aboutclass/Aboutclass', icon: 'tab_appointCourse_' }, { text: '课表', path: '/pages/course/schedule/schedule', icon: 'tab_classSchedule_' }, { text: '我的', path: '/pages/usercenter/index/index', icon: 'tab_myCenter_' }] });
      }
      let getUrl = this.getUrl()
      let tabbarList = this.data.tabbarList;
      tabbarList.some((item, index)=>{
        if (item.path.slice(1) == getUrl ){
          console.log(tabbarList);
          console.log(getUrl)
          this.setData({
            currentIndex:index
          })
          return true;
        }
      });
      //获取手机信息
      method.getSystem()
        .then((value)=>{
          const model = value.model;

          if ( model.search('iPhone X') != -1 ){
              this.setData({
                isIponeX:true,
              })

          }else{

            this.setData({
              isIponeX:false,
            })

          }
        })
        
    },
    //获取当前页面路径
    getUrl(){
      let pages = getCurrentPages();
      let currentPage = pages[pages.length-1];
      return currentPage.route;
    },  

    switchBtn(e){
      let index = e.currentTarget.dataset.index;
      console.log(index)
      let url = this.properties.tabbarList[index].path;
      if( index == this.data.currentIndex )return;
      this.setData({currentIndex:index})
      router.jump_rel({
        url,
      })
    }
  } 
})
