// 定义类型

// 请求方式的类型
export type MethodType = "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined

// 任意字段任意个数的类型对象
export type AnyObject = {
    [propsName:string]:any
}

// 包含id的对象
export type QueryObject = {
    id:string | number,
    [propsName:string]:any
}