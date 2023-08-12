<template>
    <view class="card_item_container">
      <image
        src="https://gdhrss-1251316161.file.myqcloud.com/public/d374bc72595af15e3e192c3b0f1c22fc172606ce1660902235381/1192x608.png"
        mode="widthFix"
        class="card_img"
      />
      <view class="card_content">
        <view class="card_title">H5实战</view>
        <view class="card_less_num">56 已学习</view>
        <view class="card_price_buy_count flex">
          <view class="card_price">￥ 1888</view>
          <view class="card_buy_count">10 人已购买</view>
        </view>
      </view>
    </view>
  </template>
  <script lang='ts' setup>
    
  </script>
  <style lang='less' scoped>
    .card_item_container {
      width: 335rpx;
      background: #eee;
      margin-bottom: 20rpx;
      padding-bottom: 30rpx;
      .card_img {
        width: 100%;
      }
  
      .card_content{
        padding: 0 10rpx;
        .card_title {
          font-size: 26rpx;
          font-weight: bold;
        }
  
        .card_less_num{
          font-size: 24rpx;
          margin: 10rpx 0;
        }
  
        .card_price_buy_count {
          font-size: 24rpx;
          .card_price {
            color: red;
            margin-right: 10rpx;
          }
        }
      }
    }
  </style>