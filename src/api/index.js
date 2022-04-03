//api写在这里 可以根据需要穿件文件夹
import requests from "@/utils/requests";

export const signUp = (data) => {

    return requests({
        url: '/account/signup',
        method: 'post',
        data: data
    })
}

export const login = (postData) => {
    let ret = requests({url: '/account/login', method: 'post', data: postData})

    return ret
}
export const checkState = () => {
    return requests({url: '/account/checkState', method: 'get'})
}
export const getAllInfo = (postData) => {
    return requests({url: '/account/getAllInfo', method: 'get', data: postData})
}
export const searchCourse1 = (data) => {
    return requests({url: '/course/getCourseById', method: 'get', params: data})
}
export const searchCourse2 = (data) => {
    return requests({url: '/course/getCourseByTitle', method: 'get', params: data});
}
export const searchCourse3 = (data) => {
    return requests({url: '/course/getCourseByTName', method: 'get', params: data})
}
export const setSession = (data) => {
    return requests({url: '/exam/setSession', method: 'post', data: data})
}
export const getExamQuestion = () => {
    return requests({url: '/exam/takeExam/getExamQuestion', method: 'get'})
}
export const postAnswer = (data) => {
    return requests({url: '/exam/takeExam/studentPostAnswer', method: 'post', data: data})
}
export const deleteSession = (data) => {
    return requests({url: '/exam/takeExam/deleteSession', method: 'delete'})
}
//获取课程的考试
export const getExams = (courseId) => {
    return requests({url: "/exam/courseGetExam/" + courseId, method: 'get'})
}
export const quit = () => {
    return requests({url: '/account/quitAccount', method: 'delete'})
}
//获取考试所有学生的成绩
export const getAllStudents = (courseId, examId) => {
    return requests({url: '/score/getGrade' + courseId + "/" + examId, method: 'get'})
}
//获取老师需要批改的所有题目
export const getCorrectedQuestion = (data) => {
    return requests({url: '/question/getStu', method: 'post', data: data})
}
//老师批改完提交
export const manualCorrect = (data) => {
    return requests({url: '/score/manualCorrect', method: 'post', data: data})
}
//老师添加题目
export const addQuestions = (postData) => {
    return requests({url: '/question/update', method: 'post', data: postData})
}

export const getMessage = (data) => {
    return requests({url: "/exam/courseGetExam/" + courseId, method: 'get'})
}

export const getImage = () => {
    return requests({url: '/account/getImage', method: 'get'})
}
//获得未批改的题目
export const getUnmarkedQuestion = (data) => {
    return requests({url: '/question/getUnmarkedQuestion', method: 'get', params: data})
}
//老师发布考试
export const postExam = (data) => {
    return requests({url: '/exam/releasetest', method: 'post', data: data})
}

export const courseGetExam = (courseId) => {
    return requests({url: "/exam/courseGetExam/" + courseId, method: "get"})
}

//自动批改
export const autoCorrect = (data) => {
    return requests({url: "/score/autoCorrect", method: "post", data: data})
}


//获取考生所有考试成绩
export const getStuCourseExamScore = (courseId) => {
    return requests({url: "/score/getStuScore/" + courseId, method: "get"})
}


//通过课程id获得所有学生的信息
export const getStudentListByCourseId = (courseId) => {
    return new Promise(function (resolve, reject) {
        resolve({
            code: 100,
            data: [{
                id: 1950000,
                name: "张三",
                //头像url之类的
            },
                {
                    id: 1950001,
                    name: "李四"
                }
            ]
        })
    })
}

//通过课程id和学生id踢出学生
export const kickStudentByIdAndCourseId = (id, courseId) => {
    return new Promise(function (resolve, reject) {
        resolve({code: 100});
    })
}

//通过学生id和课程id获得学生的所有作业
export const getStudentHomeworkByIdAndCourseId = (id, courseId) => {
    return new Promise(function (resolve, reject) {
        resolve({
            code: 100, data: [
                {
                    id: 1,
                    title: "第一次作业",
                    score: 1
                }
            ]
        });
    })
}
