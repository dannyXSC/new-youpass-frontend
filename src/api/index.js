//api写在这里 可以根据需要穿件文件夹
import requests from "@/utils/requests";

/**
 * 获得图片id对应的url
 * @param id
 */
export const getImageUrl = (id) => {
    return requests({url: "/file/" + id, method: "get"})
    //
    // return new Promise((resolve, reject) => {
    //     resolve({
    //         code: 100,
    //         msg: '成功',
    //         data: "http://dannyxsc.xyz/img/image-20220225222647576.png"
    //     })
    // })
}

/**
 * 通过id删除图片
 * @param id
 * @returns {Promise<unknown>}
 */
export const removeImage = (id) => {
    return requests({url: "/file/" + id, method: "DELETE"})
    // return new Promise((resolve, reject) => {
    //     resolve({
    //         code: 100,
    //         msg: '成功',
    //         data: null
    //     })
    // })
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
export const imagePostURL = "/api/file"
export const uploadImage = (formData) => {
    return requests({url: "/file", method: "post", data: formData})
}


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
        console.log(res)
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
export const searchCourse3 = (teacherName) => {
    let result = []
    requests({
        url: '/course/SearchCourse',
        params: {courseId: '', name: '', teacherName: teacherName},
        method: 'post'
    }).then(res => {
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
export const addTodo = (data) => {

    return requests({
        url: '/account/addTodo',
        data: {content: data},
        method: 'post'
    })
}

export const getTodo = () => {
    return requests({
        url: '/account/getTodo',
        data: {},
        method: 'get'
    })
}
export const deleteTodo = (id) => {
    return requests({
        url: '/account/deleteTodo/' + String(id),
        method: 'delete'
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
 * @param homeworkId
 * @returns {AxiosPromise}
 */
export const getFeedback = (homeworkId) => {
    let data = []

    requests({url: 'homework/student/homeworkId/' + homeworkId, method: 'get'}).then(res => {
        console.log(res)
        res.data.stuAnswerQuestionList.forEach(value => {
            let question = {}
            if (value.questionVo.questionType === "SINGLE") {
                question.type = 0;
            } else if (value.questionVo.questionType === "MULTIPLE") {
                question.type = 1;
            } else if (value.questionVo.questionType === "FILL_IN_BLANK") {
                question.type = 2;
            } else {
                question.type = 3;
            }
            question.questionId = value.questionVo.questionId;
            question.numInPaper = value.numInPaper;
            question.description = value.questionVo.description;
            if(question.type===0||question.type ===1){
                question.studentAnswer=[]
                question.standardAnswer=[]
            }
           else{
                question.studentAnswer=""
                question.standardAnswer=""
            }

            if(question.type===0||question.type===1){
                question.options = value.questionVo.options;
            }
            if(question.type===0||question.type ===1) {

                value.questionVo.standardAnswer.forEach(temp => {
                    console.log("temp",temp.replace(' ',''))
                    question.standardAnswer.push(parseInt(temp.replace(' ','')))
                })
                value.studentAnswer.forEach(temp=>{
                    console.log("temp",temp.replace(' ',''))
                    question.studentAnswer.push(parseInt(temp.replace(' ','')))
                })
            }else {
                question.standardAnswer=value.questionVo.standardAnswer;
                question.studentAnswer = value.studentAnswer;
            }

            question.textComment = value.feedbackComment
            if(question.textComment===""||question.textComment===null){
                question.textComment="老师尚未点评该题目！"
            }
            question.pictureComment = value.feedbackFileId
            if(question.pictureComment===null){
                question.pictureComment=[]
            }
            data.push(question)
        })
        console.log(11111,data)
    })
    return new Promise((resolve, reject) => {
        console.log(1233456+data)
        resolve({
            code: 100,
            msg: "成功",
            data: data
        })
    })
}
/**
 * [{
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
 pictureComment: ["20"],
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
                    pictureComment: ["20"],
                },
 {
                    type: 2,
                    questionId: 3,
                    numInPaper: 3,
                    description: "第一题xxxx 1_321",
                    studentAnswer: "321321_{qwer}",
                    standardAnswer: "我爱你中国",
                    textComment: "加油3",
                    pictureComment: ["20"],
                },
 {
                    type: 3,
                    questionId: 4,
                    numInPaper: 4,
                    description: "第一题xxxx 1_321",
                    pictureDescriptions: ["20"],
                    studentAnswer: "33333",
                    // studentPictureAnswers: ["https://picsum.photos/1024/400/?image=41"],
                    standardAnswer: "我爱你中国222",
                    standardPictureAnswers: [
                        "20", "21"
                    ],
                    textComment: "加油4",
                    pictureComment: ["28"],
                }
 ]
 */
/**
 * 通过作业id和学生id获得学生的题目（未做完，正在做）
 * @param studentId 学生id
 *        homeworkId 作业id
 * @returns {AxiosPromise}
 */
export const getQuestions = (homeworkId) => {
    return requests({url: '/homework/student/homeworkId/' + homeworkId, method: 'get'}).then(response => {
        console.log("response", response)
        let res = {}
        res.code = response.code
        res.msg = response.msg
        res.data = []
        response.data.stuAnswerQuestionList.forEach((item) => {
            let type = 0
            let studentAnswer = item.studentAnswer
            let studentPictureAnswers = item.submitFileId
            if (item.questionVo.questionType === "SINGLE") {
                type = 0
                studentAnswer = studentAnswer || []
                let temp = []
                studentAnswer.forEach((item, index) => {
                    if (isNaN(parseInt(item)) === false) {
                        temp.push(parseInt(item))
                    }
                })
                studentAnswer = temp
            } else if (item.questionVo.questionType === "MULTIPLE") {
                type = 1
                studentAnswer = studentAnswer || []
                let temp = []
                studentAnswer.forEach((item, index) => {
                    if (isNaN(parseInt(item)) === false) {
                        temp.push(parseInt(item))
                    }
                })
                studentAnswer = temp
            } else if (item.questionVo.questionType === "FILL_IN_BLANK") {
                type = 2
                studentAnswer = studentAnswer || ""
            } else {
                type = 3
                studentAnswer = studentAnswer || ""
                studentPictureAnswers = studentPictureAnswers || []
            }

            let options = []
            if (type === 0 || type === 1) {
                item.questionVo.options.forEach((option) => {
                    options.push({
                        optionId: option.questionId,
                        description: option.description
                    })
                })
            }

            res.data.push({
                type: type,
                questionId: item.questionVo.questionId,
                numInPaper: item.numInPaper + 1,
                description: item.questionVo.description,
                options: options,
                studentAnswer: studentAnswer,
                studentPictureAnswers: studentPictureAnswers,
                pictureDescriptions: item.questionVo.questionFileId || [],
            })
        })
        return res
    })

    // return new Promise((resolve, reject) => {
    //     resolve({
    //         code: 100,
    //         msg: "成功",
    //         data: [
    //             {
    //                 type: 0,
    //                 questionId: 1,
    //                 numInPaper: 1,
    //                 description: "第一题xxxx 1_321",
    //                 options: [{
    //                     optionId: 1,
    //                     description: "答案1",
    //                 },
    //                     {
    //                         optionId: 2,
    //                         description: "答案2",
    //                     },
    //                     {
    //                         optionId: 3,
    //                         description: "答案3",
    //                     },
    //                     {
    //                         optionId: 4,
    //                         description: "答案4",
    //                     }
    //                 ],
    //                 studentAnswer: []
    //             },
    //             {
    //                 type: 1,
    //                 questionId: 2,
    //                 numInPaper: 2,
    //                 description: "第一题xxxx 1_321",
    //                 options: [{
    //                     optionId: 1,
    //                     description: "答案1",
    //                 },
    //                     {
    //                         optionId: 2,
    //                         description: "答案2",
    //                     },
    //                     {
    //                         optionId: 3,
    //                         description: "答案3",
    //                     },
    //                     {
    //                         optionId: 4,
    //                         description: "答案4",
    //                     }
    //                 ],
    //                 studentAnswer: []
    //             },
    //             {
    //                 type: 2,
    //                 questionId: 3,
    //                 numInPaper: 3,
    //                 description: "第一题xxxx 1_321",
    //                 studentAnswer: ""
    //             },
    //             {
    //                 type: 3,
    //                 questionId: 4,
    //                 numInPaper: 4,
    //                 description: "第一题xxxx 1_321",
    //                 pictureDescriptions: [10, 22],
    //                 studentAnswer: "",
    //                 studentPictureAnswers: [10]
    //             }
    //         ]
    //     })
    // })
}

export const teacherPublishExam = (postData, teacherId, courseId) => {
    let questions = []
    postData.questionList.forEach(value => {
        let obj = {questionId: value.id}
        if (value.type === "单选题") {
            obj.value = postData.singleScore
        } else if (value.type === "多选题") {
            obj.value = postData.multiScore
        } else if (value.type === "填空题") {
            obj.value = postData.fillScore
        } else if (value.type === "大题") {
            obj.value = postData.bigScore
        }
        questions.push(obj)
    })

    let data = {
        courseId: courseId,
        homework: {
            endTime: postData.startDate + "T" + postData.endTime + ":00",
            startTime: postData.startDate + "T" + postData.startTime + ":00",
            teacherId: teacherId,
            questions: questions,
            title: postData.examName,
        }
    }
    console.log(data)
    return requests({url: "/homework/teacher/publish", method: "post", data: data})
}

/**
 * 获得老师的所有题目
 */
export const getQuestionsOfTeacher = () => {
    return requests({url: "/question", method: "get"}).then(res => {
        let data = []
        res.data.forEach(value => {
            let obj = {}
            obj.id = value.questionId
            obj.description = value.description
            if (value.questionType === "SINGLE") {
                obj.type = 0
            } else if (value.questionType === "MULTIPLE") {
                obj.type = 1
            } else if (value.questionType === "FILL_IN_BLANK") {
                obj.type = 2
            } else if (value.questionType === "COMPREHENSIVE") {
                obj.type = 3
            }
            obj.createdAt = value.createTime
            data.push(obj)
        })
        res.data = data
        return res
    })
    // return new Promise((resolve, reject) => {
    //     resolve({
    //         code: 100,
    //         msg: "成功",
    //         data: [
    //             {
    //                 type: 0,
    //                 id: 1,
    //                 numInPaper: 1,
    //                 questionScore: 4,
    //                 createdAt: '2011-10-31',
    //                 description: "第一题xxxx 1_321",
    //                 options: [
    //                     {
    //                         optionId: 1,
    //                         description: "答案1",
    //                     },
    //                     {
    //                         optionId: 2,
    //                         description: "答案2",
    //                     },
    //                     {
    //                         optionId: 3,
    //                         description: "答案3",
    //                     },
    //                     {
    //                         optionId: 4,
    //                         description: "答案4",
    //                     }
    //                 ],
    //                 studentAnswer: []
    //             },
    //             {
    //                 type: 1,
    //                 id: 2,
    //                 numInPaper: 2,
    //                 questionScore: 4,
    //                 createdAt: '2011-10-31',
    //                 description: "第一题xxxx 1_321",
    //                 options: [
    //                     {
    //                         optionId: 1,
    //                         description: "答案1",
    //                     },
    //                     {
    //                         optionId: 2,
    //                         description: "答案2",
    //                     },
    //                     {
    //                         optionId: 3,
    //                         description: "答案3",
    //                     },
    //                     {
    //                         optionId: 4,
    //                         description: "答案4",
    //                     }
    //                 ],
    //                 studentAnswer: []
    //             },
    //             {
    //                 type: 2,
    //                 id: 3,
    //                 numInPaper: 3,
    //                 questionScore: 4,
    //                 createdAt: '2011-10-31',
    //                 description: "第一题xxxx 1_321",
    //                 studentAnswer: ""
    //             },
    //             {
    //                 type: 3,
    //                 id: 4,
    //                 numInPaper: 4,
    //                 questionScore: 4,
    //                 createdAt: '2011-10-31',
    //                 description: "第一题xxxx 1_321",
    //                 pictureDescriptions: ["https://picsum.photos/1024/400/?image=41"],
    //                 studentAnswer: "",
    //                 studentPictureAnswers: ["https://picsum.photos/1024/400/?image=41"]
    //             }
    //         ]
    //     })
    // })
}


/**
 * 获得所有notice
 * @returns {AxiosPromise}
 */
export const getNotice = () => {
    let result = []
    requests({url: "/course/getNotice/", method: 'get'}).then(res => {
        console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {

            result.push({
                id: res.data[i].id,
                courseId: res.data[i].courseId,
                content: res.data[i].content,
                title: res.data[i].title,
                updateTime: res.data[i].updateTime,
                createTime: res.data[i].createTime,

            })
        }
    })
    return new Promise((resolve, reject) => {
        resolve({
            code: 100,
            msg: "成功",
            data: result
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
export const studentQuitCourse = (courseId, studentId) => {
    return requests({
        url: "/course/deleteStudentFromTake?courseId=" + courseId + "&studentId=" + studentId,
        method: "post"
    })
    // return new Promise((resolve, reject) => {
    //     resolve({
    //         code: 100,
    //         msg: "成功",
    //         data: null
    //     })
    // })
}

export const deleteCourseByCourseId = (courseId) => {
    return requests({url: "/course/teacherDeleteCourse?courseId=" + courseId, method: "post"})
}

export const createCourse = (name, password, url, courseTime) => {
    return requests({
        url: "/course/createCourse",
        data: {
            name: name,
            password: password,
            url: url,
            courseTime: courseTime
        },
        method: "post"
    })
}

//获取老师需要批改的所有题目
export const getCorrectedQuestion = (homeworkId, questionId) => {
    return requests({
        url: '/homework/homeworkId/' + homeworkId + '/questionId/' + questionId,
        method: 'get'
    }).then(response => {
        console.log("response", response)
        let res = {}
        res.code = response.code
        res.msg = response.msg
        res.data = {questionInfo: {}, studentList: []}
        if (response.data !== null && Array.isArray(response.data)) {
            response.data = response.data || []
            response.data.forEach((item) => {
                res.data.questionInfo.description = item.questionVo.description
                res.data.questionInfo.questionId = item.questionVo.questionId
                res.data.questionInfo.value = item.questionVo.value

                let studentAnswer = null

                console.log(item)

                if (item.questionVo.questionType === "SINGLE") {
                    res.data.questionInfo.type = 0
                    res.data.questionInfo.options = []
                    res.data.questionInfo.standardAnswer = []
                    item.questionVo.options = item.questionVo.options || []
                    item.questionVo.options.forEach((option) => {
                        res.data.questionInfo.options.push({
                            optionId: parseInt(option.optionId),
                            description: option.description
                        })
                    })
                    item.questionVo.standardAnswer = item.questionVo.standardAnswer || []
                    item.questionVo.standardAnswer.forEach((answer) => {
                        res.data.questionInfo.standardAnswer.push(parseInt(answer))
                    })

                    studentAnswer = []
                    item.studentAnswer = item.studentAnswer || []
                    item.studentAnswer.forEach((answer) => {
                        studentAnswer.push(parseInt(answer))
                    })

                } else if (item.questionVo.questionType === "MULTIPLE") {
                    res.data.questionInfo.type = 1
                    res.data.questionInfo.options = []
                    res.data.questionInfo.standardAnswer = []
                    item.questionVo.options = item.questionVo.options || []
                    item.questionVo.options.forEach((option) => {
                        res.data.questionInfo.options.push({
                            optionId: parseInt(option.optionId),
                            description: option.description
                        })
                    })
                    item.questionVo.standardAnswer = item.questionVo.standardAnswer || []
                    item.questionVo.standardAnswer.forEach((answer) => {
                        res.data.questionInfo.standardAnswer.push(parseInt(answer))
                    })
                    studentAnswer = []
                    item.studentAnswer = item.studentAnswer || []
                    item.studentAnswer.forEach((answer) => {
                        studentAnswer.push(parseInt(answer))
                    })
                } else if (item.questionVo.questionType === "FILL_IN_BLANK") {
                    res.data.questionInfo.type = 2
                    res.data.questionInfo.standardAnswer = item.questionVo.standardAnswer
                    studentAnswer = item.studentAnswer
                } else {
                    res.data.questionInfo.type = 3
                    res.data.questionInfo.standardAnswer = item.questionVo.standardAnswer
                    res.data.questionInfo.pictureDescription = item.questionVo.questionFileId
                    res.data.questionInfo.standardPictureAnswers = item.questionVo.answerFileId
                    studentAnswer = item.studentAnswer
                }

                res.data.studentList.push({
                    studentId: item.studentId,
                    answer: studentAnswer,
                    mark: item.mark,
                    textComment: item.feedbackComment || "",
                    pictureComment: item.feedbackFileId || [],
                    studentPictureAnswers: item.submitFileId || [],
                })
            })
        }
        console.log(res)
        return res
    })
    // return new Promise((resolve, reject) => {
    //     resolve({
    //         "code": 100,
    //         "msg": "成功",
    //         "data": {
    //             questionInfo: {
    //                 /// 选择题
    //                 type: 0,
    //                 questionId: 1,
    //                 description: "第一题xxxx 1_321",
    //                 options: [{
    //                     optionId: 1,
    //                     description: "答案1",
    //                 },
    //                     {
    //                         optionId: 2,
    //                         description: "答案2",
    //                     },
    //                     {
    //                         optionId: 3,
    //                         description: "答案3",
    //                     },
    //                     {
    //                         optionId: 4,
    //                         description: "答案4",
    //                     }
    //                 ],
    //                 standardAnswer: [2],
    //                 value: 5,
    //
    //                 // /// 多选题
    //                 // type: 1,
    //                 // questionId: 1,
    //                 // description: "第一题xxxx 1_321",
    //                 // options: [
    //                 //   {
    //                 //     optionId: 1,
    //                 //     description: "答案1",
    //                 //   },
    //                 //   {
    //                 //     optionId: 2,
    //                 //     description: "答案2",
    //                 //   },
    //                 //   {
    //                 //     optionId: 3,
    //                 //     description: "答案3",
    //                 //   },
    //                 //   {
    //                 //     optionId: 4,
    //                 //     description: "答案4",
    //                 //   }
    //                 // ],
    //                 // standardAnswer: [2,3],
    //                 // value: 5,
    //
    //                 // /// 填空题
    //                 // type: 2,
    //                 // questionId: 1,
    //                 // description: "第一题xxxx 1_321",
    //                 // standardAnswer: "我爱你中国",
    //                 // value: 5,
    //
    //                 // /// 大题
    //                 // type: 3,
    //                 // questionId: 1,
    //                 // description: "第一题xxxx 1_321",
    //                 // pictureDescription: ["https://picsum.photos/1024/400/?image=41"],
    //                 // standardAnswer: "我爱你中国",
    //                 // standardPictureAnswers: [
    //                 //   "http://dannyxsc.xyz/img/%E6%88%AA%E5%B1%8F2022-02-25%20%E4%B8%8A%E5%8D%8811.18.30.png",
    //                 //   "http://dannyxsc.xyz/img/image-20220225222647576.png"
    //                 // ],
    //                 // value: 5,
    //             },
    //             studentList: [
    //                 ///选择题
    //                 {
    //                     studentId: 1,
    //                     answer: [0],
    //                     mark: null,
    //                     textComment: "",
    //                     pictureComment: [""],
    //                 },
    //                 {
    //                     studentId: 2,
    //                     answer: [1],
    //                     mark: null,
    //                     textComment: "",
    //                     pictureComment: [""],
    //                 },
    //                 {
    //                     studentId: 3,
    //                     answer: [2],
    //                     mark: null,
    //                     textComment: "",
    //                     pictureComment: [""],
    //                 },
    //                 {
    //                     studentId: 4,
    //                     answer: [3],
    //                     mark: null,
    //                     textComment: "",
    //                     pictureComment: [""],
    //                 },
    //                 {
    //                     studentId: 5,
    //                     answer: [3],
    //                     mark: null,
    //                     textComment: "",
    //                     pictureComment: [""],
    //                 },
    //
    //                 // ///填空题
    //                 // {
    //                 //   studentId: 1,
    //                 //   answer: "123",
    //                 //   mark: 5,
    //                 //   textComment: "",
    //                 //   pictureComment: [""],
    //                 // },
    //                 // {
    //                 //   studentId: 2,
    //                 //   answer: "1232",
    //                 //   mark: 5,
    //                 //   textComment: "",
    //                 //   pictureComment: [""],
    //                 // },
    //                 // {
    //                 //   studentId: 3,
    //                 //   answer: "1233",
    //                 //   mark: 5,
    //                 //   textComment: "",
    //                 //   pictureComment: [""],
    //                 // },
    //                 // {
    //                 //   studentId: 4,
    //                 //   answer: "1234",
    //                 //   mark: 5,
    //                 //   textComment: "",
    //                 //   pictureComment: [""],
    //                 // },
    //
    //                 // /// 大题
    //                 // {
    //                 //   studentId: 1,
    //                 //   answer: "123",
    //                 //   studentPictureAnswers: ["http://dannyxsc.xyz/img/image-20211204151552485.png"],
    //                 //   mark: 5,
    //                 //   textComment: "",
    //                 //   pictureComment: [],
    //                 // },
    //                 // {
    //                 //   studentId: 2,
    //                 //   answer: "1232",
    //                 //   studentPictureAnswers: ["http://dannyxsc.xyz/img/image-20211204151552485.png"],
    //                 //   mark: 5,
    //                 //   textComment: "",
    //                 //   pictureComment: [],
    //                 // },
    //                 // {
    //                 //   studentId: 3,
    //                 //   answer: "1233",
    //                 //   studentPictureAnswers: ["http://dannyxsc.xyz/img/image-20211204151552485.png"],
    //                 //   mark: 5,
    //                 //   textComment: "",
    //                 //   pictureComment: [],
    //                 // },
    //                 // {
    //                 //   studentId: 4,
    //                 //   answer: "1234",
    //                 //   studentPictureAnswers: ["http://dannyxsc.xyz/img/image-20211204151552485.png"],
    //                 //   mark: 5,
    //                 //   textComment: "",
    //                 //   pictureComment: [],
    //                 // },
    //             ]
    //         }
    //     })
    // })
}
//老师批改完提交
export const manualCorrect = (homeworkId, questionId, studentList) => {
    let data = {}
    data.homeworkId = homeworkId
    data.questionId = questionId
    data.teacherCorrectBos = []
    studentList.forEach(item => {
        let obj = {}
        obj.studentId = item.studentId
        obj.feedback = item.textComment
        obj.mark = item.mark
        obj.feedbackFileId = item.pictureComment
        data.teacherCorrectBos.push(obj)
    })
    return requests({url: '/homework/teacher/correct', method: 'post', data: data})
}

//老师添加题目
export const addQuestions = (postData, teacherId) => {
    let data = []
    postData.forEach(value => {
        let obj = {}
        obj.description = value.description
        // obj.questionId = value.id
        switch (value.type) {
            case 0:
                obj.questionType = "SINGLE"
                break;
            case 1:
                obj.questionType = "MULTIPLE"
                break;
            case 2:
                obj.questionType = "FILL_IN_BLANK"
                break;
            case 3:
                obj.questionType = "COMPREHENSIVE"
        }
        obj.standardAnswer = value.standardAnswer
        obj.questionFileId = value.imageDescription
        obj.answerFileId = value.imageStandardAnswer
        obj.options = []
        if (Array.isArray(value.option)) {
            value.option.forEach(item => {
                obj.options.push({
                    optionId: item.id,
                    description: item.description
                })
            })
        }
        obj.teacherId = teacherId
        console.log(obj)
        data.push(obj)
    })
    return requests({url: '/question/teacher/batch', method: 'post', data: data})
    // return new Promise((resolve, reject) => {
    //     resolve({
    //         code: 100,
    //         msg: "成功",
    //         data: null
    //     })
    // })
}

export const getMessage = (data) => {
    return requests({url: "/exam/courseGetExam/" + courseId, method: 'get'})
}

export const getImage = () => {
    return requests({url: '/account/getImage', method: 'get'})
}
//获得未批改的题目
export const getUnmarkedQuestion = (homeworkId) => {
    return requests({
        url: '/homework/teacher/beforeCorrect/homeworkId/' + homeworkId,
        method: 'post'
    }).then(response => {
        let res = {}
        res.code = response.code
        res.msg = response.msg
        res.data = []
        if (response.data.correctNumBoList !== null && Array.isArray(response.data.correctNumBoList)) {
            response.data.correctNumBoList.forEach((item) => {
                let obj = {}
                obj.restNumber = item.totalNum - item.correctNum
                obj.totalNumber = item.totalNum
                obj.questionId = item.questionVo.questionId
                obj.description = item.questionVo.description
                if (item.questionVo.questionType === "SINGLE") {
                    obj.type = "单选题"
                } else if (item.questionVo.questionType === "MULTIPLE") {
                    obj.type = "多选题"
                } else if (item.questionVo.questionType === "FILL_IN_BLANK") {
                    obj.type = "填空题"
                } else {
                    obj.type = "大题"
                }
                res.data.push(obj)
            })
        }
        return res
    })
    // return new Promise((resolve, reject) => {
    //     resolve({
    //         "code": 100,
    //         "msg": "成功",
    //         "data": [{
    //             "questionId": 45,
    //             "description": "123",
    //             "restNumber": 7,
    //             "totalNumber": 20
    //             "type": "选择题"
    //         }]
    //     })
    // })
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
    return requests({url: "/homework/courseId/" + courseId, method: "get"}).then(response => {
        console.log(response)
        let res = {}
        res.code = response.code
        res.msg = response.msg
        res.data = []
        response.data.forEach(item => {
            res.data.push({
                id: item.homeworkId,
                title: item.title,
                start_time: item.startTime,
                end_time: item.endTime,
            })
        })
        return res
    })
    // return new Promise(function (resolve, reject) {
    //     resolve({
    //         code: 100,
    //         msg: "123",
    //         data: [{
    //             id: 1,
    //             title: '作业1',
    //             start_time: '2021-12-16T04:12:15.000+00:00',
    //             end_time: '2021-12-23T15:48:01.437+00:00',
    //             score: 5,
    //         },
    //             {
    //                 id: 2,
    //                 title: '作业2',
    //                 start_time: '2021-12-15T04:12:15.000+00:00',
    //                 end_time: '2021-12-23T15:48:01.437+00:00',
    //                 score: 5,
    //             },
    //         ]
    //     })
    // })
}
// return new Promise(function (resolve, reject) {
//     resolve({
//         code: 100,
//         msg: "123",
//         data: [{
//             id: 1,
//             title: '作业1',
//             start_time: '2021-12-16T04:12:15.000+00:00',
//             end_time: '2021-12-23T15:48:01.437+00:00',
//             score: 5,
//         },
//             {
//                 id: 2,
//                 title: '作业2',
//                 start_time: '2021-12-15T04:12:15.000+00:00',
//                 end_time: '2021-12-23T15:48:01.437+00:00',
//                 score: 5,
//             },
//         ]
//     })
// })
export const getHomeworkByStudent = (studentId) => {
    return requests({url: '/homework', method: "post", data: {studentId: studentId}})
}
// return new Promise((resolve, reject) => {
//     resolve({
//         code: 100,
//         msg: "123",
//         data: [{
//             courseId: 1000,
//             homeworkId: 1,
//             title: '作业1',
//             start_time: '2021-12-16T04:12:15.000+00:00',
//             end_time: '2021-12-23T15:48:01.437+00:00',
//             score: 5,
//         },
//             {
//                 courseId: 1001,
//                 homeworkId: 2,
//                 title: '作业2',
//                 start_time: '2021-12-15T04:12:15.000+00:00',
//                 end_time: '2021-12-23T15:48:01.437+00:00',
//                 score: 5,
//             },
//         ]
//     })
// })
// return new Promise((resolve, reject) => {
//     resolve({
//         code: 100,
//         msg: "123",
//         data: [{
//             courseId: 1000,
//             homeworkId: 1,
//             title: '作业1',
//             start_time: '2021-12-16T04:12:15.000+00:00',
//             end_time: '2021-12-23T15:48:01.437+00:00',
//             score: 5,
//         },
//             {
//                 courseId: 1001,
//                 homeworkId: 2,
//                 title: '作业2',
//                 start_time: '2021-12-15T04:12:15.000+00:00',
//                 end_time: '2021-12-23T15:48:01.437+00:00',
//                 score: 5,
//             },
//         ]
//     })
// })
//自动批改
export const autoCorrect = (homeworkId, questionId) => {
    return requests({
        url: "/homework/teacher/autoCorrect?homeworkId=" + homeworkId + "&questionId=" + questionId,
        method: "post"
    })

}
//查看该生某次作业是否已经提交
export const getSubmitByStudent = (studentId, homeworkId) => {
    return requests({
        url: '/homework/studentHomework',
        method: "post",
        data: {studentId: studentId, homeworkId: homeworkId}
    })
}

//修改提交结果
export const updateSubmit = (data) => {
    return requests({
        url: '/homework/updateSubmit',
        method: "post",
        data: {studentId: data.studentId, homeworkId: data.homeworkId}
    })
}
//获取考生所有考试成绩
export const getStuCourseExamScore = (courseId) => {
    return requests({url: "/score/getStuScore/" + courseId, method: "get"})
}


//通过课程id获得所有学生的信息
export const getStudentListByCourseId = (courseId) => {
    return requests({url: "/course/getCourseAllStudent?courseId=" + courseId, method: "get"})
    // return new Promise(function (resolve, reject) {
    //     resolve({
    //         code: 100,
    //         data: [{
    //             id: 1950000,
    //             name: "张三",
    //             //头像url之类的
    //         },
    //             {
    //                 id: 1950001,
    //                 name: "李四"
    //             }
    //         ]
    //     })
    // })
}

//通过课程id和学生id踢出学生
export const kickStudentByIdAndCourseId = (id, courseId) => {
    return requests({url: "/course/deleteStudentFromTake?studentId=" + id + "&courseId=" + courseId, method: "post"})
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
export const getIsLike = (commentId) => {
    return requests({url: '/comment/isLike', method: "get", params: {commentId: commentId}})
}
export const getCommentsByAssignmentId = (AssignmentId) => {
    let retdata = []
    let ret = []
    requests({url: '/comment/getCommentByHomeworkId?homeworkId=' + AssignmentId, method: 'get'}).then((res) => {
        console.log(res)
        retdata = res
        for (let i = 0; i < retdata.data.length; i++) {
            getIsLike(retdata.data[i].comment.id).then(p => {
                let children = []
                requests({
                    url: '/comment/getCommentByCommentId?commentId=' + retdata.data[i].comment.id,
                    method: 'get'
                }).then(childret => {
                    for (let j = 0; j < childret.data.length; j++) {
                        getIsLike(childret.data[j].comment.id).then(k => {
                            children.push({
                                userId: childret.data[j].comment.userId,
                                userName: childret.data[j].name,
                                userAvater: childret.data[j].avater,
                                commentId: childret.data[j].comment.id,
                                supportNum: childret.data[j].comment.likeNum,
                                supported: k.data[0],
                                createTime: childret.data[j].comment.createTime.slice(0, 19).replace('T', '  '),
                                myComment: '',
                                pcommentId: childret.data[j].comment.pcommentId,
                                fatherName: childret.data[j].fatherName,
                                content: childret.data[j].comment.content,
                            })
                        })
                    }
                    ret.push({
                        userId: retdata.data[i].comment.userId,
                        userName: retdata.data[i].name,
                        userAvater: retdata.data[i].avater,
                        commentId: retdata.data[i].comment.id,
                        commentNum: retdata.data[i].comment.commentNum,
                        supported: p.data[0],
                        content: retdata.data[i].comment.content,
                        supportNum: retdata.data[i].comment.likeNum,
                        fatherName: retdata.data[i].fatherName,
                        createTime: retdata.data[i].comment.createTime.slice(0, 19).replace('T', '  '),
                        myComment: '',
                        children: children
                    })
                })
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
    return requests({url: "/file", method: "post", data: avater})
}
export const updateAvaterStage2 = (id) => {
    return requests({url: "/account/uploadImage/" + id.toString(), method: "post"})
}
export const addLike = (id, targetId, identity) => {
    return requests({
        url: "/comment/like",
        method: "post",
        params: {commentId: targetId, userId: id, identity: identity}
    })
}
export const getStuCourses = () => {
    return requests({url: "/course/getMyCourses", method: "get"})
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
    return requests({url: "/course/getMyCourses", method: "get"})
    // return new Promise(function (resolve, reject) {
    //     resolve({
    //         code: 100,
    //         data: [{
    //             title: '数学',
    //             courseId: 1,
    //             assignments: []
    //         }]
    //     })
    // })
}

export const submitHomework = (studentId, homeworkId, questionInfos) => {
    let stuHomeworkVo = {}
    stuHomeworkVo.studentId = studentId
    stuHomeworkVo.homeworkId = homeworkId
    stuHomeworkVo.stuAnswerQuestionList = []
    questionInfos.forEach((value, index) => {
        let obj = {
            questionVo: {
                questionId: value.questionId,
            }
        }
        switch (value.type) {
            case 0:
                obj.questionVo.questionType = "SINGLE"
                obj.studentAnswer = value.studentAnswer
                break
            case 1:
                obj.questionVo.questionType = "MULTIPLE"
                obj.studentAnswer = value.studentAnswer
                break
            case 2:
                obj.questionVo.questionType = "FILL_IN_BLANK"
                obj.studentAnswer = value.studentAnswer
                break
            case 3:
                obj.questionVo.questionType = "COMPREHENSIVE"
                obj.studentAnswer = value.studentAnswer
                obj.submitFileId = value.studentPictureAnswers
                break
            default:
                break
        }
        stuHomeworkVo.stuAnswerQuestionList.push(obj)
    })
    console.log("stuHomeworkVo", stuHomeworkVo)
    return requests({
        url: "/homework/student",
        method: "post",
        data: stuHomeworkVo
    })
}
