// 该文件用于创建Vuex中最核心的store

import { checkState, getAllInfo, login, searchCourse1, searchCourse2, searchCourse3, signUp, setSession, getExamQuestion } from "@/api/index";
import router from "@/router";
import Vue from 'vue';
//引入Vuex
import Vuex from "vuex";
Vue.use(Vuex)

const global = {
    namespaced:true,
    // 准备action---用于响应组件中的动作
    actions: {
        register(context, data) {
            console.log(data)

            console.log("进入register!")
            signUp(data).then(res => { 
                console.log(res.code)
                if (res.code == '100') {
                    alert("注册成功！您的id为：" + res.data)
                    router.push('/login')
                }
                else if (res.code=='1'){
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
                    router.push({name:"Dashboard"});
                }
                else {
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
        getInfo(context, data){
            console.log("connect!", data)
            getAllInfo(data).then((res) => {
                console.log("res!", res)
                context.commit("SETINFO", res);
            }).catch((err => 
                alert(err)
                ))
        },
        searchCourse1(context, data){
            searchCourse1(data).then(res => {       
                if (res.data.length != 0) {
                    context.commit("UPDATECOURSE", res);
                }
                else {
                    alert("未检索到相关课程信息！");
                }
            }).catch(err => {
                alert("未检索到相关课程信息！");
            })
        },
        searchCourse2(context, data){
            searchCourse2(data).then(res => {  
                if (res.data.length != 0) {
                    context.commit("UPDATECOURSE", res);
                }
                else {
                    alert("未检索到相关课程信息！");
                }
            }).catch(err => {
                alert("未检索到相关课程信息！");
            })
        },
        searchCourse3(context, data){
            searchCourse3(data).then(res => {       
                if (res.data.length != 0) {
                    context.commit("UPDATECOURSE", res);
                }
                else {
                    alert("未检索到相关课程信息！");
                }
            }).catch(err => {
                alert("未检索到相关课程信息！");
            })
        },
        setSession(context, data){
            setSession(data).then((res) => {
                if (res.code == '100') {
                    context.commit("SETEXAMSESSION");
                }
                else {
                    alert(res.code + "没有考试权限");
                }
            }).catch((err => 
                alert(err)
                ))
        },
        getExamQuestion(context){
            getExamQuestion().then((res) => {
                context.commit("SETEXAMINFO", res);
            }).catch((err => 
                alert(err)
                ))
        }
    },
    // 准备mutations---用于操作数据
    mutations:{
        SETINFO(state, res){
            state.id = res.data.userInfo.id;
            state.email = res.data.userInfo.email;
            state.location = res.data.userInfo.location;
            state.name = res.data.userInfo.name;
            state.accountType = res.data.userInfo.type;
            state.courseListStu = res.data.courseListStu;
            state.courseListTea = res.data.courseList;
            state.examList = res.data.examList;
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
            state.id = userId
        },
        SETEXAMINFO(state, res) {
            console.log("exam", res);
        },
        SETEXAMSESSION(state) {
            state.isTesting = true;
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
            register:false,
            searchedCourse:[],
            type:0,
            isTesting:false,
    },
    // 准备getters---用于将state中的数据进行加工
    // 类似计算属性
    getters:{
        
    }
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