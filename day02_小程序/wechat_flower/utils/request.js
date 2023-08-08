const BASEURL = 'https://gmall-prod.atguigu.cn'
export default(params)=>{
    return new Promise((resolve,reject)=>{
        wx.showLoading({
            title:'正在加载'
        })

        const header = {
            "Content-type":'application/json'
        }
        let token = wx.getStorageSync('mushang_token')
        token && (header.token = token)
        wx.request({
            url: BASEURL + params.url,
            data: params.data || {},
            method: params.method || 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header,
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