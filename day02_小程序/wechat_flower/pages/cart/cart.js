const { findCartList, checkCart, addToCart, depShop } = require("../../utils/api")

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

  // 点击商品个体checkbox的回调
  handleChangeChecked(e){
    console.log(e);
    let isChecked = +e.detail
    let goodsId = e.currentTarget.dataset.goodsid
    this.changeShopIsChecked({goodsId,isChecked})
  },

  // 修改商品选中状态功能函数
  async changeShopIsChecked(params){
    try {
      let result = await checkCart(params)
      if(result.code === 200){
        this.getCartList()//重新获取最新的购物车列表数据
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  // 修改商品数量的回调
  handleChangeShopCount(e){
    console.log(e);
    let newCount = e.detail
    let oldCount = e.currentTarget.dataset.count
    let goodsId = e.currentTarget.dataset.goodsid
    let count = newCount - oldCount
    // 只有count的差值不等于0的时候才发送请求
    count !== 0 && this.changeShopCount({goodsId,count})
  },
  // 修改商品数量的功能函数
  async changeShopCount(params){
    try {
      let result = await addToCart(params)
      if(result.code === 200){
        this.getCartList()
      }
    } catch (error) {
      console.log(error);
    }
  },

  // 点击删除商品的回调
  handleDelShop(e){
    let {goodsid,name} = e.currentTarget.dataset
    wx.showModal({
      title: '确认删除吗?',
      content: name,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if(result.confirm){
          this.depShopById(goodsid)
        }
      }
    });
  },


  // 删除商品的功能函数
  async depShopById(goodsId){
    debugger
    try {
      let result = await depShop(goodsId)
      if(result.code === 200){
        this.getCartList()
      }
    } catch (error) {
      console.log(error);
    }
  }
})