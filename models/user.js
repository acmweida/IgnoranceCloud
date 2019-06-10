import {HTTP} from "../utils/http.js";
import { config } from "../config.js";

export class UserModel extends HTTP {
  isLoaded() {
    const userinfo = wx.getStorageSync(
      'userinfo'
    )
    if (userinfo) {
      return true
    } 
    return false
  }

  login(phone,password){
    //console.log(config.api_login)
    login_ok : true
    this.request({
      url: config.api_login,
      data: {
        phone: phone,
        password: password
      }
    }).then(res => {
      const user = res
      wx.setStorage({
        key: 'user',
        data: {
           user
        }
      })
      //console.log(res)
      wx.setStorage({
            key: 'userinfo',
            data: {
              phone: phone,
              password: password
            }
        })
        this.login_ok = true
      }
    )
    return this.login_ok
  }

  getUserListOfSongList(sCallback) {
    const userinfo = wx.getStorageSync('user').user
    //console.log(userinfo)
    const promise = this.request({
      url:  'user/playlist',
      data:{
        uid: userinfo.account.id
      }
    }).then(res=>{
        console.log("---")
        console.log(res.playlist)
         sCallback(res.playlist)
       })
  }



}