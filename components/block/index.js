// component/block/index.js
Component({

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    url:String,
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChick(event) {
     // console.log(event);
      this.triggerEvent("onTap",event.detail,{})
    }
  }
})
