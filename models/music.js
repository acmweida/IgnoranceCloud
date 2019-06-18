import { HTTP } from '../utils/http.js';
var app = getApp()
export class MusicModel extends HTTP{
    getDayRecommendSongList() {
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

  getSongListClassification() {
    return  this.request({
        url: 'playlist/hot'
      })
  }

  getRecommendSongList() {
    return this.request({
      url:"personalized"
    })
  }

  getSongListByKind(cat) {
      return this.request({
          url:"top/playlist",
          data:{
            cat:cat,
            before:0,
            limit:18
          }
        })
  }

  getMoreSonglist(cat) {
    let day = new Date().getDate()
    let list = wx.getStorageSync(cat + day)
    console.log(list)
    this.request({
      url:"top/playlist",
      data:{
        cat:cat,
        before:list.length,
        limit:18
      }
    }).then(res=>{
      list =list.concat(res.playlists)
      let day = new Date().getDate()
      console.log(day)
      console.log(list)
      wx.setStorage({
        key: cat + day,
        data:list
      })
    })
   

  }

}