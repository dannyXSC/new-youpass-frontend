// 用于创建整个应用的路由器
import HomeIndex from "@/pages/Home/index";
import examTest from "@/pages/Test/examTest";
import Test from "@/pages/Test/index";
import login from "@/pages/Test/login";
import message from "@/pages/Test/message";
import pick from "@/pages/Test/pick";
import register from "@/pages/Test/register";
import test1 from "@/pages/Test/test1";
import test2 from "@/pages/Test/test2";
import test3 from "@/pages/Test/test3";
import test4 from "@/pages/Test/test4";
import todo from "@/pages/Test/todo";
import VueRouter from "vue-router";


// 创建一个路由器 并暴露
const router = new VueRouter({
    routes: [{
            path: "/",
            name: "HomeIndex",
            component: HomeIndex
        },
        {
            path: "/test",
            name: "Test",
            component: Test,
            children: [{
                    path: "/test1",
                    component: test1
                },
                {
                    path: "/test2",
                    component: test2
                },
                {
                    path: "/test3",
                    component: test3
                },
                {
                    path: "/test4",
                    component: test4
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
                    component: todo
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

    ]
})

//配置全局路由guard,每次路由切换之前被调用
router.beforeEach((to, from, next) => {
    // console.log(to, from)
    //首先验证是否已经登录
    // let token = sessionStorage.getItem("key")
    // console.log(token)
    // if (token == 'token') {
    //     next(todo)
    // }
    // else {
    //         //除去注册和登录外都需要进行验证
    //     if (to.name != 'login' && to.name != 'register' &&to.name!='HomeIndex') {
        
    //         if (token=='token') {
    //             next()
    //         }
    //         else {
    //             // alert("请先登录！")
    //             next('/');
    //         }
    //     }
    //     else {
    //         next()
    //     }
    // }
    next()
    
  })

export default router