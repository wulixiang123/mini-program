const { findOrderAddress, orderTrade } = require("../../../utils/api");

// pages/order/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '', // 商品id
    blessing: '', // 祝福语
    addressInfo:{},//订单地址信息对象
    cartList:[],//商品列表
    orderInfo:{},//订单详情
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
    if(goodsId){
      // 立即购买
      this.getOrderInfoBuyNow({goodsId,blessing})
    }else{
      // 购物车去结算
      this.getOrderTrade()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getOrderAddressInfo()
  },

  // 获取订单地址信息的功能函数
  async getOrderAddressInfo(){
    try {
      let result = await findOrderAddress()
      if(result.code === 200){
        this.setData({
          addressInfo:result.data
        })
      }
    } catch (error) {
      console.log(error);
    }
  },


  // 获取订单详情 --- 立即购买的功能函数
  async getOrderInfoBuyNow(params){
    try {
      let result = await orderBuy(params)
      if(result.code === 200){
        this.setData({
          orderInfo:result.data,
          cartList:result.data.cartList
        })
      }
    } catch (error) {
      console.log(error);
    }
  },


  // 获取订单详情 --- 购物车去结算的功能函数
  async getOrderTrade(){
    try {
      let result = await orderTrade()
      if(result.code === 200){
        this.setData({
          orderInfo:result.data,
          cartList:result.data.cartVoList
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