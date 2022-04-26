//api写在这里 可以根据需要穿件文件夹
import requests from "@/utils/requests";

/**
 * 获得图片id对应的url
 * @param id
 */
export const getImageUrl = (id) => {
    return new Promise((resolve, reject) => {
        resolve({
            code: 100,
            msg: '成功',
            data: "http://dannyxsc.xyz/img/image-20220225222647576.png"
        })
    })
}
/**
 * 通过id删除图片
 * @param id
 * @returns {Promise<unknown>}
 */
export const removeImage = (id) => {
    return new Promise((resolve, reject) => {
        resolve({
            code: 100,
            msg: '成功',
            data: null
        })
    })
}
/**
 * @description: 上传图片的接口url
 * @type {string}
 * @returns {AxiosPromise}
 * {
 *     code:100,
 *     msg:'成功',
 *     data:{
 *         id:5
 *     }
 * }
 */
export const imagePostURL = "/api/testUploadImage"


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
    let ret = requests({url: '/account/login', method: 'post', data: postData})
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
    return requests({url: '/account/checkState', method: 'get'}).then(res => {
        return res
    })
    // return new Promise(function (resolve, reject) {
    //     resolve({
    //         code: 101,
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
    return requests({url: '/account/getAllInfo', method: 'get', data: postData})
    //     .then(res => {
    //     return {
    //         code: 100,
    //         msg: "成功",
    //         data: {
    //             name: "danny",
    //             id: 10500,
    //             type: 0
    //         }
    //     }
    // })
}

export const searchCourse1 = (courseId) => {
    let result = []
    requests({
        url: '/course/SearchCourse',
        params: {courseId: courseId, name: '', teacherName: ''},
        method: 'post'
    }).then(res => {
        console.log(res)
        for (let i = 0; i < res.data.length; i++) {
            let exist = false
            if (res.data[i].exist === 1) {
                exist = true
            }
            result.push({
                courseId: res.data[i].id,
                name: res.data[i].name,
                password: res.data[i].password,
                teacherId: res.data[i].teacherId,
                teacherName: res.data[i].teacherName,
                url: res.data[i].url,
                courseTime: res.data[i].courseTime,
                exist: exist
            })
        }
    })
    return new Promise(function (resolve, reject) {
        resolve({
            code: 100,
            data: result
        })
    })
}
export const searchCourse2 = (courseName) => {
    let result = []
    requests({
        url: '/course/SearchCourse',
        params: {courseId: '', name: courseName, teacherName: ''},
        method: 'post'
    }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
            result.push({
                courseId: res.data[i].id,
                name: res.data[i].name,
                password: res.data[i].password,
                teacherId: res.data[i].teacherId,
                teacherName: res.data[i].teacherName,
                url: res.data[i].url,
                courseTime: res.data[i].courseTime
            })
        }
    })
    return new Promise(function (resolve, reject) {
        resolve({
            code: 100,
            data: result
        })
    })
}
export const searchCourse3 = (teacherName) => {
    let result = []
    requests({
        url: '/course/SearchCourse',
        params: {courseId: '', name: '', teacherName: teacherName},
        method: 'post'
    }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
            result.push({
                courseId: res.data[i].id,
                name: res.data[i].name,
                password: res.data[i].password,
                teacherId: res.data[i].teacherId,
                teacherName: res.data[i].teacherName,
                url: res.data[i].url,
                courseTime: res.data[i].courseTime
            })
        }
    })
    return new Promise(function (resolve, reject) {
        resolve({
            code: 100,
            data: result
        })
    })
}
/**
 * 通过作业id获得所有学生的成绩
 * @param homeworkId
 * @returns {AxiosPromise}
 * {
 *     "code": 100,
 *     "msg": "成功",
 *     "data": [
 *         {
 *             "studentId": 1950000,
 *             "name": "student",
 *             "score": 11
 *         }
 *     ]
 * }
 */
export const getAllStudents = (homeworkId) => {
    // return requests({url: '/score/getGrade' + courseId + "/" + examId, method: 'get'})
    return new Promise(function (resolve, reject) {
        resolve({
            code: 100,
            msg: "成功",
            data: [{
                studentId: 1950000,
                name: "student",
                score: 11
            }]
        })
    })
}
/**
 * 通过作业id和学生id获得学生的题目情况（已经做完，有反馈）
 * @param studentId 学生id
 *        homeworkId 作业id
 * @returns {AxiosPromise}
 */
