import { config } from '../config.js'

const tips = {
  '301':"未登陆",
  '509':"用户名或密码登陆"
}
// # 解构
class HTTP {

  cookies = {};

  request({ url, data = {}, method = 'GET',reject }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        cookie: this.cookies
      },
      success: (res) => {
        const code = res.statusCode.toString()
        console.log(code)
        if (code.startsWith('2')) {
          resolve(res.data)
          this.cookies = res.header['Set-Cookie']
        }
        else {
          if (reject)
            reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        if (reject)
          reject()
        const error_code = res.data.error_code
        this._show_error(error_code)
      }
    })

  }

  _show_error(error_code) {
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

















