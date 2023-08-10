// pages/order/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '', // 商品id
    blessing: '', // 祝福语
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let {goodsId, blessing} = options;
    this.setData({
      goodsId,
      blessing
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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