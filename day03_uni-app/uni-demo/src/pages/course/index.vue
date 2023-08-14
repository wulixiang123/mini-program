<template>
        <view class="course_list_container">
    <view class="course_list">
      <view class="course_item flex" v-for="item in courseList" :key="item.id">
        <image :src="item.cover" mode="scaleToFill" class="course_img" />

        <view class="course_content flex_c">
          <view class="course_title">{{ item.title }}</view>
          <view class="course_price_buy_count flex">
            <view class="course_price">￥ {{ item.price }}</view>
            <view class="course_buy_count">{{ item.buyCount }} 人购买</view>
          </view>
        </view>
      </view>
    </view>

    <view class="nomore" v-if="moreStatus === 'noMore'">--- 没有更多数据了 ----</view>
    </view>
</template>

<script setup lang="ts">
import {onLoad,onReachBottom} from '@dcloudio/uni-app'
import { ref } from "vue";
import courseService from "@/api/course";
import type { QueryObject, MoreStatusType } from "@/constrint/types";

/* 定义响应式数据 */
const courseList = ref<QueryObject[]>([]);
let moreStatus = ref<MoreStatusType>("more");

/* 分页加载的参数 */
let params = {
  page: 1,
  limit: 10,
};

/* 生命周期 */
onLoad(() => {
  getCourseList();
});

onReachBottom(() => {
  // 只有后边有数据moreStatus = 'more'
  moreStatus.value == 'more' && getCourseList()
})

/* 获取课程列表的功能函数 */
async function getCourseList() {
  try {
    moreStatus.value = "loading";
    let result = await courseService.getCourseList(params);
    if (result.code === 200) {
      let items = result.data.items;
      if (items.length > 0) {
        if (items.length < params.limit) {
          moreStatus.value = "noMore";
        } else {
          moreStatus.value = "more";
        }

        courseList.value.push(...items);
        params.page++
      } else {
        // 后边一定没有数据了
        moreStatus.value = "noMore";
      }
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped lang="less">
.course_list_container {
  height: 100%;
  background: #eee;
  .course_list {
    .course_item {
      padding: 20rpx;
      background: #fff;
      margin-bottom: 20rpx;
      .course_img {
        width: 226rpx;
        height: 128rpx;
        margin-right: 20rpx;
        flex-shrink: 0;
      }

      .course_content {
        justify-content: space-evenly;
        .course_title {
          font-size: 28rpx;
        }
        .course_price_buy_count {
          .course_price {
            color: red;
            font-weight: bold;
            margin-right: 20rpx;
          }
        }
      }
    }
  }
  .nomore {
    text-align: center;
    height: 70rpx;
    line-height: 70rpx;
  }
}
</style>