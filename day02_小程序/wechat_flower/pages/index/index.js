// index.js
Page({
    onLoad(options){
        wx.request({
            url: 'https://gmall-prod.atguigu.cn/mall-api/index/findBanner',
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res){
                console.log(res);
            },
            fail: function(e) {
                console.log(e);
            },
            complete: function() {
                // complete
            }
        })
    }
})
