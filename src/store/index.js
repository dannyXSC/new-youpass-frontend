// 该文件用于创建Vuex中最核心的store

import { checkState, getAllInfo, login, signUp } from "@/api/index"
import Vue from 'vue'
//引入Vuex
import Vuex from "vuex"

Vue.use(Vuex)

const global = {
    namespaced:true,
    // 准备action---用于响应组件中的动作
    actions: {
        register(context, data) {
            console.log("connect!")
            signUp(data).then(res => { console.log(res.msg) }).catch(err => { console.log(err) })
        },
        login(context, data) {
            console.log("connect!", data)
            login(data).then(res => {
                context.commit("LOGINSUCESS");
            }).catch(err=>{
                console.log(err)
            })
        },
        checkState(context) {
            checkState().then(res => {       
                if (res.code == '100') {
                    context.commit("CHANGELOGINSTATE");
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getInfo(context, data){
            console.log("connect!", data)
            getAllInfo(data).then((res)=>{
                context.commit("SETINFO", res);
            }).catch((err => 
                alert(err)
                ))
        }
    },
    // 准备mutations---用于操作数据
    mutations:{
        CHANGELOGINSTATE(state) {
            state.isLogin = true;
        },
        LOGINSUCESS(state) {
            state.loginSuccess = true;
        },
        SETINFO(state, res){
            console.log(res);
            state.id = res.data.userInfo.id;
            state.email = res.data.userInfo.email;
            state.location = res.data.userInfo.location;
            state.name = res.data.userInfo.name;
            state.accountType = res.data.userInfo.type;
            state.courseList = res.data.courseList;
            state.examList = res.data.examList;
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
            courseList:null,
            examList:null,
            register:false
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