import { HTTP } from '../utils/http.js';
var app = getApp()
export class MusicModel extends HTTP{
    getRecommendSongList() {
      return this.request({
        url:'recommend/resource'
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
            console.log(res.playlist)
          wx.setStorageSync("playlist", res.playlist.tracks)
            sCallback(res)
          } 
      )
   }

  getSong() {
    const id = wx.getStorageSync("songid")
    const playlist = wx.getStorageSync("playlist")

    const songid = playlist[id].id
    const songinfo = this.getSongInfo(songid)
    const songdetail = this.getSongDetail(songid)
    const songword = this.getSongWord(songid)
    return Promise.all([songinfo, songdetail, songword])
  }


  getSongInfo(songid) {
      //获取歌曲信息
      return this.request({
        url: 'song/url',
        data:{
          id:songid
        }
      })
  }


  getSongDetail(songid) {
     //请求detail

     return this.request({
       url: 'song/detail',
       data:{
         ids:songid
       }
     })
  }

  getSongWord(songid) {
    //获取歌词
    return this.request({
      url: 'lyric',
      data:{
        id:songid
      }
    })
  }
}