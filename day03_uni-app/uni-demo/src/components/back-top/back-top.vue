<template>
    <view class="back_top" @click="handleBackTop" v-show="isShow">
        <image
            src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/03de0936a7aafee76646b8b2d5fa5b4f.png"
            mode="scaleToFill"
            class="back_top_img"
        />
    </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
const isShow = ref(false)
onLoad(()=>{
// 订阅消息
uni.$on("pageScroll",(scrollTop)=>{
    if(scrollTop > 400){
        isShow.value = true
    }else{
        isShow.value = false
    }
})
})
// 点击回到顶部的回调
function handleBackTop(){
    uni.pageScrollTo({
        scrollTop:0
    })
}
</script>

<style scoped lang="less">
.back_top {
  position: fixed;
  right: 20rpx;
  bottom: 90rpx;
  width: 100rpx;
  height: 100rpx;
  .back_top_img {
    width: 100%;
    height: 100%;
  }
}
</style>