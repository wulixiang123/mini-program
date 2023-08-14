<template>
  <view class="container comment">
    <!-- 评论列表 -->
    <view class="comment_wrapper">
      <view class="comment_list">
        <view class="comment_item" v-for="item in commentsList" :key="item.id">
          <view class="logo">
            <image :src="item.avatar" />
          </view>
          <view class="content_wrap">
            <view class="name">{{ item.nickname }}</view>
            <veiw class="date">
              {{ item.gmtCreate }}
              <uni-rate :touchable="false" :value="5" size="12" />
            </veiw>
            <view class="content">{{ item.content }}</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 加载更多 -->
    <view class="load_more">
      <uni-load-more status="more" />
    </view>

    <!-- 提交评论 -->
    <view class="comment_bar">
      <input class="input_box" placeholder="请点击输入" cursor-spacing="10" v-model="commentContent"/>
      <uni-icons class="input_icon" type="paperplane-filled" size="20" @click="handlerSubmitComment"/>
    </view>
  </view>
</template>

<script lang='ts' setup>
import { onLoad, onPageScroll, onReachBottom } from "@dcloudio/uni-app";
import { ref } from "vue";
import courseService from "@/api/course";
import type { QueryObject, MoreStatusType } from "@/constrint/types";
import type {SubmitCommentInterface} from '@/constrint/interfaces'

/* 定义初始化数据 */
let courseId = "";
/* 生命周期 */
onLoad((options) => {
  //  options! == 非undefined和null
  courseId = options!.courseId;
  getCommentsInfo();
});

const params = {
  page: 1,
  limit: 10,
};

/* 定义响应式数据 */
const commentsList = ref<QueryObject[]>([]);
let moreStatus = ref<MoreStatusType>("more");
let commentContent = ref('')
/* 获取评论内容的功能函数 */
async function getCommentsInfo() {
  try {
    moreStatus.value = "loading";
    let result = await courseService.getCommentsInfo({
      ...params,
      courseId,
    });
    if (result.code === 200) {
      let items = result.data.items;
      if (items.length > 0) {
        if (items.length < params.limit) {
          moreStatus.value = "noMore";
        } else {
          moreStatus.value = "more";
        }
        commentsList.value.push(...items);
        params.page++;
      } else {
        moreStatus.value = "noMore";
      }
    }
  } catch (error) {
    console.log(error);
    moreStatus.value = "error";

  }
}

/* 页面触底的事件回调 */
onReachBottom(() => {
  moreStatus.value === 'more'  && getCommentsInfo()
})

/* 点击提交评论的回调 */
function handlerSubmitComment(){
  if(commentContent.value.trim()){
    // 提交评论
    submitComment({
      content: commentContent.value,
      courseId
    })
  }else {
    uni.showToast({
      title: '内容不能为空',
      icon: 'error'
    })
  }
}

/* 提交评论的功能函数 */
async function submitComment(options: SubmitCommentInterface){
  try {
    let result = await courseService.submitComment(options)
    if(result.code === 200){
      commentContent.value = ''
      params.page = 1
      commentsList.value = []
      getCommentsInfo()
    }
  } catch (error) {
    console.log(error);
  }
}
</script>
<style lang='less' scoped>
.comment {
  background: white;
  padding: 16px 16px 60px 16px;
  .comment_list {
    .comment_item {
      display: flex;
      padding: 15px 0;
      border-bottom: 0.07143rem solid #ececec;

      .logo {
        border-radius: 50%;
        width: 32px;
        height: 32px;
        margin-right: 8px;
        image {
          border-radius: 50%;
          height: 100%;
          width: 100%;
        }
      }
      .content_wrap {
        font-size: 12px;
        color: #000;
        flex: 1;
        .date {
          color: #a1a5b2;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .content {
          margin-top: 8px;
        }
      }
    }
  }
  .comment_bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      180deg,
      hsla(0, 0%, 86.7%, 0) 0,
      hsla(0, 0%, 86.7%, 0.2) 0.42857rem,
      hsla(0, 0%, 86.7%, 0.2) 0.57143rem,
      #fff 0.64286rem,
      #fff
    );

    .input_box {
      width: 80%;
      height: 30px;
      line-height: 30px;
      background-color: #f2f3f7;
      border-radius: 20px;
      // text-indent: 10px;
      padding-left: 10px;
      font-size: 16px;
    }
    .input_icon {
      margin-left: 8px;
    }
  }
}
</style>