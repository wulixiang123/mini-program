// 课程相关的派生类
import Service from '@/utils/request'
import type{PageAndLimit} from '@/constrint/interfaces'

class CourseService extends Service{
    getHomeData(){
        return this.get({
            url:`/api/edu/index`
        })
    }

    getCourseList(params:PageAndLimit){
        return this.get({
            url:`/api/edu/course/${params.page}/${params.limit}`
        })
    }
}
export default new CourseService()