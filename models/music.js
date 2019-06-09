import { HTTP } from '../utils/http.js';
var app = getApp()
export class MusicModel extends HTTP{
    getRecommendSongList() {
      return this.request({
        url:'recommend/resource',
        data:{
          timestamp:(new Date()).getTime()
        }
      })
    }

    getRecommendSongs() {
      return this.request({
        url:'recommend/songs'
      })
    }

   getSongListDetail(sCallback) {
     const listid = wx.getStorageSync('listid' )
     console.log(listid)
      this.request({
        url: 'playlist/detail',
        data: {
          id: listid
        }  
      }).then(
        res => {
            console.log(res)
            sCallback(res)
            // this.setData({
            //   playList: res.playlist,
            //   songList: res.privileges
            // })

            //   wx.request({
            //       url:app.globalData.url+'/song/detail',
            //       data:{
            //           ids:res.playList.join
            //       },
            //       success:res=> {
            //           console.log(res)
            //       }
            //   })
            // app.globalData.playList = this.data.songList
            //   var i;
            //   for(i = 0; i < this.data.songList.length;i++){
            //       console.log(i)
            //       wx.request({
            //           url: app.globalData.url + 'song/detail',
            //           data:{
            //               id: this.data.songList[i].id,
            //           },
            //           success: res => {
            //               console.log(res.data)
            //           },
            //           fail: err => {
            //               console.log(err)
            //           }
            //       })
            //   }
          } 
      )
   }
}