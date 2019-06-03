import { UserModel } from '../../models/user.js'
const userMode = new UserModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    password:""
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
      userMode.login(phone,password)
    }
  }
})