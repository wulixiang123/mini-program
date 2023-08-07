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

export const findListGoods = () => {
    return request({
        url:'/mall-api/index/findListGoods'
    })
}