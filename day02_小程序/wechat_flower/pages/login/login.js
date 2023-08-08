const { wxLogin, getuserInfo } = require("../../utils/api")

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
  getUserProfile(){/* 点击登录授权按钮的回调 */
    wx.login({
      success: (res)=>{// 1. 在小程序客户端获取code
        let code = res.code
        this.login(code)// 2. 将code发送给商家服务器，获取openId， openId给到商家服务器端，服务器端进行加密处理，并返回token
      }
    })
  },
  async login(code){/* 用户登录的功能函数 */
    try {
      let result = await wxLogin(code)
      if(result.code === 200){
        // 3. 将用户token存储至本地storage
        wx.setStorageSync('mushang_token', result.data.token)
        // 4. 根据token获取用户信息
        this.getUserInfoByToken();
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 获取用户信息的功能函数
  async getUserInfoByToken(){
    try {
      let result = await getuserInfo()
      if(result.code === 200){
        wx.setStorage({// 将用户信息存储至本地
          key:'userInfo',
          data:result.data
        });
        // 跳转至编辑个人信息页
        wx.redirectTo({
          url: '/pages/edit/edit',
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
})