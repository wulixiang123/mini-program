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



// 获取商品详情信息
export const findGoodsDetail = (goodsId) => {
    return request({
        url:`/mall-api/goods/${goodsId}`
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






// ----------------------购物车-------------------------


// 获取购物车列表数据
export const findCartList = () => {
    return request({
        url:`/mall-api/cart/getCartList`
    })
}

// 修改商品的选中状态
// export const checkCart = (params) => {
export const checkCart = ({goodsId,isChecked}) => {
    return request({
        url:`/mall-api/cart/checkCart/${goodsId}/${isChecked}`
    })
}

// 修改商品数量 || 添加商品至购物车 && 如果是修改商品数量，coutn = 新count - 旧count
export const addToCart = (params) => {//当有多个参数的时候 可以把形参设置为单个参数
    return request({
        url:`/mall-api/cart/addToCart/${params.goodsId}/${params.count}`,
        data:params
    })
}

// 删除指定的商品
export const depShop = (goodsId) => {
    return request({
        url:`/mall-api/cart/delete/${goodsId}`
    })
}

// 修改全部商品的选中状态
export const checkAllCart = (isChecked) => {
    return request({
        url:`/mall-api/cart/checkAllCart/${isChecked}`
    })
}