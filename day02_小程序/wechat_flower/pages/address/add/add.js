import { findAddressInfo, saveUserAddress, updateAddressInfo } from "../../../utils/api";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '', // 收件人
    phone: '', // 电话
    address: '', // 收件地址
    isDefault: 0, // 是否是默认地址
    tagName: '家', // 标签
    region: '', // 省市县三级联动数据
    provinceCode: '', // 省code
    cityCode: '', // 市code
    districtCode: '', // 区/县code
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options.addressId){
      wx.setNavigationBarTitle({
        title: '编辑地址信息',
      })
      this.setData({
        addressId:options.addressId
      })
      this.getAddressInfo(this.data.addressId)
    }
  },


  /* 点击切换switch组件的回调 */
  handleSwitchChange(e){
    console.log(e);
    this.setData({
      isDefault: e.detail.value?1:0
    })
  },

  /* picker值发生改变的时候的回调 */
  handlePickerChange(e){
    console.log(e);
    this.setData({
      region: e.detail.value.join('/'),
      provinceCode: e.detail.code[0],
      cityCode: e.detail.code[1],
      districtCode: e.detail.code[2]
    })

    // 如何反转字符串？？  abc --- cba
    // let str = 'abc';
    // str = str.split('');
    // str = str.reverse();
    // str = str.join('');
  },

  /* 添加地址的功能函数 */
  async addUserAddress(params){
    try {
      let result = await saveUserAddress(params);
      if(result.code ===200){
        wx.showToast({
          title: '添加成功',
          duration: 3000,
          success: () => {
            wx.navigateBack();
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  },


  /* 点击保存地址的回调 */
  handleSave(){
    // 1. 前端验证
    let {name, phone, address, region, tagName, isDefault,addressId} = this.data;
    if(
      name &&
      phone &&
      address && 
      region
    ){
      // 验证手机号正则
      let reg = /^1[3-9]\d{9}$/;

      if(reg.test(phone)){
        if(addressId){
          // 修改地址信息
          this.updateAddress({
            id:addressId,
            ...this.addUserAddress(this.data)
          })
        }else{
          // 新增地址
          this.addUserAddress(this.data)
        }
        this.addUserAddress(this.data);
      }else {
        wx.showToast({
          title: '手机号格式不正确',
          icon: 'error'
        })
      }

    }else {
      wx.showToast({
        title: '内容不完整',
        icon: 'error'
      })
    }
  },
  // 根据addressId获取对应地址信息的功能函数
  async getAddressInfo(addressId){
    try {
      let result = await findAddressInfo(addressId)
      if(result.code === 200){
        let {name, phone, address, isDefault, tagName,provinceName, cityName, districtName, provinceCode, cityCode, districtCode } = result.data;
        this.setData({
          name, phone, address, isDefault, tagName,provinceCode, cityCode, districtCode,
          region:`${provinceName}/${cityName}/${districtName}`
        })
      }
    } catch (error) {
     console.log(error); 
    }
  },

  //修改更新地址的功能函数
  async updateAddress(params){
    try {
      let result = await updateAddressInfo(params)
      if(result.code === 200){
        wx.showToast({
          title: '修改成功',
          success:()=>{
            wx.navigateBack()
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
})