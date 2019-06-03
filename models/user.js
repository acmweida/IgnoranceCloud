import {HTTP} from "../utils/http.js";
import { config } from "../config.js";
const http = new HTTP()

export class UserModel {
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
    http.request({
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
}