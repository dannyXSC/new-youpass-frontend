// 该文件用于创建Vuex中最核心的store

import { addQuestions, checkState, courseGetExam, deleteSession, getAllInfo, getExamQuestion, getImage, login, manualCorrect, postAnswer, postExam, quit, searchCourse1, searchCourse2, searchCourse3, setSession, signUp } from "@/api/index";
import router from "@/router";
import Vue from 'vue';
//引入Vuex
import Vuex from "vuex";

Vue.use(Vuex)

const global = {
    namespaced: true,
    // 准备action---用于响应组件中的动作
    actions: {
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
        login(context, data) {
            login(data).then(res => {
                if (res.code == '100') {
                    context.commit("SETUSERID", data.id)
                    router.push("/dashboard/todo");
                } else {
                    alert("账号密码错误，请重新输入！")
                }
             }).catch(err => { console.log(err) })
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
        getInfo(context, data) {
            console.log("用户的id为：", data)
            getAllInfo(data).then((res) => {
                console.log("getInfo被调用", res)
                context.commit("SETINFO", res);
            }).catch((err =>
                alert(err)
            ))
        },
        searchCourse1(context, data) {
            searchCourse1(data).then(res => {
                if (res.data.length != 0) {
                    context.commit("UPDATECOURSE", res);
                } else {
                    alert("未检索到相关课程信息！");
                }
            }).catch(err => {
                alert("未检索到相关课程信息！");
            })
        },
        searchCourse2(context, data) {
            searchCourse2(data).then(res => {
                if (res.data.length != 0) {
                    context.commit("UPDATECOURSE", res);
                } else {
                    alert("未检索到相关课程信息！");
                }
            }).catch(err => {
                alert("未检索到相关课程信息！");
            })
        },
        searchCourse3(context, data) {
            searchCourse3(data).then(res => {
                if (res.data.length != 0) {
                    context.commit("UPDATECOURSE", res);
                } else {
                    alert("未检索到相关课程信息！");
                }
            }).catch(err => {
                alert("未检索到相关课程信息！");
            })
        },
        setSession(context, data) {
            setSession(data).then((res) => {
                if (res.code == '100') {
                    context.commit("SETEXAMSESSION");
                    window.location.href="/#/examTest"
                }
                else {
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
                router.push({ name: "HomeIndex" });
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
                context.commit("COMPLETE", res)
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
            console.log("发布考试被执行了",data)
            postExam(data).then(res => {
                console.log(res)
                if (res.code == '100') {
                    
                    alert('发布考试成功！')
                    router.push({ name: "teacherExam" });
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
        SETINFO(state, res) {
            state.id = res.data.userInfo.id;
            state.email = res.data.userInfo.email;
            state.location = res.data.userInfo.location;
            state.name = res.data.userInfo.name;
            state.accountType = res.data.userInfo.type;
            state.courseListStu = res.data.courseListStu;
            state.courseListTea = res.data.courseList;
            state.examList = res.data.examList;
            state.messageList = res.data.noticeInfoSet
        },

        UPDATECOURSEEXAM(state,res) {

        },

        UPDATECOURSE(state,res) {
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
        SETCURRENTEXAM(state,data) {
            state.currentExam = data;
            console.log("yyy",state.currentExam)
        },
        SETCURRENTCOURSEID(state,data){
            state.currentCourseId=data;
            console.log("xxx",state.currentCourseId)
        }
    },
    // 准备state---用于存储数据

    state:{
            register: false,
            loginSuccess:false,
            id:0,
            accountType:1,
            location:"",
            email:"",
            isLogin: false,
            name: "",
            courseListStu:[],
            courseListTea:[],
            examList:[],
            searchedCourse:[],
            type:0,
            isTesting:false,
            questionList:[],
            ansList:[],
            messageList: [],
            imageInfo:"",
            currentExam:"",
            currentCourseId:"",
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