import { config } from '../config.js'
var app = getApp()

const tips = {
  1:"遇到一个未知错误",
  301:"未登陆",
  509:"登陆太频繁",
  502:"密码错误",
  400:"号码错误"
}
// # 解构
class HTTP {

  request({ url, data = {}, method = 'GET',reject }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url, resolve, reject, data = {}, method = 'GET') {
    console.log(app.globalData.cookies)
    console.log(config.api_base_url+url)
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'cookie' : app.globalData.cookies
      },
      success: (res) => {
        //console.log(res)
        const code = res.statusCode.toString()
        console.log(res)
        if (code.startsWith('2')) {
          resolve(res.data)
          //console.log(res.cookies)
          
          //  if (res.cookies.join(';')!='')
          //   app.globalData.cookies = res.cookies.join(';')
          if (res.cookies.length>0) {
            app.globalData.cookies = res.header['Set-cookies']
          }

        }
        else {
          if (reject)
            reject()
          
          const error_code = res.data.code
      //    console.log(error_code)
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        console.log(err)
        if (reject)
          reject()
        const error_code = err.data.code
       // console.log(error_code)
        this._show_error(error_code)
      }
    })

  }

  _show_error(error_code) {
    console.log(error_code)
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }


}

export { HTTP }


