export const getFeedback = (studentId, homeworkId) => {
    return new Promise((resolve, reject) => {
        resolve({
            code: 100,
            msg: "成功",
            data: [{
                type: 0,
                questionId: 1,
                numInPaper: 1,
                description: "第一题xxxx 1_321",
                options: [{
                    optionId: 1,
                    description: "答案1",
                },
                    {
                        optionId: 2,
                        description: "答案2",
                    },
                    {
                        optionId: 3,
                        description: "答案3",
                    },
                    {
                        optionId: 4,
                        description: "答案4",
                    }
                ],
                studentAnswer: [1],
                standardAnswer: [2],
                textComment: "加油1",
                pictureComment: ["http://dannyxsc.xyz/img/image-20220225233444664.png"],
            },
                {
                    type: 1,
                    questionId: 2,
                    numInPaper: 2,
                    description: "第一题xxxx 1_321",
                    options: [{
                        optionId: 1,
                        description: "答案1",
                    },
                        {
                            optionId: 2,
                            description: "答案2",
                        },
                        {
                            optionId: 3,
                            description: "答案3",
                        },
                        {
                            optionId: 4,
                            description: "答案4",
                        }
                    ],
                    studentAnswer: [2, 1],
                    standardAnswer: [0, 1, 2, 3],
                    textComment: "加油2",
                    pictureComment: ["http://dannyxsc.xyz/img/image-20220225233444664.png"],
                },
                {
                    type: 2,
                    questionId: 3,
                    numInPaper: 3,
                    description: "第一题xxxx 1_321",
                    studentAnswer: "321321_{qwer}",
                    standardAnswer: "我爱你中国",
                    textComment: "加油3",
                    pictureComment: ["http://dannyxsc.xyz/img/image-20220225233444664.png"],
                },
                {
                    type: 3,
                    questionId: 4,
                    numInPaper: 4,
                    description: "第一题xxxx 1_321",
                    pictureDescriptions: ["https://picsum.photos/1024/400/?image=41"],
                    studentAnswer: "33333",
                    // studentPictureAnswers: ["https://picsum.photos/1024/400/?image=41"],
                    standardAnswer: "我爱你中国222",
                    standardPictureAnswers: [
                        "http://dannyxsc.xyz/img/%E6%88%AA%E5%B1%8F2022-02-25%20%E4%B8%8A%E5%8D%8811.18.30.png",
                        "http://dannyxsc.xyz/img/image-20220225222647576.png"
                    ],
                    textComment: "加油4",
                    pictureComment: ["http://dannyxsc.xyz/img/image-20220225233444664.png"],
                }
            ]
        })
    })
}
/**
 * 通过作业id和学生id获得学生的题目（未做完，正在做）
 * @param studentId 学生id
 *        homeworkId 作业id
 * @returns {AxiosPromise}
 */
export const getQuestions = (studentId, homeworkId) => {
    return new Promise((resolve, reject) => {
        resolve({
            code: 100,
            msg: "成功",
            data: [{
                type: 0,
                questionId: 1,
                numInPaper: 1,
                description: "第一题xxxx 1_321",
                options: [{
                    optionId: 1,
                    description: "答案1",
                },
                    {
                        optionId: 2,
                        description: "答案2",
                    },
                    {
                        optionId: 3,
                        description: "答案3",
                    },
                    {
                        optionId: 4,
                        description: "答案4",
                    }
                ],
                studentAnswer: []
            },
                {
                    type: 1,
                    questionId: 2,
                    numInPaper: 2,
                    description: "第一题xxxx 1_321",
                    options: [{
                        optionId: 1,
                        description: "答案1",
                    },
                        {
                            optionId: 2,
                            description: "答案2",
                        },
                        {
                            optionId: 3,
                            description: "答案3",
                        },
                        {
                            optionId: 4,
                            description: "答案4",
                        }
                    ],
                    studentAnswer: []
                },
                {
                    type: 2,
                    questionId: 3,
                    numInPaper: 3,
                    description: "第一题xxxx 1_321",
                    studentAnswer: ""
                },
                {
                    type: 3,
                    questionId: 4,
                    numInPaper: 4,
                    description: "第一题xxxx 1_321",
                    pictureDescriptions: ["https://picsum.photos/1024/400/?image=41"],
                    studentAnswer: "",
                    studentPictureAnswers: ["https://picsum.photos/1024/400/?image=41"]
                }
            ]
        })
    })
}

