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



// -------------------------------地址相关----------------------------

// 获取用户地址列表
export const findUserAddress = () => {
    return request({
        url:`/mall-api/userAddress/findUserAddress`
    })
}

// 新增地址
export const saveUserAddress = (params) => {
    return request({
        url:`/mall-api/userAddress/save`,
        method:'POST',
        data:params
    })
}

// 删除地址
export const deleteUserAddress = (id) => {
    return request({
        url:`/mall-api/userAddress/delete/${id}`
    })
}

// 根据addressId获取对应的地址详情
export const findAddressInfo = (id) => {
    return request({
        url:`/mall-api/userAddress/${id}`
    })
}

// 修改地址信息
export const updateAddressInfo = (params) => {
    return request({
        url:`/mall-api/userAddress/update`,
        method:'POST',
        data:params
    })
}


// 获取订单地址
export const findOrderAddress = () => {
    return request({
        url:`/mall-api/userAddress/getOrderAddress`
    })
}


// ------------------------------订单相关----------------------------------


// 获取订单详情 --- 立即购买
export const orderBuy = (params) => {
    return request({
        url:`/mall-api/order/buy/${params.goodsId}`,
        data:params
    })
}


// 获取订单详情 --- 购物车去结算
export const orderTrade = () => {
    return request({
        url:`/mall-api/order/trade`
    })
}


// 提交订单
export const submitOrder = (params) => {
    return request({
        url:`/mall-api/order/submitOrder`,
        method:'POST',
        data:params
    })
}


// 微信下单支付
export const createJsapi = (orderNo) => {
    return request({
        url:`/mall-api/webChat/createJsapi/${orderNo}`
    })
}

// 订单支付状态查询
export const queryPayStatus = (orderNo) => {
    return request({
        url:`/mall-api/webChat/queryPayStatus/${orderNo}`
    })
}

// 获取订单列表
export const orderList = (params) => {
    return request({
        url:`/mall-api/order/order/${params.page}/${params.limit}`
    })
}