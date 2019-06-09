import { MusicModel} from '../../models/music.js'
const musicModel = new MusicModel()
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playList: {},
    songList: {}
  },
  onLoad: function (options) {
    musicModel.getSongListDetail(
      data => {
        console.log(data.playlist)
        this.setData({
          playList:data.playlist,
          songList: data.privileges
        })
      }
    )
  },

  toAudio(e) {
    wx.setStorage({
      key: 'songid',
      data: e.currentTarget.dataset.id,
      success: () => {
        wx.navigateTo({
          url: '../audio/index'
        })
      }
    })
  },
  playAll() {
    wx.setStorage({
      key: 'songid',
      data: 0,
      success: () => {
        wx.navigateTo({
          url: '../audio/index',
        })
      }
    })
  }
}) 