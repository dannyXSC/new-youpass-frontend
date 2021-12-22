// 用于创建整个应用的路由器
import {checkState} from "@/api";
import CertainExam from "@/pages/exams/CertainExam";
import dashboard from "@/pages/Dashboard/index";
import HomeIndex from "@/pages/Home/index";

import notfound from "@/pages/notfound";

import examTest from "@/pages/Dashboard/examTest";

import Test from "@/pages/Test/index";
import login from "@/pages/login";
import message from "@/pages/Dashboard/message";
import pick from "@/pages/Dashboard/pick";
import register from "@/pages/register";
import course from "@/pages/Dashboard/course";
import test2 from "@/pages/Test/test2";
import test3 from "@/pages/Test/test3";
import test4 from "@/pages/Test/test4";

import todo from "@/pages/Dashboard/todo";
import VueRouter from "vue-router";
import addQuestions from "@/pages/Dashboard/addQuestions";
import Exams from "@/pages/studentPage/Exams"

// 创建一个路由器 并暴露
const router = new VueRouter({
    routes: [{
        path: "/",
        name: "HomeIndex",
        component: HomeIndex
    },
        {
            path: "/dashboard",
            name: "Dashboard",
            component: dashboard,
            children: [
                {
                    path: "/dashboard",
                    component: todo,
                    name: todo
                },
                {
                    path: "/dashboard/pick",
                    component: pick
                },
                {
                    path: "/dashboard/message",
                    component: message
                },
                {
                    path: "/dashboard/addQuestion",
                    component: addQuestions
                },
                // {
                //     path: "/dashboard/todo",
                //     component: todo,
                //     name:todo
                // },
                {
                    path: "/dashboard/course",
                    component: course
                },
            ]
        },
        {
            path: "/test",
            name: "Test",
            component: Test,
            children: [
                {
                    path: "/test2",
                    component: test2
                },
                {
                    path: "/test3",
                    component: test3
                },
           
                {
                    path: "/pick",
                    component: pick
                },
                {
                    path: "/message",
                    component: message
                },
                {
                    path: "/todo",
                    component: todo,
                    name:todo
                },
                {
                    path:"/examlist/:courseId",
                    component: Exams
                },
                {
                    path:'/exam/:examId',
                    component: CertainExam
                  },
                {
                    path: "/test4",
                    component: test4
                },

            ]
        },
        {
            path: "/examTest",
            name: "examTest",
            component: examTest,
        },
        {
            path: "/login",
            name: "login",
            component: login,
        },
        {
            path: "/register",
            name: "register",
            component: register,
        },
        {
            path: "/:catchAll(.*)",
            name: "notFound",
            component: notfound
        }


    ]
})

//配置全局路由guard,每次路由切换之前被调用
router.beforeEach((to, from, next) => {
    //已经登录的情况已经在checkState中处理了

    //没如果进入dashboard
    if (to.matched.filter(value => {
        return value.name === "Dashboard"
    }).length) {
        checkState()
            .then((res) => {
                if (res.code === 100) {
                    next()
                } else {
                    next({name: "notFound"})
                }
            })
            .catch((err) => {
                console.error(err)
                next({name: "notFound"})
            })
    }
    //进入login
    else if (to.matched.filter(value => {
        return value.name === "login"
    }).length) {
        checkState()
            .then((res) => {
                if (res.code === 100) {
                    console.log("123")
                    next({name: "Dashboard"})
                } else {
                    next()
                }
            })
            .catch((err) => {
                console.error(err)
                next({name: "notFound"})
            })
    } else {
        next()
    }

})

export default router