/**
 * 获得老师的所有题目
 */
export const getQuestionsOfTeacher = () => {
    return new Promise((resolve, reject) => {
        resolve({
            code: 100,
            msg: "成功",
            data: [
                {
                    type: 0,
                    id: 1,
                    numInPaper: 1,
                    questionScore: 4,
                    createdAt: '2011-10-31',
                    description: "第一题xxxx 1_321",
                    options: [
                        {
                            optionId: 1,
                            description: "答案1",
                        },
                        {
                            optionId: 2,
                            description: "答案2",
                        },
                        {
                            optionId: 3,
                            description: "答案3",
                        },
                        {
                            optionId: 4,
                            description: "答案4",
                        }
                    ],
                    studentAnswer: []
                },
                {
                    type: 1,
                    id: 2,
                    numInPaper: 2,
                    questionScore: 4,
                    createdAt: '2011-10-31',
                    description: "第一题xxxx 1_321",
                    options: [
                        {
                            optionId: 1,
                            description: "答案1",
                        },
                        {
                            optionId: 2,
                            description: "答案2",
                        },
                        {
                            optionId: 3,
                            description: "答案3",
                        },
                        {
                            optionId: 4,
                            description: "答案4",
                        }
                    ],
                    studentAnswer: []
                },
                {
                    type: 2,
                    id: 3,
                    numInPaper: 3,
                    questionScore: 4,
                    createdAt: '2011-10-31',
                    description: "第一题xxxx 1_321",
                    studentAnswer: ""
                },
                {
                    type: 3,
                    id: 4,
                    numInPaper: 4,
                    questionScore: 4,
                    createdAt: '2011-10-31',
                    description: "第一题xxxx 1_321",
                    pictureDescriptions: ["https://picsum.photos/1024/400/?image=41"],
                    studentAnswer: "",
                    studentPictureAnswers: ["https://picsum.photos/1024/400/?image=41"]
                }
            ]
        })
    })
}


/**
 * 获得所有notice
 * @returns {AxiosPromise}
 */
export const getNotice = () => {
    return new Promise((resolve, reject) => {
        resolve({
            code: 100,
            msg: "成功",
            data: [{
                id: 1,
                courseId: 1000,
                title: "xx开课信息",
                content: "course1开课啦！",
                createTime: "2021-12-23T16:02:10.036+00:00"
            },
                {
                    id: 2,
                    courseId: 1000,
                    title: "xx开课信息",
                    content: "course12开课啦！",
                    createTime: "2021-12-23T16:02:09.041+00:00"
                }
            ]
        })
    })
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
    return requests({url: '/account/quit', method: 'delete'})
}

/**
 * 学生退课
 * @param courseId
 * @returns {AxiosPromise}
 */
export const studentQuitCourse = (courseId) => {
    return new Promise((resolve, reject) => {
        resolve({
            code: 100,
            msg: "成功",
            data: null
        })
    })
}

export const createCourse = (name, password) => {
    return requests({
        url: "/course/createCourse?name=" + name + "&password=" + password, method: "post"
    })
}

