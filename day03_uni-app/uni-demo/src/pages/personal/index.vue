<template>
 <view class="container user">
    <view class="info dark-mode">
      <h1 class="info_title">
        <block v-if="!userInfo.nickname">
          <image class="info_title_logo" src="/static/02.jpg" />
          <text class="info_title_name" @click="toLogin">去登陆</text>
        </block>

        <block v-else>
          <image class="info_title_logo" :src="userInfo.avatar" />
          <text class="info_title_name">{{userInfo.nickname}}</text>
        </block>
      </h1>
      <view class="info_list">
        <view class="info_item">
          <navigator class="item_a info-link" url="/pages/order/list/index">
            <uni-icons type="shop-filled" size="24" color="#333"></uni-icons>
            <text class="item_dsc">我的订单</text>
          </navigator>
        </view>
        <view class="info_item">
          <navigator class="item_a info-link" url="/pages/course/collect/index">
            <uni-icons type="vip-filled" size="24" color="#333"></uni-icons>
            <text class="item_dsc">我的收藏</text>
          </navigator>
        </view>
      </view>
    </view>
    <view class="list"></view>
    <view class="logout dark-mode info-link">退出登陆</view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { userStoreModel } from "@/store/user";
const userStore = userStoreModel();

/* 定义响应式数据 */
const userInfo = reactive({
  avatar: "",
  nickname: "",
});

/* 生命周期 */
onShow(() => {
  // 判断用户是否登录
  userStore.isLogin(() => {
    // 判断是否有用户信息
    if (userStore.userInfo.nickname) {
      userInfo.avatar = userStore.userInfo.avatar;
      userInfo.nickname = userStore.userInfo.nickname;
    } else {
      userStore.getUserInfo();
    }
  });
});

/* 点击登录的回调 */
function toLogin() {
  uni.navigateTo({
    url: "/pages/login/index",
  });
}
</script>

<style scoped lang="less">
.user {
  height: 100vh;
  background: #eee;
}
.info {
  background: #00cc99;
  &_title {
    height: 97px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    border-bottom: 1rpx solid #eee;
    border-top: 1rpx solid #eee;
    &_logo {
      height: 60px;
      width: 60px;
      border-radius: 50%;
      background: #fff;
    }
    &_name {
      margin-left: 10px;
      color: #333;
      font-size: 20px;
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-wrap: normal;
    }
  }
  &_list {
    display: flex;
    .info_item {
      width: 50%;
      text-align: center;
      .item_a {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 24px 0;
      }
      .item_dsc {
        font-size: 14px;
        margin-top: 8px;
      }
    }
  }
}

.logout {
  height: 52px;
  line-height: 52px;
  text-align: center;
  margin-top: 10px;
  background: #00cc99;
}

.popup_height {
  height: 100px;
  width: 100%;
  background: #fff;
}
</style>