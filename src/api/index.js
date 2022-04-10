//api写在这里 可以根据需要穿件文件夹
import requests from "@/utils/requests";

/**
 *
 * @param data
 * {
 *     email: string 邮箱
 *     password: string 密码
 *     name: string 姓名
 *     type: Number 老师还是学生
 * }
 * @returns {AxiosPromise}
 * {
 *      "code": 100,
 *      "msg": "成功",
 *      "data": 10507
 * }
 */
export const signUp = (data) => {

    return requests({
            url: '/account/signup',
            method: 'post',
            data: data
        })
        // return new Promise((resolve, reject) => {
        //     resolve({
        //         code: 100,
        //         msg: '成功',
        //         data: 10507
        //     })
        // })
}

/**
 * 登录
 * @param postData
 * {
 *     id: Number 用户账号，在前段要做校验，为数字
 *     password: String 用户密码
 * }
 * @returns {AxiosPromise}
 * {
 *      "code": 100,
 *      "msg": "成功",
 *      "data": null
 * }
 */
export const login = (postData) => {
        let ret = requests({ url: '/account/login', method: 'post', data: postData })
        return ret
            // return new Promise(function (resolve, reject) {
            //     resolve({
            //         code: 100,
            //         msg: "成功",
            //         data: null
            //     })
            // })
    }
    /**
     * 获取用户状态（是否登录）
     * @returns {AxiosPromise}
     * {
     *      "code": 100,
     *      "msg": "成功",
     *      "data": null
     * }
     */
export const checkState = () => {
        return requests({ url: '/account/checkState', method: 'get' }).then(res => {
                return res
            })
            // return new Promise(function (resolve, reject) {
            //     resolve({
            //         code: 100,
            //         msg: "成功",
            //         data: null
            //     })
            // })
    }
    /**
     * 获得基本信息
     * @param postData
     * @returns {AxiosPromise}
     * {
     *      "code": 100,
     *      "msg": "成功",
     *      "data": {
     *          "name": "student",
     *          "id": 1950000,
     *          "type": 1,
     *      }
     * }
     */
export const getBasicInfo = (postData) => {
    return requests({ url: '/account/getAllInfo', method: 'get', data: postData }).then(res => {
        return {
            code: 100,
            msg: "成功",
            data: {
                name: res.data.userInfo.name,
                id: res.data.userInfo.id,
                type: res.data.userInfo.type
            }
        }
    })
}
export const searchCourse1 = (courseId) => {
    return new Promise(function(resolve, reject) {
        resolve({
            code: 100,
            data: [{
                    courseId: 1,
                    name: '数学',
                    password: '123456',
                    teacherId: '12345',
                    teacherName: '谢思程',
                    url: 'www.abc.com',
                    courseTime: '周一一二,周三一二'
                },
                {
                    courseId: 2,
                    name: '语文',
                    password: '988776',
                    teacherId: '345265',
                    teacherName: '金伟祖',
                    url: 'www.bnnmm.com',
                    courseTime: '周五五六'
                },
            ]
        })
    })
}
export const searchCourse2 = (courseName) => {
    return new Promise(function(resolve, reject) {
        resolve({
            code: 100,
            data: [{
                    courseId: 1,
                    name: '数学',
                    password: '123456',
                    teacherId: '12345',
                    teacherName: '谢思程',
                    url: 'www.abc.com',
                    courseTime: '周一一二,周三一二'
                },
                {
                    courseId: 2,
                    name: '语文',
                    password: '988776',
                    teacherId: '345265',
                    teacherName: '金伟祖',
                    url: 'www.bnnmm.com',
                    courseTime: '周五五六'
                },
            ]
        })
    })
}
export const searchCourse3 = (teacherName) => {
    return new Promise(function(resolve, reject) {
        resolve({
            code: 100,
            data: [{
                    courseId: 1,
                    name: '数学',
                    password: '123456',
                    teacherId: '12345',
                    teacherName: '谢思程',
                    url: 'www.abc.com',
                    courseTime: '周一一二,周三一二'
                },
                {
                    courseId: 2,
                    name: '语文',
                    password: '988776',
                    teacherId: '345265',
                    teacherName: '金伟祖',
                    url: 'www.bnnmm.com',
                    courseTime: '周五五六'
                },
            ]
        })
    })
}
export const setSession = (data) => {
    return requests({ url: '/exam/setSession', method: 'post', data: data })
}
export const getExamQuestion = () => {
    return requests({ url: '/exam/takeExam/getExamQuestion', method: 'get' })
}
export const postAnswer = (data) => {
    return requests({ url: '/exam/takeExam/studentPostAnswer', method: 'post', data: data })
}
export const deleteSession = (data) => {
        return requests({ url: '/exam/takeExam/deleteSession', method: 'delete' })
    }
    //获取课程的考试
export const getExams = (courseId) => {
    return requests({ url: "/exam/courseGetExam/" + courseId, method: 'get' })
}
export const quit = () => {
        return requests({ url: '/account/quitAccount', method: 'delete' })
    }
    //获取考试所有学生的成绩
export const getAllStudents = (courseId, examId) => {
        return requests({ url: '/score/getGrade' + courseId + "/" + examId, method: 'get' })
    }
    //获取老师需要批改的所有题目
