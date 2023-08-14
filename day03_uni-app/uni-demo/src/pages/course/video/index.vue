<template>
    <view class="container">
      <view>
        <video
          class="video"
          src="http://video.itdachang.com/fd7adcc363824793a4b90e1969d1a228/013b4f1f19e546c8ad55de6add083d7e-2b79b42de36f8f54452cb0ee29ec9499-fd.mp4"
          poster="https://www.gulixueyuan.com/files/course/2022/11-15/10000666c9a9690562.jpg"
          object-fit="fill"
          controls
          autoplay
          page-gesture
          enable-play-gesture
        ></video>
      </view>
      <view class="catalogue">
        <view class="title"> 课程目录 </view>
        <view class="catalogue_list">
          <uni-collapse ref="collapse">
            <uni-collapse-item title="第一章 小程序基础">
              <view class="task_list">
                <view
                  class="task_items"
                >
                  <image
                    class="task_type"
                    src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/f1c59a1527e075f6ebfba3d7ac605f07.png"
                  />
                  <view class="task_title">第一节 小程序简介</view>
                </view>
              </view>
            </uni-collapse-item>
          </uni-collapse>
        </view>
      </view>
    </view>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style lang="scss" scoped>
  .video {
    width: 100%;
  }
  .catalogue {
    padding: 0 16px;
    background: #fff;
    margin-bottom: 12px;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      color: #3c464f;
      padding: 16px 0;
      .title_left {
        &::before {
          content: '';
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
              content: '';
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
  </style>