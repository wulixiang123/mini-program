<template>
    <view class="card_list_container">
      <!-- 标题 -->
      <view class="header flex">
        <view class="title">{{ title }}</view>
        <view class="all">{{ all }}</view>
      </view>
  
      <!-- 卡片列表 -->
      <view class="card_list flex">
        <slot></slot>
      </view>
    </view>
  </template>
  <script lang='ts' setup>
    const props = defineProps(['title','all'])
  </script>
  <style lang='less' scoped>
    .card_list_container{
      padding: 0 20rpx;
      .header{
        height: 70rpx;
        line-height: 70rpx;
        background: #00cc99;
        justify-content: space-between;
        margin: 20rpx 0;
        font-size: 28rpx;
      }
  
      .card_list {
        flex-wrap: wrap;
        justify-content: space-around;
        /* &: 父级引用 */
        &:after {
          content: '';
          width: 335rpx;
        }
      }
    }
  </style>