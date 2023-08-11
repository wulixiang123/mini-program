const { findOrderAddress, orderTrade } = require("../../../utils/api");
const { formatDate } = require("../../../utils/formate");

// pages/order/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '', // 商品id
    blessing: '', // 祝福语
    addressInfo:{},//订单地址信息对象
    userAddressId:'',//用户地址id
    cartList:[],//商品列表
    orderInfo:{},//订单详情
    buyName:'',//购买人姓名
    buyPhone:'',//购买人电话
    isShowPopup:false,//控制popup弹层显隐
    minDate:new Date().getTime(),//最小时间
    deliveryDate:'',//期望送达日期
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
          addressInfo:result.data,
          userAddressId:result.data?result.data.id:''//避免用户首次访问的地址对象为null的情况
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

  // 点击期望送达日期cell的回调
  handleShowPopup(){
    this.setData({
      isShowPopup:true
    })
  },
  // 关闭遮罩的功能函数
  onClose(){
    this.setData({
      isShowPopup:false
    })
  },

  // 点击日期确认按钮的回调
  handleConfirm(e){
    console.log(e.detail); // 当前的时间戳
    // console.log(e.detail.getFullYear());
    // console.log(Date.now()); // 1691715451375
    // console.log(new Date()); // Fri Aug 11 2023 08:57:31 GMT+0800 (中国标准时间)
    // console.log(new Date(e.detail).getFullYear()); // 
    // console.log(new Date(e.detail).getMonth() + 1); // 
    // console.log(new Date(e.detail).getDate()); // 

    // this.setData({
    //   deliveryDate: `${new Date(e.detail).getFullYear()}-${new Date(e.detail).getMonth() + 1}-${new Date(e.detail).getDate()}`,
    //   isShowPopup: false
    // })

    this.setData({
      deliveryDate: formatDate(new Date(e.detail), 'YYYY-MM-DD'),
      isShowPopup: false
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