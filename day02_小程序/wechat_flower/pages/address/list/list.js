import { deleteUserAddress, findUserAddress } from "../../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [], // 地址列表
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(options) {
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
  },

  // 点击删除地址的回调
  handleDelAddress(e){
    wx.showModal({
      title: '确定删除吗?',
      content: e.currentTarget.dataset.name,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if(result.confirm){
          this.delAddress(e.currentTarget.dataset.id)
        }
      }
    });
  },

  // 删除地址的功能函数
  async delAddress(addressId){
    try {
      let result = await deleteUserAddress(addressId)
      if(result.code === 200){
        this.getUserAddressList()
      }
    } catch (error) {
      console.log(error);
    }
  },
  // 点击跳转至新增地址页面
  toEdit(e){
    wx.navigateTo({
      url: `/pages/address/add/add?addressId=${e.currentTarget.dataset.id}`,
    })
  }
})