const { wxLogin } = require("../../utils/api")

// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  getUserProfile(){
    wx.login({
      success: (res)=>{
        let code = res.code
        this.login(code)
      }
    })
  },
  async login(code){
    try {
      let result = await wxLogin(code)
      if(result.code === 200){
        wx.setStorageSync('mushang_token', result.data.token)
      }
    } catch (error) {
      console.log(error);
    }
  }
})