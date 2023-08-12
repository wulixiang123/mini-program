// 封装请求的 基类(父类) 派生类(子类)

import type { RequestOptions } from "@/constrint/interfaces";

const BASEURL = 'https://gmall-prod.atguigu.cn/skb'
class Service {
    api(options:RequestOptions){
        return new Promise((resolve,reject)=>{
            uni.request({
                url:BASEURL + options.url,
                data:options.data,
                method:options.method,
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
}