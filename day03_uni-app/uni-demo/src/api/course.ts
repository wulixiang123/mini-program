// 课程相关的派生类
import Service from '@/utils/request'
import type{PageAndLimit} from '@/constrint/interfaces'

class CourseService extends Service{
    // 获取主页的数据
    getHomeData(){
        return this.get({
            url:`/api/edu/index`
        })
    }
    // 获取课程列表分页数据
    getCourseList(params:PageAndLimit){
        return this.get({
            url:`/api/edu/course/${params.page}/${params.limit}`
        })
    }
    // 获取课程详情
    getCourseInfo(courseId:string|number){
        return this.get({
            url:`/api/edu/course/${courseId}`
        })
    }
}
export default new CourseService()