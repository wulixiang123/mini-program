// 封装请求的 基类(父类) 派生类(子类)

import type { RequestOptions } from "@/constrint/interfaces";

const BASEURL = 'https://gmall-prod.atguigu.cn/skb'
class Service {
    // private(私有属性， 只能在当前类对象中使用) protected(只能在当前类和其子类对象中使用)
    private api(options: RequestOptions): any{
        return new Promise((resolve,reject)=>{
            type HeaderType = {
              'Content-type': string,
              token?: string
            }
            const header:HeaderType = {
              'Content-type': 'application/json'
            }
            let token = uni.getStorageSync('gulitoken')
            token && (header.token = token)
            uni.request({
                url:BASEURL + options.url,
                data:options.data,
                method:options.method,
                header,
                success:(res)=>{
                // res包括响应头,cookie等信息，需要过滤到，只保留data
                resolve(res.data)
                },
                fail:(e)=>{
                reject(e)
                }
            })
        })
    }
    get(params:RequestOptions){
        params.method = 'GET'
        return this.api(params)
    }
    post(params:RequestOptions){
        params.method = 'POST'
        return this.api(params)
    }
    put(params:RequestOptions){
        params.method = 'PUT'
        return this.api(params)
    }
    delete(params:RequestOptions){
        params.method = 'DELETE'
        return this.api(params)
    }
}

export default Service