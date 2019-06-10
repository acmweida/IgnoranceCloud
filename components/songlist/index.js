// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songlist:Object
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
    onTap(event){
      const bid = this.properties.songlist.id
      wx.navigateTo({
        url:`/pages/book-detail/book-detail?bid=${bid}`
      })
      // 降低了组件的通用性
      // 非常方便
      // 服务于当前的项目 项目组件
      // 
    }
  }
})
