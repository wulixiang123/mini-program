// 订单相关的派生类
import Service from "@/utils/request";
class OrderService extends Service{
    // 获取订单id
    saveOrder(courseId:string){
        return this.post({
            url:`/api/order/auth/save/${courseId}`
        })
    }
    // 获取订单信息
    getOrderInfo(orderId:string){
        return this.get({
            url:`/api/order/auth/get/${orderId}`
        })
    }
    // 获取支付参数
    getPayParams(orderNo:string){
        return this.get({
            url:`/api/order/webChat/createJsapi/${orderNo}`
        })
    }
}
export default new OrderService()