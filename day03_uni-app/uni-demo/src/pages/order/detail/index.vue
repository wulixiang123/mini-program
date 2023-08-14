<template>
    <view class="container pay-wrap">
      <view class="item">
        <view class="title">订单信息</view>
        <view class="msg"
          >课程名称：<text>{{ orderInfo.courseTitle }}</text></view
        >
        <view class="msg"
          >授课老师：<text>{{ orderInfo.teacherName }}</text></view
        >
        <view class="msg"
          >订单编号：<text>{{ orderInfo.orderNo }}</text></view
        >
      </view>
      <view class="item">
        <view class="title">购买账户</view>
        <view class="msg"
          >账户名：<text>{{ orderInfo.nickname }}</text></view
        >
        <view class="msg"
          >联系电话：<text>{{ orderInfo.mobile }}</text></view
        >
      </view>
      <view class="item">
        <view class="title">结算</view>
        <view class="msg msg_price"
          >订单原价：<text class="price">¥{{ orderInfo.totalFee }}</text></view
        >
        <view class="msg msg_price">已优惠：<text class="price">¥ 1888</text></view>
        <view class="msg msg_price"
          >需支付金额：<text class="price">¥{{ orderInfo.totalFee - 1888 }}</text></view
        >
        <view class="check">
          <checkbox-group >
            <checkbox :checked="isChecked" style="transform: scale(0.7)" @click="isChecked = !isChecked"/> 同意
          </checkbox-group>
          <navigator class="'link" url=""> 《谷粒微课购买协议》 </navigator>
        </view>
      </view>
      <view class="pay">
        <view class="price">
          实际支付
          <text>¥{{ orderInfo.totalFee - 1888 }}</text>
        </view>
        <view class="pay_btn" @click="handleGoPay">去付款</view>
      </view>
    </view>
  </template>
  
  <script setup lang="ts">
  import {onLoad} from '@dcloudio/uni-app'
  import {ref} from 'vue'
  import orderService from '@/api/order'
  import type {QueryObject} from '@/constrint/types'
  
  /* 定义初始化数据 */
  let courseId = ''
  let orderId = ''
  
  /* 定义响应式数据 */
  const orderInfo = ref<QueryObject>({id: ''})
  let isChecked = ref(false)
  
  onLoad((options) => {
    courseId = options!.courseId
    saveOrder()
  })
  
  /* 获取订单id的功能函数 */
  async function saveOrder(){
    try {
      let result = await orderService.saveOrder(courseId)
      if(result.code === 200){
        // 更新订单id
        orderId = result.data.orderId
        // 根据订单id获取订单详情信息
        getOrderInfo(orderId)
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  // 获取订单信息的功能函数
  async function getOrderInfo(orderId: string){
    try {
      let result = await orderService.getOrderInfo(orderId)
      if(result.code === 200){
        orderInfo.value = result.data.item
      }
    } catch (error) {
      
    }
  }
  
  /* 点击去支付的回调 */
  function handleGoPay(){
    if(isChecked.value){
      getPayParams(orderInfo.value.orderNo)
    }else {
      uni.showToast({
        title: '请勾选协议',
        icon: 'error'
      })
    }
  }
  
  /* 获取支付参数的功能函数 */
  async function getPayParams(orderNo: string){
    try {
      let result = await orderService.getPayParams(orderNo)
      if(result.code === 200){
        // 发起支付
        /* 
          nonceStr: "hd6d4G77OS05hrgV"
          package: "prepay_id=wx141557066526771d33d510e973b2b20000"
          paySign: "CF58DE64BC59C318648AF53191026237"
          signType: "MD5"
          timeStamp: "1691999826709"
        */
        uni.requestPayment({
        provider: 'wxpay',
        nonceStr: result.data.nonceStr,
        package: result.data.package,
        paySign: result.data.paySign,
        signType: result.data.signType,
        timeStamp: result.data.timeStamp,
        success: () => {
        // 支付状态查询
        },
        fail: (error) => {
        console.log(error)
        },
        orderInfo: ''
      })
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  
  </script>
  
  <style lang="scss" scoped>
  .container {
    .pay-wrap {
      min-height: 100vh;
    }
    background: rgba(130, 145, 158, 0.1);
    .item {
      background: #fff;
      margin-bottom: 8px;
      padding: 12px 16px;
      .title {
        color: #7b8998;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
      }
      .msg {
        font-size: 12px;
        color: #7b8998;
        height: 20px;
        line-height: 20px;
        &.msg_price {
          display: flex;
          width: 100%;
          justify-content: space-between;
        }
        text {
          color: #072943;
          &.price {
            color: #ff0042;
          }
        }
      }
    }
  
    .check {
      color: #7b8998;
      display: flex;
      align-items: center;
      font-size: 12px;
      padding-top: 16px;
      .link {
        color: rgb(33, 150, 243);
      }
    }
  
    .pay {
      background: linear-gradient(
        180deg,
        hsla(0, 0%, 86.7%, 0) 0,
        hsla(0, 0%, 86.7%, 0.2) 0.42857rem,
        hsla(0, 0%, 86.7%, 0.2) 0.57143rem,
        #fff 0.64286rem,
        #fff
      );
      position: fixed;
      width: 100%;
      left: 0;
      bottom: 0;
      height: 65px;
      display: flex;
      align-items: center;
      justify-content: space-around;
  
      .price {
        font-size: 12px;
        color: #7b8998;
        text {
          color: #ff0042;
          font-size: 18px;
        }
      }
  
      .pay_btn {
        width: 35%;
        height: 40px;
        line-height: 40px;
        color: #fff;
        font-size: 18px;
        background: #ff0042;
        border-radius: 40px;
        text-align: center;
      }
    }
  }
  </style>