export const getCorrectedQuestion = (data) => {
        return requests({ url: '/question/getStu', method: 'post', data: data })
    }
    //老师批改完提交
export const manualCorrect = (data) => {
        return requests({ url: '/score/manualCorrect', method: 'post', data: data })
    }
    //老师添加题目
export const addQuestions = (postData) => {
    return requests({ url: '/question/update', method: 'post', data: postData })
}

export const getMessage = (data) => {
    return requests({ url: "/exam/courseGetExam/" + courseId, method: 'get' })
}

export const getImage = () => {
        return requests({ url: '/account/getImage', method: 'get' })
    }
    //获得未批改的题目
export const getUnmarkedQuestion = (data) => {
        return requests({ url: '/question/getUnmarkedQuestion', method: 'get', params: data })
    }
    //老师发布考试
export const postExam = (data) => {
    return requests({ url: '/exam/releasetest', method: 'post', data: data })
}

export const courseGetExam = (courseId) => {
    return requests({ url: "/exam/courseGetExam/" + courseId, method: "get" })
}

//自动批改
export const autoCorrect = (data) => {
    return requests({ url: "/score/autoCorrect", method: "post", data: data })
}


//获取考生所有考试成绩
export const getStuCourseExamScore = (courseId) => {
    return requests({ url: "/score/getStuScore/" + courseId, method: "get" })
}


//通过课程id获得所有学生的信息
export const getStudentListByCourseId = (courseId) => {
    return new Promise(function(resolve, reject) {
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
    return new Promise(function(resolve, reject) {
        resolve({ code: 100 });
    })
}

//通过学生id和课程id获得学生的所有作业
export const getStudentHomeworkByIdAndCourseId = (id, courseId) => {
    return new Promise(function(resolve, reject) {
        resolve({
            code: 100,
            data: [{
                id: 1,
                title: "第一次作业",
                score: 1
            }]
        });
    })
}

//学生提交图片作业的接口
export const questionImageUpload = (name) => {
        console.log(name)
    }
    //在学生提交图片作业的时候，通过图片的名字删除图片
export const deleteImageByName = (name) => {
    console.log(name)
}

export const getHisInfo = (UserId) => {
    return new Promise(function(resolve, reject) {
        resolve({
            code: 100,
            data: [{
                id: 1953694,
                name: '张纪鹏',
                email: '914856774@qq.com',
                school: '同济大学',
                sex: '男',
                tel: '186****4795',
                avater: 'https://picsum.photos/250/250/?image=59'
            }]
        })
    })
}

export const getCommentsByAssignmentId = (AssignmentId) => {
    return new Promise(function(resolve, reject) {
        resolve({
            code: 100,
            data: [{
                comments: [{
                        userId: 1950000,
                        userName: "student",
                        userAvater: 'https://picsum.photos/250/250/?image=59',
                        commentId: 1,
                        supported: false,
                        content: "第一条评论",
                        supportNum: 1,
                        myComment: '',
                        children: [{
                                userId: 1950002,
                                userName: "张纪鹏",
                                userAvater: 'https://picsum.photos/250/250/?image=59',
                                commentId: 3,
                                supportNum: 123,
                                supported: false,
                                content: "回复第一条评论",
                            },
                            {
                                userId: 1950003,
                                userName: "谢思程",
                                userAvater: 'https://picsum.photos/250/250/?image=59',
                                commentId: 4,
                                supportNum: 123,
                                supported: false,
                                content: "回复第一条评论",
                            },
                        ],
                    },
                    {
                        userId: 1950001,
                        userName: "student2",
                        userAvater: 'https://picsum.photos/250/250/?image=59',
                        commentId: 2,
                        supportNum: 123,
                        supported: false,
                        content: "第二条评论",
                        myComment: '',
                        children: [{
                                userId: 1950004,
                                userName: "蒙俊杰",
                                userAvater: 'https://picsum.photos/250/250/?image=59',
                                commentId: 5,
                                supportNum: 123,
                                supported: false,
                                content: "回复第一条评论",
                            },
                            {
                                userId: 1950005,
                                userName: "柳淯之",
                                userAvater: 'https://picsum.photos/250/250/?image=59',
                                commentId: 6,
                                supportNum: 123,
                                supported: false,
                                content: "回复第一条评论",
                            },
                        ],
                    },
                ]
            }]
        })
    })
}

export const submitComment = (userId, targetCommentId, content) => {
    return new Promise(function(resolve, reject) {
        console.log({
            userId: userId,
            targetCommentId: targetCommentId,
            content: content
        });
        resolve({
            code: 100,
        })
    })
}

export const updateInfo = (updateInfo) => {
    return new Promise(function(resolve, reject) {
        console.log({
            id: updateInfo.id,
            name: updateInfo.name,
            email: updateInfo.email,
            school: updateInfo.school,
            sex: updateInfo.sex,
            tel: updateInfo.tel,
        });
        resolve({
            code: 100,
        })
    })
}


export const updateAvater = (id, avater) => {
    return new Promise(function(resolve, reject) {
        console.log({
            id: id,
            avater: avater
        });
        resolve({
            code: 100,
        })
    })
}
export const addLike = (id, targetId) => {
    return new Promise(function(resolve, reject) {
        console.log({
            id: id,
            targetId: targetId
        });
        resolve({
            code: 100,
        })
    })
}