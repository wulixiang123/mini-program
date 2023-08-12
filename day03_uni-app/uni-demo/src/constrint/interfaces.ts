import type { MethodType,AnyObject } from "@/utils/types";

export interface RequestOptions{
    url:string,
    data?:AnyObject,
    method?:MethodType
}
