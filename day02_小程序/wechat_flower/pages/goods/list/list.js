import { findGoodsList } from "../../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [], // 商品列表数据
    page: 1, // 分页的页数
    limit: 10, // 每页商品个数
    moreStatus: 'more', // more(后边有数据) noMore(后边没有数据了) loading(正在加载) error(请求失败情况)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getGoodsList();
  },

  /* 获取商品列表的功能函数 */
  async getGoodsList() {
    try {
      let { page, limit, goodsList, moreStatus } = this.data;
      // 修改moreStatus状态为loading
      this.setData({
        moreStatus: 'loading'
      })
      let result = await findGoodsList({ page, limit });
      if (result.code === 200) {
        let items = result.data.records;
        if (items.length > 0) {
          if (items.length < limit) {
            // 后边肯定没有数据了
            this.setData({
              moreStatus: 'noMore'
            })
          } else {
            // 后边可能有数据
            this.setData({
              moreStatus: 'more'
            })
          }

          goodsList.push(...items);
          this.setData({
            goodsList,
            page: ++page
          })

        } else {
          // 后边肯定没有数据了
          this.setData({
            moreStatus: 'noMore'
          })
        }
      }
    } catch (error) {
      console.log(error);
      this.setData({
        moreStatus: 'error'
      })
    }
  },

  /* 上拉触底事件回调 */
  onReachBottom() {
    this.data.moreStatus === 'more' && this.getGoodsList();
  }
})