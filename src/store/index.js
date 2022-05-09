// 该文件用于创建Vuex中最核心的store

import {
    addQuestions,
    checkState,
    deleteSession,
    getBasicInfo,
    getExamQuestion,
    getImage,
    getStuCourseExamScore,
    login,
    manualCorrect,
    postAnswer,
    postExam,
    quit,
    searchCourse1,
    searchCourse2,
    searchCourse3,
    setSession,
    signUp
} from "@/api/index";
import router from "@/router";
import Vue from 'vue';
//引入Vuex
import Vuex from "vuex";
import { Promise } from "es6-promise";

Vue.use(Vuex)

const global = {
    namespaced: true,
    // 准备action---用于响应组件中的动作
    actions: {
        getBasicInfo(context, data) {
            return new Promise((resolve, reject) => {
                getBasicInfo(data).then((res) => {
                    if (res.code === 100)
                        context.commit("SETINFO", res);
                    resolve(res);
                }).catch((err => reject(err)))
            })
        },
        login(context, data) {
            return new Promise((resolve, reject) => {
                login(data).then(res => {
                    if (res.code === 100)
                        context.commit("SETID", data.id)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },


        /*弃用*/
        register(context, data) {
            console.log(data)
            console.log("进入register!")
            signUp(data).then(res => {
                console.log(res.code)
                if (res.code == '100') {
                    alert("注册成功！您的id为：" + res.data)
                    router.push({ name: "login" })
                } else if (res.code == '1') {
                    alert("该邮箱已经被注册过！")
                }
            }).catch(err => {
                console.log(err)
            })
        },
        checkSession(context) {
            checkState().then(res => {
                if (res.code == '100') {
                    sessionStorage.setItem("key", "token");
                }
            }).catch(err => {
                console.log(err)
            })
        },
        setSession(context, data) {
            setSession(data).then((res) => {
                if (res.code == '100') {
                    context.commit("SETEXAMSESSION");
                    window.location.href = "/#/examTest"
                } else {
                    alert(res.code + "没有考试权限");
                }
            }).catch((err =>
                alert(err)
            ))
        },
        getExamQuestion(context) {
            getExamQuestion().then((res) => {
                console.log(res)
                context.commit("SETEXAMINFO", res);
            }).catch((err =>
                alert(err)
            ))
        },
        postAnswer(context, data) {
            postAnswer(data).then((res) => {
                console.log(res.code);
            }).catch((err =>
                alert(err)
            ))
        },
        getStuCourseExamScore(context, courseId) {
            getStuCourseExamScore(courseId).then((res) => {
                console.log(res.code);
            }).catch((err =>
                alert(err)
            ))

        },
        deleteSession(context) {
            deleteSession().then((res) => {
                console.log(res.code);
            }).catch((err =>
                alert(err)
            ))
        },
        logout(context) {
            quit().then(res => {
                sessionStorage.removeItem("key");
                router.push({ name: "login" });
            })
        },
        uploadQuestions(context, data) {
            addQuestions(data).then((res) => {
                context.commit("COMPLETE", res)
            }).catch((error) => {
                alert(error)
            })
        },

        manualCorrect(context, data) {
            manualCorrect(data).then((res) => {
                if (res.code !== 100) {
                    alert(res.msg)
                } else {
                    console.log(data)
                    router.push({
                        name: "correctedQuestion",
                        params: {
                            courseId: data.courseId,
                            examId: data.examId
                        }
                    })
                }
            }).catch((error) => {
                alert(error)
            })
        },
        getImage(context) {
            console.log("获取照片")
            getImage().then(res => {
                if (res.code == '100') {
                    var blob = res.data
                }
            })
        },
        submitExam(context, data) {
            console.log("发布考试被执行了", data)
            postExam(data).then(res => {
                console.log(res)
                if (res.code == '100') {
                    alert('发布考试成功！')
                    router.push({ name: "todo" });
                }
            })
        },
        getCourseExam(context, CourseId) {
            courseGetExam(CourseId).then(res => {
                if (res.code == '100') {
                    var blob = res.data
                    console.log(res);
                }
            })
        }
    },
    // 准备mutations---用于操作数据
    mutations: {
        SETID(state, id) {
            state.id = id;
            return 1
        },
        SETINFO(state, res) {
            state.id = res.data.id;
            state.name = res.data.name;
            state.accountType = res.data.type;
            // state.email = res.data.userInfo.email;
            // state.location = res.data.userInfo.location;
             //state.courseListStu = res.data.courseListStu;
            // state.courseListTea = res.data.courseList;
            // state.examList = res.data.examList;
            // state.messageList = res.data.noticeInfoSet
        },






        /*弃用*/
        UPDATECOURSEEXAM(state, res) {

        },

        UPDATECOURSE(state, res) {
            state.searchedCourse = res.data;
            console.log(state.searchedCourse);
        },
        SETSTUDENTTYPE(state, type) {
            state.type = type;
        },
        SETTEACHERTYPE(state, type) {
            state.type = type;
        },
        SETUSERID(state, userId) {
            state.id = userId;
        },
        COMPLETE(state, res) {
            if (res.code !== 100) {
                alert(res.msg)
            }
            router.push("/dashboard")
        },
        SETEXAMINFO(state, res) {
            console.log("exam", res);
            state.questionList = res.data.questionList;
            console.log(state.questionList);

            var answerList = [];
            for (var a = 0; a < state.questionList.length; a++) {
                if (!state.questionList[a].done) {
                    answerList[a] = [];
                } else {
                    if (state.questionList[a].type > 1) {
                        answerList[a] = state.questionList[a].fill_content;
                    } else {
                        answerList[a] = state.questionList[a].multiList;
                    }
                }
                state.ansList = answerList;
            }
        },
        SETEXAMSESSION(state) {
            state.isTesting = true;
        },
        SETCURRENTEXAM(state, data) {
            state.currentExam = data;
            console.log("yyy", state.currentExam)
        },
        SETCURRENTCOURSEID(state, data) {
            state.currentCourseId = data;
            console.log("xxx", state.currentCourseId)
        }
    },
    // 准备state---用于存储数据

    state: {
        id: 0,
        name: "",
        accountType: 0,

        /*弃用*/
        register: false,
        loginSuccess: false,
        location: "",
        email: "",
        isLogin: false,
        courseListStu: [],
        courseListTea: [],
        examList: [],
        searchedCourse: [],
        type: 0,
        isTesting: false,
        questionList: [],
        ansList: [],
        messageList: [],
        imageInfo: "",
        currentExam: "",
        currentCourseId: "",
    },
    // 准备getters---用于将state中的数据进行加工
    // 类似计算属性
    getters: {}
}

/*
 * 这里写import
 * */

//暴露store 并创建
export default new Vuex.Store({
    modules: {
        global,
    }
})
