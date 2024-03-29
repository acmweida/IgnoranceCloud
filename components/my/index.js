import { UserModel } from '../../models/user.js'
const userModel = new UserModel()

Component({

  properties: {

  },
  data: {
      userInfo: {},
      firstImg: 'imgs/first-white.png',
      secondImg: 'imgs/second-gray.png',
      recommendList: {},
      recommendSong: {},
      max: 5,
      nowTab: 1,
      singList: {}
  },

  created() {
    userModel.getUserListOfSongList(
      data => {
        this.setData({
          singList : data
        })
      }
    );
    
    
  },

  methods:{
  toPlayList(e){
      console.log(e.currentTarget.dataset.id)
      wx.setStorage({
          key: 'listid',
          data: e.currentTarget.dataset.id,
          success: res => {
              console.log(res)
              wx.navigateTo({
                  url: '../playlist/index'
              })
          }
      })
  },
  toAudio(e) {
      wx.setStorage({
          key: 'songid',
          data: e.currentTarget.dataset.id,
          success: () => {
              wx.navigateTo({
                  url: '../audio/audio'
              })
          }
      })
  },
  toDaliy(){
      this.setData({
          firstImg: '../img/first-gray.png',
          secondImg: '../img/second-white.png',
          nowTab: 2
      })
      wx.request({
          url: app.globalData.url + 'personalized',
          success: res => {
              console.log(res.data)
              this.setData({
                  recommendList: res.data.result
              })
          }
      })
      wx.request({
          url: app.globalData.url + 'personalized/newsong',
          success: res => {
              console.log(res.data)
              this.setData({
                  recommendSong: res.data.result
              })
              app.globalData.playList = this.data.recommendSong
          }
      })
  },
  toMy() {
      this.setData({
          firstImg: '../img/first-white.png',
          secondImg: '../img/second-gray.png',
          nowTab: 1          
      })
      wx.request({
          url: app.globalData.url + 'user/playlist',
          data: {
              uid: app.globalData.userInfo.account.id
          },
          success: (res) => {
              if (res.data.code == 200) {
                  console.log(res.data)
                  this.setData({
                      singList: res.data.playlist
                  })
              } else {
                  wx.showModal({
                      title: '获取歌单失败',
                      showCancel: false
                  })
              }
          }
      })
    },
    more(){
        this.setData({
            max: 10
        })
    }
  }
}
)