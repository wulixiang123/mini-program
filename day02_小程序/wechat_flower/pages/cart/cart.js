const { findCartList } = require("../../utils/api")

// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:[],//购物车列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {


  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 判断用户是否登录
    if (!wx.getStorageSync('mushang_token')) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }else{
      this.getCartList()
    }
  },

  // 获取购物车列表数据的功能函数
  async getCartList(){
    try {
      let result = await findCartList()
      if(result.code === 200){
        this.setData({
          cartList:result.data
        })
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})