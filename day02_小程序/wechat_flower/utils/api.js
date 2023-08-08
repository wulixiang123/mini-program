import request from "./request";
// 获取轮播图数据
export const findBanner = () => {
    return request({
        url:'/mall-api/index/findBanner'
    })
}

// 获取主页导航列表数据
export const findCategory1 = () => {
    return request({
        url:'/mall-api/index/findCategory1'
    })
}

// 获取猜你喜欢商品列表
export const findListGoods = () => {
    return request({
        url:'/mall-api/index/findListGoods'
    })
}

// 获取主页人气推荐数据
export const findRecommendGoods = () => {
    return request({
        url:'/mall-api/index/findRecommendGoods'
    })
}

// 获取商品分页列表数据
export const findGoodsList = (params) => {
    return request({
        url:`/mall-api/goods/list/${params.page}/${params.limit}`,
        data:params
    })
}

// 获取分类页数据
export const findCategoryTree = () => {
    return request({
        url: `/mall-api/index/findCategoryTree`
    })
}

// --------------------------用户信息相关----------------------------

// 获取用户token信息
export const wxLogin = (code) => {
    return request({
        url: `/mall-api/weixin/wxLogin/${code}`
    })
}


// 根据token获取用户信息
export const getuserInfo = () => {
    return request({
        url:`/mall-api/weixin/getuserInfo`
    })
}


// 更新用户个人信息
export const updateUser = (params) => {
    return request({
        url:`/mall-api/weixin/updateUser`,
        method:'POST',
        data:params
    })
}