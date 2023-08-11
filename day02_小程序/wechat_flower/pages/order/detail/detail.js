const { findOrderAddress, orderTrade, submitOrder, createJsapi, queryPayStatus } = require("../../../utils/api");
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
    orderNo:'',//订单号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let {goodsId, blessing} = options;
    
    if(goodsId){
      // 立即购买
      this.setData({
        goodsId,
        blessing
      })
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

  // 点击去结算的回调
  handleGoPay(){
    // 前端验证参数
    let {buyName, buyPhone, cartList, deliveryDate, userAddressId, blessing} = this.data;
    if(
      buyName && buyPhone && cartList && deliveryDate && userAddressId
    ){
      // 整理参数
      let params = {
        buyName, buyPhone, cartList, deliveryDate, userAddressId,
      }
      blessing && (params.remarks = blessing)
      this.submitOrderByToken(params)
    }else{
      wx.showToast({
        title: '订单信息不完整',
        icon: 'error',
      })
    }
  },

  // 提交订单的功能函数
  async submitOrderByToken(params){
    debugger
    try {
      let result = await submitOrder(params)
      if(result === 200){
        // 1.更新订单号orderNo
        this.setData({
          order:result.data
        })
        debugger
        // 2.微信下单 - 获取支付参数
        this.getPayParams(this.data.orderNo)
      }
    } catch (error) {
      console.log(error);
    }
  },

  // 微信下单,获取支付参数
  async getPayParams(orderNo){
    try {
      let result = await createJsapi(orderNo)
      if(result.code === 200){
        /* 
          result.data: 
            nonceStr: "l5H1GM7e17u8ZW6g"
            package: "prepay_id=wx11101935235852a901e3fddee7d5730000"
            paySign: "B98B7AF72E23FFC542325F12CF61F86D"
            signType: "MD5"
            timeStamp: "1691720375319"
        */

      // 3.发起微信支付
      wxLoginwx.requestPayment({
        ...result.data,
        success: function(res){
          console.log('支付成功');
          // 4.查询订单支付状态 - 问商家服务器端
          this.getOrderStatus(orderNo)
        },
        fail: function(e) {
          console.log(e);
        },
      })
      }
    } catch (error) {
      console.log(error);
    }
  },

  // 查询订单支付状态的功能函数
  async getOrderStatus(orderNo){
    try {
      let result = await queryPayStatus(orderNo)
      if(result.code === 200){
        //跳转页面至支付成功页面
        wx.redirectTo({
          url: '/pages/order/result/result',
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