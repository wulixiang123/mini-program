// 课程相关的派生类
import Service from '@/utils/request'
import type{CommentsInterface, PageAndLimit, SubmitCommentInterface} from '@/constrint/interfaces'

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

    // 获取评论内容
    getCommentsInfo(params:CommentsInterface){
        return this.get({
            url:`/api/edu/comment/${params.page}/${params.limit}`,
            data:params
        })
    }

    // 提交评论
    submitComment(params:SubmitCommentInterface){
        return this.post({
            url:`/api/edu/comment/auth/save`,
            data:params
        })
    }
}
export default new CourseService()