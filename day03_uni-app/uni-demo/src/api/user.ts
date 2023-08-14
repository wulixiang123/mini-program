// 用户数据相关 派生类
import Service from "@/utils/request";
class UserService extends Service{
    // 登陆获取token
    login(code:string){
        return this.get({
            url:`/api/ucenter/webChat/callback`,
            data:{
                code
            }
        })
    }
    // 根据token获取用户信息
    getUserInfo(){
        return this.get({
            url:`/api/ucenter/member/auth/getLoginInfo`
        })
    }
}

export default new UserService()