import { UserModel } from '../../models/user.js'
const userMode = new UserModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    password:""
  },

  onLoad: function (options) {
    if (userMode.isLoaded()) {
        const userinfo = wx.getStorageSync(
          'userinfo'
        )
        this.data.phone = userinfo.phone
        this.data.password = userinfo.password
        this.login()
        wx.redirectTo({
          url: '/pages/main/index',
        })
      }
    },

  phone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  password(e) {
    this.setData({
      password: e.detail.value
    })
  },

  login(event){
    const phone = this.data.phone
    const password = this.data.password
   
    if (phone && password) {
     // console.log(password)
      if (userMode.login(phone,password)) {
        wx.redirectTo({
          url: '/pages/main/index',
        })
      }
    }
  }

  
})