const { updateUser } = require("../../utils/api");

// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    nickname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      avatarUrl:userInfo.headimgurl,
      nickname:userInfo.nickname
    })
  },

  // 点击选择用户头像的回调
  onChooseAvatar(res){
    // console.log(res);
    this.setData({
      avatarUrl:res.detail.avatarUrl
    })
  },
  // 点击忽略设置按钮的回调
  handleCancel(){
    wx.navigateBack(// 回退到上一级页面
    //   {
    //   delta: 1, // 回退前 delta(默认为1) 页面
    // }
    )
  },
  // 点击提交设置按钮的回调
  handleSubmit(){
    if(this.data.avatarUrl && this.data.nickname){
      let userInfo = {
        headimgurl:this.data.avatarUrl,
        nickname:this.data.nickname
      }
      this.updateUserInfo(userInfo)
    }else{
      wx.showToast({
        title: '头像昵称不完整',
        icon: 'error',
        duration: 1800
      })
    }
  },
  // 更新用户信息的功能函数
  async updateUserInfo(userInfo){
    try {
      let result = await updateUser(userInfo)
      if(result.code === 200){
        wx.showToast({
          title:'更新成功'
        })
        wx.setStorageSync('userInfo', userInfo)// 同步更新本地存储的用户信息数据
        wx.navigateBack()// 跳转页面， 个人中心页
      }
    } catch (error) {
      console.log(error);
    }
  },
  handleInput(){},//解决input同步输入没有回调产生的报错
})