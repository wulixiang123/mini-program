<template>
    <view class="card_item_container">
      <navigator :url="`/pages/course/detail/index?courseId=${cardItem.id}`" open-type="navigate" hover-class="navigator-hover">
        <image
        :src="type === 'course'?cardItem.cover : cardItem.avatar"
        mode="widthFix"
        class="card_img"
      />
      <view class="card_content">
        <block v-if="type === 'course'">
        <view class="card_title">{{ cardItem.title }}</view>
        <view class="card_less_num">
          <uni-icons type="fire" size="18" color="red"></uni-icons>
          {{ cardItem.lessonNum }} 已学习</view>
        <view class="card_price_buy_count flex">
          <view class="card_price">￥ {{ cardItem.price }}</view>
          <view class="card_buy_count">{{ cardItem.buyCount }} 人已购买</view>
        </view>
        </block>
        <block v-else>
            <view class="card_intro">{{ cardItem.intro }}</view>
            <view class="card_name">{{ cardItem.name }}</view>
        </block>
      </view>
      </navigator>
    </view>
  </template>
  <script lang='ts' setup>
  import type {QueryObject} from '@/constrint/types'
    // const props = defineProps<{
    //     cardItem:{
    //         type:QueryObject;
    //         required:true
    //     },
    //     type:String
    // }>()

    const props = defineProps<{
        cardItem:QueryObject,
        type:String
    }>()
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

        .card_intro{
            font-size: 26rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }

        .card_name{
            font-size: 28rpx;
            font-weight: bold;
            color: #00cc99;
            margin: 20rpx 0;
        }
      }
    }
  </style>