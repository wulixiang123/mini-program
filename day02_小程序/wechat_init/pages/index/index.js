// index.js
Page({
  data: {
    num: 10,
    person:{
      name:'curry',
      age: 35
    }
  },
 onLoad(){
   console.log('------ 页面加载 onLoad()------');
 },
 onShow(){
   console.log('------ 页面显示 onShow()------');
 },
 onReady(){
   console.log('------ 页面初始化渲染完成 onReady()------');
 },
 onHide(){
   console.log('------ 页面隐藏 onHide()------');
 },
 onUnload(){
   console.log('------ 页面卸载 onUnload()------');
 },
 toLogs(){
   wx.navigateTo({
     url: '/pages/logs/logs',
   })
 }
})