//获取老师需要批改的所有题目
export const getCorrectedQuestion = (data) => {
    // return requests({url: '/question/getStu', method: 'post', data: data})
    return new Promise((resolve, reject) => {
        resolve({
            "code": 100,
            "msg": "成功",
            "data": {
                questionInfo: {
                    /// 选择题
                    type: 0,
                    questionId: 1,
                    description: "第一题xxxx 1_321",
                    options: [{
                        optionId: 1,
                        description: "答案1",
                    },
                        {
                            optionId: 2,
                            description: "答案2",
                        },
                        {
                            optionId: 3,
                            description: "答案3",
                        },
                        {
                            optionId: 4,
                            description: "答案4",
                        }
                    ],
                    standardAnswer: [2],
                    value: 5,

                    // /// 多选题
                    // type: 1,
                    // questionId: 1,
                    // description: "第一题xxxx 1_321",
                    // options: [
                    //   {
                    //     optionId: 1,
                    //     description: "答案1",
                    //   },
                    //   {
                    //     optionId: 2,
                    //     description: "答案2",
                    //   },
                    //   {
                    //     optionId: 3,
                    //     description: "答案3",
                    //   },
                    //   {
                    //     optionId: 4,
                    //     description: "答案4",
                    //   }
                    // ],
                    // standardAnswer: [2,3],
                    // value: 5,

                    // /// 填空题
                    // type: 2,
                    // questionId: 1,
                    // description: "第一题xxxx 1_321",
                    // standardAnswer: "我爱你中国",
                    // value: 5,

                    // /// 大题
                    // type: 3,
                    // questionId: 1,
                    // description: "第一题xxxx 1_321",
                    // pictureDescription: ["https://picsum.photos/1024/400/?image=41"],
                    // standardAnswer: "我爱你中国",
                    // standardPictureAnswers: [
                    //   "http://dannyxsc.xyz/img/%E6%88%AA%E5%B1%8F2022-02-25%20%E4%B8%8A%E5%8D%8811.18.30.png",
                    //   "http://dannyxsc.xyz/img/image-20220225222647576.png"
                    // ],
                    // value: 5,
                },
                studentList: [
                    ///选择题
                    {
                        studentId: 1,
                        answer: [0],
                        mark: null,
                        textComment: "",
                        pictureComment: [""],
                    },
                    {
                        studentId: 2,
                        answer: [1],
                        mark: null,
                        textComment: "",
                        pictureComment: [""],
                    },
                    {
                        studentId: 3,
                        answer: [2],
                        mark: null,
                        textComment: "",
                        pictureComment: [""],
                    },
                    {
                        studentId: 4,
                        answer: [3],
                        mark: null,
                        textComment: "",
                        pictureComment: [""],
                    },
                    {
                        studentId: 5,
                        answer: [3],
                        mark: null,
                        textComment: "",
                        pictureComment: [""],
                    },

                    // ///填空题
                    // {
                    //   studentId: 1,
                    //   answer: "123",
                    //   mark: 5,
                    //   textComment: "",
                    //   pictureComment: [""],
                    // },
                    // {
                    //   studentId: 2,
                    //   answer: "1232",
                    //   mark: 5,
                    //   textComment: "",
                    //   pictureComment: [""],
                    // },
                    // {
                    //   studentId: 3,
                    //   answer: "1233",
                    //   mark: 5,
                    //   textComment: "",
                    //   pictureComment: [""],
                    // },
                    // {
                    //   studentId: 4,
                    //   answer: "1234",
                    //   mark: 5,
                    //   textComment: "",
                    //   pictureComment: [""],
                    // },

                    // /// 大题
                    // {
                    //   studentId: 1,
                    //   answer: "123",
                    //   studentPictureAnswers: ["http://dannyxsc.xyz/img/image-20211204151552485.png"],
                    //   mark: 5,
                    //   textComment: "",
                    //   pictureComment: [],
                    // },
                    // {
                    //   studentId: 2,
                    //   answer: "1232",
                    //   studentPictureAnswers: ["http://dannyxsc.xyz/img/image-20211204151552485.png"],
                    //   mark: 5,
                    //   textComment: "",
                    //   pictureComment: [],
                    // },
                    // {
                    //   studentId: 3,
                    //   answer: "1233",
                    //   studentPictureAnswers: ["http://dannyxsc.xyz/img/image-20211204151552485.png"],
                    //   mark: 5,
                    //   textComment: "",
                    //   pictureComment: [],
                    // },
                    // {
                    //   studentId: 4,
                    //   answer: "1234",
                    //   studentPictureAnswers: ["http://dannyxsc.xyz/img/image-20211204151552485.png"],
                    //   mark: 5,
                    //   textComment: "",
                    //   pictureComment: [],
                    // },
                ]
            }
        })
    })
}
//老师批改完提交
export const manualCorrect = (data) => {
    return requests({url: '/score/manualCorrect', method: 'post', data: data})
}
//老师添加题目
export const addQuestions = (postData) => {
    // return requests({url: '/question/update', method: 'post', data: postData})
    return new Promise((resolve, reject) => {
        resolve({
            code: 100,
            msg: "成功",
            data: null
        })
    })
}

export const getMessage = (data) => {
    return requests({url: "/exam/courseGetExam/" + courseId, method: 'get'})
}

