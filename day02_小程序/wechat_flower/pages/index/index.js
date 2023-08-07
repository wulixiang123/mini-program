// index.js
// 在微信小程序中，Page 是一个函数，它用于注册小程序中的一个页面。

const { findBanner, findCategory1 } = require("../../utils/api")

//Page 函数接受一个 Object 类型的参数，该参数指定页面的初始数据、生命周期回调、事件处理函数等
Page({
    data:{
        bannerList:[],
        navList:[]
    },
    // 在微信小程序中，onLoad 是一个页面生命周期函数，
    //它表示页面加载时触发。当页面初始化时，onLoad 函数会被调用，
    //此时可以在 onLoad 函数中对页面状态数据进行初始化
    onLoad(options){
        // wx.request({//不可以在生命周期中发起请求 因为请求中有异步,生命周期不支持异步
        //     url: 'https://gmall-prod.atguigu.cn/mall-api/index/findBanner',
        //     data: {},
        //     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        //     // header: {}, // 设置请求的 header
        //     success: function(res){//成功的回调
        //         console.log(res);
        //     },
        //     fail: function(e) {//失败的回调
        //         console.log(e);
        //     },
        //     complete: function() {//无论成功与失败都会执行的回调
        //         // complete
        //     }
        // })

        this.getBanners()
        this.getNavList()
    },
    async getBanners(){
        try {
            let result = await findBanner()
            if(result.code === 200){
                this.setData({
                    bannerList:result.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    async getNavList (){
        try {
            let {data} = await findCategory1()
            console.log(data);
            this.setData({
                navList:data
            })
        } catch (error) {
            console.log(error);
        }
    }
})
