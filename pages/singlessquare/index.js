// pages/singlessquare/index.js
import { MusicModel } from '../../models/music.js'
const musicModel = new MusicModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SongListClassification:{},
    RecommendSongList:{},
    choose:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    musicModel.getSongListClassification()
    .then(
      res => {
        console.log(res)
        this.setData({
          SongListClassification:res.tags
        })
      }
    )
    musicModel.getRecommendSongList()
    .then(
      res => {
        console.log(res)
        this.setData({
          RecommendSongList:res.result
        })
      }
    )
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

  onTap(event) {
    console.log(event)
    const chooseid = event.currentTarget.id
    this.setData({
      choose:chooseid
    })
    
    if (chooseid>1) {
      const cat= this.data.SongListClassification[chooseid-2].name
      console.log(cat)
      
    }
  }
})