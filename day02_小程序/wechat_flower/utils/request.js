const BASEURL = 'https://gmall-prod.atguigu.cn'
export default(params)=>{
    return new Promise((resolve,reject)=>{
        wx.showLoading({
            title:'正在加载'
        })
        wx.request({
            url: BASEURL + params.url,
            data: params.data || {},
            method: params.method || 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res){
                resolve(res.data)
            },
            fail: function(e) {
                reject(e)
            },
            complete: function() {
                wx.hideLoading();//关闭加载
            }
        })
    })
}