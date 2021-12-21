// 该文件用于创建Vuex中最核心的store

import { checkState, login, signUp } from "@/api/index"
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
        }
    },
    // 准备mutations---用于操作数据
    mutations:{
        CHANGELOGINSTATE(state) {
            state.isLogin = true;
        },
        LOGINSUCESS(state) {
            state.loginSuccess = true;
        }
    },
    // 准备state---用于存储数据

      
    state:{
            isLogin: false,
            register: false,
            loginSuccess:false
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