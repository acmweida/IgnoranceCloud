import { MusicModel } from '../../models/music.js'
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
    console.log("xxx")
    const key = "recommedSongs"+ (new Date()).getDate();
    const playList = wx.getStorageSync(key)
    console.log(playList)
    this.setData({
      playList: playList
    })
    wx.setStorage({
      key: 'playlist',
      data: playList,
    })
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