export const getImage = () => {
    return requests({url: '/account/getImage', method: 'get'})
}
//获得未批改的题目
export const getUnmarkedQuestion = (data) => {
    // return requests({url: '/question/getUnmarkedQuestion', method: 'get', params: data})
    return new Promise((resolve, reject) => {
        resolve({
            "code": 100,
            "msg": "成功",
            "data": [{
                "questionId": 45,
                "description": "123",
                "restNumber": 7
            }]
        })
    })
}
//老师发布考试
export const postExam = (data) => {
    return requests({url: '/exam/releasetest', method: 'post', data: data})
}

/**
 * 通过课程id获取作业列表
 * @param courseId: Number 课程id
 * @returns {AxiosPromise}
 * [
 * {
 *      "id": 1,
 *      "title": "作业1",
 *      "start_time": "2021-12-16T04:12:15.000+00:00",
 *      "end_time": "2021-12-23T15:48:01.437+00:00",
 * },
 * {
 *      "id": 2,
 *      "title": "作业2",
 *      "start_time": "2021-12-16T04:12:15.000+00:00",
 *      "end_time": "2021-12-23T15:48:01.437+00:00",
 * }
 * ]
 */
export const getHomeworkByCourseId = (courseId) => {
    // return requests({url: "/exam/courseGetExam/" + courseId, method: "get"})
    return new Promise(function (resolve, reject) {
        resolve({
            code: 100,
            msg: "123",
            data: [{
                id: 1,
                title: '作业1',
                start_time: '2021-12-16T04:12:15.000+00:00',
                end_time: '2021-12-23T15:48:01.437+00:00',
                score: 5,
            },
                {
                    id: 2,
                    title: '作业2',
                    start_time: '2021-12-15T04:12:15.000+00:00',
                    end_time: '2021-12-23T15:48:01.437+00:00',
                    score: 5,
                },
            ]
        })
    })
}

