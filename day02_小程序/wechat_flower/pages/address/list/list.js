import { findUserAddress } from "../../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [], // 地址列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUserAddressList();

  },
  /* 获取用户地址信息的功能函数 */
  async getUserAddressList(){
    try {
      let result = await findUserAddress();
      if(result.code === 200){
        this.setData({
          addressList: result.data
        })
      }
    } catch (error) {
      console.log(error);
      
    }
  }
})