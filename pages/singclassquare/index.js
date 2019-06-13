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
    Songlist:{},
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
  swiper_change(event) {
    const that = this
    console.log(event)
    if (event.detail.currentItemId==0) 
        return 
    
    const cat= this.data.SongListClassification[event.detail.currentItemId-1]
    
    console.log(cat)
    const songlist_cat = wx.getStorageSync(cat)
    if (!songlist_cat&&cat) {
      musicModel.getSongListByKind(cat).
      then(res=>{
        console.log(res)
        const Songlist=that.data.Songlist
        Songlist[this.data.SongListClassification[this.data.choose-1].name] = res.playlists
        that.setData({
          Songlist:Songlist
        })
        wx.setStorage({
          key:""+this.data.SongListClassification[this.data.choose-1].name,
          data:res.playlists
        })
      })
    } else {
      let Songlist= that.data.Songlist
      console.log(Songlist)
      const cat = this.data.SongListClassification[this.data.choose-1].name
      Songlist[cat]=songlist_cat
      that.setData({
        Songlist:Songlist
      })
    }
    
    this.setData({
      choose:event.detail.currentItemId
    })
  },

  onTap(event) {
    const that = this
    console.log(event)
    const chooseid = event.currentTarget.id
    this.setData({
      choose:chooseid
    })
    if (chooseid>0) {
      const cat= this.data.SongListClassification[chooseid-1].name
      console.log(cat)
      const songlist_cat = wx.getStorageSync(cat)
      console.log(songlist_cat[0])
      if (!songlist_cat[0]) {
        musicModel.getSongListByKind(cat).
        then(res=>{
          console.log(res)
          let Songlist=that.data.Songlist
          Songlist[this.data.SongListClassification[this.data.choose-1].name] = res.playlists
          that.setData({
            Songlist:Songlist
          })
          wx.setStorage({
            key: this.data.SongListClassification[this.data.choose-1].name,
            data:res.playlists
          })
        })
      }  else {
          let Songlist= that.data.Songlist
          console.log(Songlist)
          const cat = this.data.SongListClassification[this.data.choose-1].name
          // let is = false
          // for (var key in Songlist) {
          //   if (key == cat) {
          //     is = true
          //     break
          //   }
          // }
          // if (is) {
          //     Songlist[this.data.SongListClassification[this.data.choose-1].name] = songlist_cat
          //  } else {
            Songlist[cat]=songlist_cat
       //    }
          that.setData({
            Songlist:Songlist
          })
        }
      }
  },


  getMore(event) {
    console.log(event)
    const cat = this.data.SongListClassification[this.data.choose-1].name
    musicModel.getMoreSonglist(cat)
    const newSonglist = wx.getStorageSync(cat)
    let Songlist=this.data.Songlist
    Songlist[this.data.SongListClassification[this.data.choose-1].name] = newSonglist
    this.setData({
      Songlist:Songlist
    })
  }
})