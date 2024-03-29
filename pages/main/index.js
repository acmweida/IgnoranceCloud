// pages/main/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:1,
    img_with:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        _that.setData({
          img_with:res.windowHeight*0.09
        })
      }
    })

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
  onShareAppMessage: function () {

  },

  choose(even) {
   // console.log(even)
    this.setData({
      checked:even.target.id
    })
  },

  swiper_change(event) {
    this.setData({
      checked:event.detail.currentItemId
    })
  },

  serach(event) {
    wx.navigateTo({
      url: '/pages/search/index',
    })
  }
  
})