<template>
  <view class="index_container">
    <!-- 轮播图 -->
    <swiper
      indicator-dots
      autoplay
      circular
      class="banners"
    >
      <swiper-item v-for="(item,index) in bannerList" :key="index">
        <image
          :src="item.src"
          mode="scaleToFill"
        />
      </swiper-item>
    </swiper>

    <!-- 导航列表 -->
    <view class="nav_list flex">
      <view class="nav_item flex_c" v-for="(item, index) in navList" :key="index">
        <image
          :src="item.src"
          mode="scaleToFill"
        />
        <text>{{ item.name }}</text>
      </view>
    </view>

    <!-- 内容区 -->
    <view class="content_container">
      <card-list>
        <card-item></card-item>
        <card-item></card-item>
        <card-item></card-item>
        <card-item></card-item>
      </card-list>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue'
import {bannerCateList,hotCateList} from '@/common/mock/home'

const bannerList = ref(bannerCateList)
const navList = ref(hotCateList)
</script>

<style scoped lang="less">
.index_container {
  .banners {
    width: 100%;
    height: 300upx;
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav_list {
    .nav_item {
      width: 20%;
      align-items: center;
      image {
        width: 72upx;
        height: 72upx;
        margin: 20upx 0;
      }
      text {
        font-size: 26rpx;
      }
    }
    
  }
}
</style>