export const getHomeworkByStudent = () => {
    return new Promise((resolve, reject) => {
        resolve({
            code: 100,
            msg: "123",
            data: [{
                courseId: 1000,
                homeworkId: 1,
                title: '作业1',
                start_time: '2021-12-16T04:12:15.000+00:00',
                end_time: '2021-12-23T15:48:01.437+00:00',
                score: 5,
            },
                {
                    courseId: 1001,
                    homeworkId: 2,
                    title: '作业2',
                    start_time: '2021-12-15T04:12:15.000+00:00',
                    end_time: '2021-12-23T15:48:01.437+00:00',
                    score: 5,
                },
            ]
        })
    })
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

export const getHisInfo = () => {
    return requests({url: "account/info", method: "get"})
}
export const getHisImage = () => {
    return requests({url: "account/getImage", method: "get"})
}
// {
//     id: 0,
//         name: "",
//     email: "",
//     school: "",
//     sex: "",
//     tel: "",
//     avater: ""
// }
// {
//     result.id=res.data.id
//     result.name=res.data.name
//     result.email=res.data.email
//     result.school=res.data.school
//     result.sex=res.data.sex
//     result.tel=res.data.phone
// }

export const getCommentsByAssignmentId = (AssignmentId) => {
    let retdata = []
    let ret = []
    requests({url: '/comment/getCommentByHomeworkId?homeworkId=' + AssignmentId, method: 'get'}).then((res) => {
        retdata = res
        console.log(res)
        for (let i = 0; i < retdata.data.length; i++) {
            let children = []
            requests({
                url: '/comment/getCommentByCommentId?commentId=' + retdata.data[i].comment.id,
                method: 'get'
            }).then(childret => {
                for (let j = 0; j < childret.data.length; j++) {
                    children.push({
                        userId: childret.data[j].comment.userId,
                        userName: childret.data[j].name,
                        userAvater: 'https://picsum.photos/250/250/?image=59',//childret.data[j].avater
                        commentId: childret.data[j].comment.id,
                        supportNum: childret.data[j].comment.likeNum,
                        supported: false,
                        content: childret.data[j].comment.content,
                    })
                }
            })
            ret.push({
                userId: retdata.data[i].comment.userId,
                userName: retdata.data[i].name,
                userAvater: "https://picsum.photos/250/250/?image=59",//retdata.data[i].avater
                commentId: retdata.data[i].comment.id,
                commentNum: retdata.data[i].comment.commentNum,
                supported: false,
                content: retdata.data[i].comment.content,
                supportNum: retdata.data[i].comment.likeNum,
                myComment: '',
                children: children
            })
        }
    }).catch((e) => {
        console.log(e)
    })
    return new Promise(function (resolve, reject) {
        resolve({
            code: 100,
            data: [{
                comments: ret
            }]
        })
    })
}
// [{
//     comments: [{
//         userId: 1950000,
//         userName: "student",
//         userAvater: 'https://picsum.photos/250/250/?image=59',
//         commentId: 1,
//         supported: false,
//         content: "第一条评论",
//         supportNum: 1,
//         myComment: '',
//         children: [{
//             userId: 1950002,
//             userName: "张纪鹏",
//             userAvater: 'https://picsum.photos/250/250/?image=59',
//             commentId: 3,
//             supportNum: 123,
//             supported: false,
//             content: "回复第一条评论",
//         },
//             {
//                 userId: 1950003,
//                 userName: "谢思程",
//                 userAvater: 'https://picsum.photos/250/250/?image=59',
//                 commentId: 4,
//                 supportNum: 123,
//                 supported: false,
//                 content: "回复第一条评论",
//             },
//         ],
//     },
//         {
//             userId: 1950001,
//             userName: "student2",
//             userAvater: 'https://picsum.photos/250/250/?image=59',
//             commentId: 2,
//             supportNum: 123,
//             supported: false,
//             content: "第二条评论",
//             myComment: '',
//             children: [{
//                 userId: 1950004,
//                 userName: "蒙俊杰",
//                 userAvater: 'https://picsum.photos/250/250/?image=59',
//                 commentId: 5,
//                 supportNum: 123,
//                 supported: false,
//                 content: "回复第一条评论",
//             },
//                 {
//                     userId: 1950005,
//                     userName: "柳淯之",
//                     userAvater: 'https://picsum.photos/250/250/?image=59',
//                     commentId: 6,
//                     supportNum: 123,
//                     supported: false,
//                     content: "回复第一条评论",
//                 },
//             ],
//         },
//     ]
// }]

export const submitComment = (userId, targetAssignmentId, targetCommentId, identity, content) => {
    requests({
        url: '/comment/postComment',
        params: {
            userId: userId,
            pHomeworkId: targetAssignmentId,
            pCommentId: targetCommentId,
            identity: identity,
            content: content
        },
        method: 'post'
    }).then(res => {
        console.log("评论成功")
    }).catch(e => {
        console.log(e)
    })
    return new Promise(function (resolve, reject) {
        resolve({
            code: 100,
        })
    })
}

export const updateInfo = (updateInfo) => {
    return requests({url: "/account/update", method: "put", data: updateInfo})
}


export const updateAvater = (avater) => {
    return new Promise(function (resolve, reject) {
        console.log({
            id: id,
            avater: avater
        });
        resolve({
            code: 100,
        })
    })
}
export const addLike = (id, targetId, identity) => {
    return requests({url:"/comment/like",method:"post",params:{commentId:targetId,userId:id,identity:identity}})
}
export const getStuCourses = () => {
    return requests({url:"/course/getMyCourses",method:"get"})
}

export const attendCourse = (courseId, password, id) => {
    return requests({url: "/course/joinCourse", params: {courseId: courseId, password: password}, method: "post"})
}
export const getHomeworkInfo = (homeworkId) => {
    return new Promise(function (resolve, reject) {
        resolve({
            code: 100,
            data: {
                title: "第一次作业",
                courseName: "课程一",
                teacherName: "danny",
                startTime: "2022-04-10 05:36:54",
                endTime: "2022-04-11 05:36:54"
            }
        })
    })
}

export const sendHomeworkComment = (userId, homeworkId, identity, content) => {
    return requests({
        url: "/comment/postComment",
        method: "post",
        params: {userId: userId, pHomeworkId: homeworkId, pCommentId: -1, identity: identity, content: content}
    })
}
export const getTeaCourses = () => {
    return new Promise(function (resolve, reject) {
        resolve({
            code: 100,
            data: [{
                title: '数学',
                courseId: 1,
                assignments: []
            }]
        })
    })
}


export const testPostImage = (file) => {

    return requests({url: "/testUploadImage", method: "post", data: file})
}
