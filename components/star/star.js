// components/star/star.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    is:{
      type: Boolean,
      value: false
    },
    starOption: {
      type: Object,
      value: {
        type: 5,//几颗星
        width: 40,//星星大小
        spacing: 16,//星星间距
      },
      observer: function (newVal, oldVal, changedPath) {
        console.log('newVal',newVal)
        this.setData({ star: newVal, score: newVal.score});
        console.log(this.data.star)
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    score: 0,
    star:{}
  },
  ready() {
    this.setData({ score: this.data.starOption.score})
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //点击星星
    select: function (e) {

      if (this.data.is) {
        return;
      }
      let score = e.currentTarget.dataset.score
      let type = e.currentTarget.dataset.type
      if (type == 0 && this.data.score == 0.5 && e.currentTarget.dataset.score == 0.5) { score = 0 }
      this.setData({ score: score })
      console.log('curStar')
      this.triggerEvent("curStar", {star: this.data.score})
    }
  }
})
