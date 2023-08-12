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
      <card-list title="热门课程" all="全部课程">
        <card-item 
        :cardItem="cardItem" 
        type="course" 
        v-for="cardItem in courseList" 
        :key="cardItem.id">
      </card-item>
      </card-list>

      <card-list title="名师大咖" all="全部老师">
        <card-item 
        :cardItem="cardItem" 
        type="teacher" 
        v-for="cardItem in teacherList" 
        :key="cardItem.id">
      </card-item>
      </card-list>
    </view>
    <!-- 回到顶部 -->
    <back-top></back-top>
  </view>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue'
import { onLoad,onPageScroll } from '@dcloudio/uni-app'

import {bannerCateList,hotCateList} from '@/common/mock/home'
import type { QueryObject } from '@/constrint/types'
import courseService from '@/api/course'


const bannerList = ref(bannerCateList)
const navList = ref(hotCateList)

const teacherList = ref<QueryObject[]>([])
const courseList = ref<Array<QueryObject>>([])
const isShow = ref(false)
// 生命周期
onLoad(()=>{
  getHomeData()//发送请求,获取主页数据
})

// onPageScroll((res) => {
//   if(res.scrollTop > 400){
//     isShow.value = true
//   }else {
//     isShow.value = false
//   }
// })

onPageScroll((res)=>{
  uni.$emit('pageScroll',res.scrollTop)
})


// 自定义功能函数-----获取主页数据功能函数
async function getHomeData(){
  try {
    let result = await courseService.getHomeData()
    if(result.code === 200){
      // 更新响应式数据
      teacherList.value = result.data.teacherList
      courseList.value = result.data.courseList
    }
  } catch (error) {
    console.log(error);
    
  }
}
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