const { findCategoryTree } = require("../../utils/api")

// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList:[],// 分类页数据
    navIndex:0,//导航的标识
    goodsInfo:{},// 右侧商品信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCateGoryList()
  },
  async getCateGoryList(){
    try {
      let result = await findCategoryTree()
      if(result.code === 200){
        this.setData({
          categoryList:result.data,
          goodsInfo:result.data[this.data.navIndex]
        })
      }
    } catch (error) {
      console.log(error);
    }
  },
  /* 点击左侧nav导航的回调 */
  handleChangeNavIndex(e){
    let navIndex = e.currentTarget.dataset.navindex
    this.setData({
      navIndex,
      goodsInfo: this.data.categoryList[navIndex]
    })
  }
})