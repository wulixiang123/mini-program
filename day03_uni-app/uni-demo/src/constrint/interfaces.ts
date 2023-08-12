import type { MethodType,AnyObject } from "@/constrint/types";

// 请求参数的接口
export interface RequestOptions{
    url:string,
    data?:AnyObject,
    method?:MethodType
}