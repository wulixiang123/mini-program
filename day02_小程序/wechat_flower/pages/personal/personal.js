// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headimgurl: '',
    nickname: ''
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
    let userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      this.setData({
        headimgurl: userInfo.headimgurl,
        nickname: userInfo.nickname
      })
    }
  },

  /* 点击跳转至订单列表的回调 */
  gotoOrderList(){
    wx.navigateTo({
      url: '/pages/order/list/list'
    })
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