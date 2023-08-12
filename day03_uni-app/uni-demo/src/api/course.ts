// 课程相关的派生类
import Service from '@/utils/request'

class CourseService extends Service{
    getHomeData(){
        return this.get({
            url:`/api/edu/index`
        })
    }
}
export default new CourseService()