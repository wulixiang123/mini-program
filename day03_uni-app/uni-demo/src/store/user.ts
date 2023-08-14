import {defineStore} from 'pinia'
import {ref, reactive} from 'vue'
import userService from '@/api/user'

export const userStoreModel = defineStore('user', () => {
  // 定义用户信息对象
  const userInfo = reactive({
    nickname: '',
    avatar: ''
  })

  // 获取用户信息
  async function getUserInfo(){
    try {
      let result = await userService.getUserInfo()
      if(result.code === 200){
        userInfo.avatar = result.data.item.avatar
        userInfo.nickname = result.data.item.nickname
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 判断用户是否登录
  function isLogin(callback: () => void){
    if(uni.getStorageSync('gulitoken')){
      // 用户已登录
      callback()
    }else {
      uni.navigateTo({
        url: '/pages/login/index'
      })
    }
  }



  return {
    userInfo,
    getUserInfo,
    isLogin
  }
})