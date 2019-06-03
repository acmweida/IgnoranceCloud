import { HTTP } from '../utils/http.js'
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
}

