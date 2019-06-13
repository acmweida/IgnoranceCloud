// components/find/index.js
import { MusicModel } from '../../models/music.js'
const app = getApp()
const date = new Date()
const musicModel = new MusicModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    day: date.getDate(),
    songlist: [],
    nai: [
      {
        src: '/imgs/cal.png',
        text: '每日推荐',
        id: 0
      },
      {
        src: '/imgs/songlist.png',
        text: '歌单',
        id: 1
      },
      {
        src: '/imgs/order.png',
        text: '排行榜',
        id: 2
      },
      {
        src: '/imgs/broad.png',
        text: '电台',
        id: 3
      },
      {
        src: '/imgs/live.png',
        text: '直播',
        id: 4
      }
    ]
  },


  created() {
    const that = this
    musicModel.getDayRecommendSongList().then(
      res => {
        console.log(res)
        that.setData({
          songlist: res.recommend.slice(0,6)
        })
      }

    )

  },


 
  /**
   * 组件的方法列表
   */
  methods: {
    onSongList(event) {
      console.log(event)
    },

    onClick(event) {
      console.log(event)
      const id = event.target.dataset.id
      if (id == 0) {
        this._onGetRecommendSongs()
      } else if (id==1) (
        this._onNavigateToSonglist()
      )
    },

    _onNavigateToSonglist() {
      wx.navigateTo({
        url: '/pages/singclassquare/index',
      })
    },

    _onGetRecommendSongs() {
      //console.log("xxx")
      const recommendSongs = wx.getStorageSync("recommedSongs"+(new Date()).getDate())
      //console.log(recommendSongs)
      if (!recommendSongs) {
        //console.log("ss")
        musicModel.getRecommendSongs()
          .then(res => {
            console.log(res.recommend)
            const recommend = res.recommend
            wx.setStorage({
              key :'recommedSongs' + (new Date()).getDate(),
              data: recommend        
          })
        })
      }
      wx.navigateTo({
        url: '/pages/recommendSongs/index'
      })
    
    }
    
  }
})
