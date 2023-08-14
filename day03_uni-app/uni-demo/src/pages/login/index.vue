<template>
    <view class="container login_container">
      <view class="login_content">
        <view class="login_logo"></view>
        <view class="login_main_type">
          <button class="login_main_type_item" @click="handleLogin">
            <text >微信登陆</text>
          </button>
        </view>
      </view>
      <view class="login_footer">
        <view class="login_protocol">
          <view :class="['login_check_icon', isChecked && 'checked']" @click="isChecked = !isChecked"></view>
          <view class="login_block">
            我已阅读并同意
            <navigator class="link">用户协议</navigator>
            和
            <navigator class="link">隐私声明</navigator>
          </view>
        </view>
      </view>
    </view>
  </template>
  <script lang='ts' setup>
  import {ref} from 'vue'
  
  import userService from '@/api/user'
  import {userStoreModel} from '@/store/user'
  const userStore = userStoreModel()
  
  
  /* 定义响应式数据 */
  let isChecked = ref(false)
  
  
  /* 点击登录的回调 */
  function handleLogin(){
    if(isChecked.value){
      // 登录请求
      // 1. 获取用户的临时登录凭证code
      uni.login({
        success: (res) => {
          let code = res.code
          // 2. 将code发送给商家服务器端，商家服务器端根据code + appid + appSecrect 获取用户的唯一标识openid，商家服务器端加密后返回token
          login(code)
        }
      })
  
    }else { // 未勾选
      uni.showToast({
        title: '请勾选协议',
        icon: 'error'
      })
    }
  }
  
  /* 用户登录的功能函数 */
  async function login(code: string){
    try {
      let result = await userService.login(code)
      if(result.code === 200){
        // 3. 将token存入本地storage
        uni.setStorageSync('gulitoken', result.data.token)
        // 4. 获取用户信息
        await userStore.getUserInfo()
  
        // 5. 回退页面
        uni.navigateBack()
  
      }
    } catch (error) {
      console.log(error);
    }
  }
    
  </script>
  
  
  
  <style lang='less' scoped>
    .login_container {
    background: #00CC99;
    border-top: 1rpx solid #eee;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    .login_content {
      padding: 0 36px;
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 48px;
      .login_logo {
        width: 72px;
        height: 72px;
      }
      .login_main_type {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 48px;
  
        .login_main_type_item {
          height: 56px;
          margin-bottom: 24px;
          border-radius: 30px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80%;
          text-align: center;
          image {
            width: 26px;
            height: 26px;
          }
          text {
            margin-left: 8px;
            color: #333;
            font-size: 18px;
          }
        }
      }
      .login_more {
        color: #fff;
        font-size: 14px;
      }
    }
    .login_footer {
      .login_protocol {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        .login_block {
          display: flex;
          color: #333;
        }
        .login_check_icon {
          width: 24px;
          height: 24px;
          background-repeat: no-repeat;
          background-size: 24px 48px;
          background-image: url('https://8.idqqimg.com/edu/mobilev2/m-core/1f3256dafe9eb438879b434bd4105394.png');
          background-position: 0 0;
          &.checked {
            background-position: 0 -24px;
          }
        }
        .link {
          color: #fff;
        }
      }
    }
  }
  </style>