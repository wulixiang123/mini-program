import type { MethodType,AnyObject } from "@/constrint/types";

// 请求参数的接口
export interface RequestOptions{
    url:string,
    data?:AnyObject,
    method?:MethodType
}

// 做分页数据参数接口
export interface PageAndLimit{
    page:number,
    limit:number
}