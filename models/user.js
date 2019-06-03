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



    http.request({
      url: config.api_login,
      data: {
        phone: phone,
        password: password
      }
    }).then(res => {
      console.log(res)
      wx.setStorage({
            key: 'userinfo',
            data: {
              phone: this.data.phone,
              password: this.data.password
            }
      })
      }
    )
    
    // wx.request({
    //   url: app.globalData.url + config.login,
    //   data: {
    //     phone: phone,
    //     password: password
    //   },
    //   success: (res) => {
    //     if (res.data.code == 200) {
          
    //      // app.globalData.cookies = res.header['Set-Cookie']
          
    //       wx.redirectTo({
    //         url: '/pages/main/index',
    //       })
    //     } else {
          
    //     }
    //   }
    // })
  }
}