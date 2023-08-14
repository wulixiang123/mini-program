<template>
    <view class="courser_detail_container">
      <!-- 课程内容 -->
      <view class="course">
        <view class="banner">
          <image
            :src="course.cover"
          />
        </view>
  
        <view class="info">
          <view class="price">
            <h3>
              <text>¥ {{ course.price }}</text>
            </h3>
            <view class="buy_count">已有 {{ course.buyCount }} 人购买</view>
          </view>
          <h3 class="name">
            {{ course.title }}
          </h3>
          <view class="tag_list">
            <view class="tag_item">{{ course.subjectLevelTwo }}</view>
          </view>
        </view>
  
        <!-- 课程卡片 -->
        <view class="course_card">
          <!-- 讲师介绍 -->
          <view class="intro card">
            <view class="title"> 讲师介绍 </view>
            <navigator url="讲师详情" class="teacher_info">
              <view class="avatar">
                <image
                  :src="course.avatar"
                />
              </view>
              <view class="teacher_desc">
                <view class="teacher_name">高级讲师-{{ course.teacherName }}</view>
                <view class="teacher_intro">{{course.intro }}</view>
              </view>
            </navigator>
            <view class="title"> 课程详情 </view>
            <view class="course_detail" v-html="course.description"></view>
          </view>
  
          <!-- 课程目录 -->
          <view class="catalogue card">
            <view class="title"> 课程目录 </view>
            <view class="catalogue_list">
              <uni-collapse ref="collapse" accordion>
                <uni-collapse-item :title="item.title" v-for="item in chapterList" :key="item.id">
                  <view class="task_list">
                    <view class="task_items" v-for="taskItem in item.children" :key="taskItem.id">
                      <image
                        class="task_type"
                        src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/f1c59a1527e075f6ebfba3d7ac605f07.png"
                      />
                      <view class="task_title">{{ taskItem.title}}</view>
                      <!-- v-show="!state.course.isBuy" -->
                      <image
                        v-show="!isBuy"
                        class="task_icon"
                        src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/064fdd1eb99fcb8bef80085f2b548e4b.png"
                      />
                    </view>
                  </view>
                </uni-collapse-item>
              </uni-collapse>
            </view>
          </view>
  
          <!-- 学员评价 -->
          <view class="comment card">
            <view class="title">
              <view class="title_left"> 学员评价（{{ comments.total }}）</view>
              <!-- /pages/course/comment/index?courseId=${courseId}&teacherId=${state.courseDetail.teacherId} -->
              <navigator url="" class="title_right">
                查看全部<uni-icons
                  type="right"
                  color="#666c80"
                  size="12"
                ></uni-icons>
              </navigator>
            </view>
  
            <!-- 评价列表 -->
            <view class="comment_wrapper">
              <view class="comment_list">
                <view class="comment_item" v-for="item in comments.items" :key="item.id">
                  <view class="logo">
                    <image
                      :src="item.avatar"
                    />
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
              <navigator
              :url="`/pages/course/comments/index?courseId=${courseId}`"
              open-type="navigate"
              hover-class="navigator-hover"
              >
              <uni-load-more
                status="more"
                :content-text="{ contentdown: '点击查看更多评论内容' }"
              />
            </navigator>
            </view>
          </view>
        </view>
      </view>
  
      <!-- 返回顶部 -->
      <v-back-top></v-back-top>
      <!-- 底部购买 -->
      <view class="bottom_tabbar">
        <view class="bottom_wrap">
          <view class="bottom_button">
            <view class="favo_button" >
              <view :class="['bg', isCollect ? 'active' : '']"></view>
              <!-- <view :class="['bg, active']"></view> -->
              {{ isCollect ? "已收藏" : "收藏" }}
              收藏
            </view>
          </view>
          <view class="bottom_main">
            <view class="buy_button" >
              <view class="buy_button" @click="handleGoPayOrGoStudy">
                {{ isBuy ? '去学习':'点击购买' }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </template>
  <script lang='ts' setup>
  import { onLoad, onPageScroll, onShow } from "@dcloudio/uni-app";
  import {ref} from 'vue'
  import courseService from '@/api/course'
  import type {QueryObject,AnyObject} from '@/constrint/types'
  // 页面滚动事件
  onPageScroll((res) => {
    // console.log('页面滚动了');
    // 触发回到顶部组件中的自定义事件
    uni.$emit("pageScroll", res.scrollTop);
  })
  
  
  /* 定义初始化数据 */
  let courseId = ''
  const params = {
    page:1,
    limit:10
  }
  /* --------------- 定义响应式数据 --------------- */
  /* 课程详情 */
  const course = ref<QueryObject>({
    id: ''
  })
  /* 是否购买 */
  const isBuy = ref(false)
  /* 是否收藏 */
  const isCollect = ref(false)
  /* 课程列表 */
  const chapterList = ref<QueryObject[]>([])
  // 评论内容
  const comments = ref<AnyObject>({})
  
  
  /* 生命周期 */
  onLoad(options => {
    //  options! == 非undefined和null
    courseId = options!.courseId
  
    getCourseInfo()
  })

  onShow(()=>{
    getCommentsInfo()
  })
  
  
  /* 获取课程详情的功能函数 */
  async function getCourseInfo(){
    try {
      let result = await courseService.getCourseInfo(courseId)
      if(result.code === 200){
        course.value = result.data.course
        isBuy.value = result.data.isBuy
        isCollect.value = result.data.isCollect
        chapterList.value = result.data.chapterList
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getCommentsInfo() {
    try {
      let result = await courseService.getCommentsInfo({
        ...params,
        courseId
      })
      if(result.code === 200){
        comments.value = result.data
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 点击去学习或者去购买按钮的回调
  function handleGoPayOrGoStudy(){
    if(isBuy.value){
      uni.navigateTo({//去学习
        url:`/pages/course/video/index`
      })
    }else{
      uni.navigateTo({//去购买
        url:`/pages/order/detail/index?courseId=${courseId}`
      })
    }
  }
  
  
  </script>
  
  
  
  <style lang='less' scoped>
  .course {
    background: #f2f3f8;
    padding-bottom: 56px;
    .banner {
      height: 210px;
      width: 100%;
      image {
        width: 100%;
        height: 100%;
      }
    }
  
    .info {
      border-radius: 0 0 12px 12px;
      padding: 16px;
      margin-bottom: 12px;
      .price {
        display: flex;
        justify-content: space-between;
        h3 {
          color: #ff7b37;
          font-size: 20px;
          text {
            font-size: 12px;
          }
        }
        .buy_count {
          font-size: 12px;
          color: #666c80;
        }
      }
  
      .name {
        font-size: 18px;
        margin: 8px;
      }
  
      .tag_list {
        display: flex;
        .tag_item {
          border: 1px solid #666c80;
          color: #666c80;
          display: inline-block;
          padding: 0px 10px;
          font-size: 12px;
          height: 18px;
          border-radius: 16px;
          line-height: 18px;
          margin-right: 8px;
        }
      }
    }
  
    .tab_wrapper {
      border-radius: 0 0 12px 12px;
    }
  
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      color: #3c464f;
      padding: 16px 0;
      .title_left {
        &::before {
          content: "";
          width: 4px;
          height: 12px;
          border-radius: 10px;
          margin-right: 6px;
          background-color: #2979ff;
        }
      }
      .title_right {
        color: #666c80;
        font-size: 12px;
      }
    }
    .course_card {
      display: flex;
      flex-direction: column;
    }
    .card {
      padding: 0 16px;
      background: #fff;
      margin-bottom: 12px;
      flex: 1;
      // min-height: 1000px;
      // height: 100vh;
    }
  
    .intro {
      .teacher_info {
        display: flex;
        align-items: center;
        border-radius: 12px;
        background: #f5f6fa;
        padding: 12px;
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          image {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .teacher_desc {
          flex: 1;
          overflow: hidden;
          margin-left: 10px;
          .teacher_name {
            font-size: 12px;
            color: #3e414d;
          }
          .teacher_intro {
            word-break: break-all;
            font-size: 12px;
            color: #666c80;
            text-align: left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            word-wrap: normal;
          }
        }
      }
      .course_detail {
        padding-bottom: 16px;
      }
    }
  
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
    .catalogue {
      .catalogue_list {
        .task_list {
          .task_items {
            display: flex;
            padding: 12px;
            .task_type {
              width: 16px;
              height: 16px;
            }
  
            .task_title {
              flex: 1;
              font-size: 12px;
              color: #3e414d;
              margin-left: 10px;
              &::after {
                content: "";
                position: absolute;
                bottom: -12px;
                left: 0;
                width: 100%;
                height: 0.07143rem;
                background-color: #c9d0d6;
                transform: scaleY(0.5);
                opacity: 0.5;
              }
            }
  
            .task_icon {
              width: 16px;
              height: 16px;
            }
          }
        }
      }
    }
  }
  .bottom_tabbar {
    // background: #fff;
    background: linear-gradient(
      180deg,
      hsla(0, 0%, 86.7%, 0) 0,
      hsla(0, 0%, 86.7%, 0.2) 0.42857rem,
      hsla(0, 0%, 86.7%, 0.2) 0.57143rem,
      #fff 0.64286rem,
      #fff
    );
    padding: 8px 16px 0 16px;
    position: fixed;
    bottom: 0;
    z-index: 100;
    width: 100%;
    .bottom_wrap {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    .bottom_button {
      flex: 1;
      padding: 6px 0;
      .favo_button {
        display: flex;
        align-items: center;
        flex-direction: column;
        font-size: 12px;
        color: #8797a1;
        .bg {
          width: 24px;
          height: 24px;
          background-image: url("https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/0cfab2184a7ac26a164fdc334d40d382.png");
          background-size: 100% 100%;
          &.active {
            background-image: url("https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/88b416217e2eca5e9e9f1f3fac1e7f24.png");
          }
        }
      }
    }
    .bottom_main {
      flex: 1;
      padding: 6px 0;
      .buy_button {
        width: 90%;
        height: 2.85714rem;
        line-height: 2.85714rem;
        text-align: center;
        color: #fff;
        border: none;
        font-size: 1.14286rem;
        border-radius: 7.14286rem;
        background-color: #ff7a38;
      }
    }
  }
  </style>