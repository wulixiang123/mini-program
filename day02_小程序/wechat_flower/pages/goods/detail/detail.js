import { findGoodsDetail, addToCart } from "../../../utils/api";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {}, // 商品信息对象
    isShowActionSheet: false, // 控制祝福语弹窗显隐
    isAddCart: true, // 区分点击的是添加购物车 || 立即购买
    blessing: '', // 祝福语
    goodsId: '', // 商品id
    count: 1, // 商品数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let goodsId = options.goodsId;
    this.setData({
      goodsId
    })
    this.getGoodsDetail(goodsId);
  },

  /* 获取商品信息对象的功能函数 */
  async getGoodsDetail(goodsId){
    try {
      let result = await findGoodsDetail(goodsId);
      if(result.code === 200){
        // 更新商品信息对象
        this.setData({
          goodsDetail: result.data
        })
        // 动态修改页面窗口的title
        wx.setNavigationBarTitle({
          title: result.data.name
        })
      }
    } catch (error) {
      console.log(error);
      
    }
  },

  /* 点击加入购物车的回调 */
  handleAddToCart(){
    this.setData({
      isShowActionSheet: true,
      isAddCart: true
    })

    
  },

  /* 点击祝福语弹窗确定按钮的回调 */
  handleConfirm(){
    let {goodsId, count, blessing, isAddCart} = this.data;
    if(isAddCart){
      // 添加购物车
      this.addToCartById({goodsId, count, blessing});

    }else {
      // 立即购买
      if(blessing){
        // 跳转至订单详情页
        wx.navigateTo({
          url: `/pages/order/detail/detail?goodsId=${goodsId}&blessing=${blessing}`
        })

      }else {
        wx.showToast({
          title: '祝福语必填',
          icon: 'error'
        })
      }
    }
  },

  /* 将商品添加至购物车的功能函数 */
  async addToCartById(params){
    try {
      let result = await addToCart(params);
      if(result.code === 200){
        wx.showToast({
          title: '添加成功'
        })

        this.setData({
          blessing: '',
          isShowActionSheet: false,
          count: 1
        })
      }
    } catch (error) {
      console.log(error);
      
    }
  },
  /* 点击立即购买的回调 */
  handleBuyNow(){
    this.setData({
      isShowActionSheet: true,
      isAddCart: false
    })
  },

  /* 点击弹窗遮罩的回调 */
  onClose(){
    this.setData({
      isShowActionSheet: false

    })
  },

  /* 修改商品数量的回调 */
  handleChangeShopCount(e){
    this.setData({
      count: e.detail*1
    })
  },

})