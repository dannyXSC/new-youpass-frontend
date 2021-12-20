// 用于创建整个应用的路由器
import VueRouter from "vue-router";

import HomeIndex from "@/pages/Home/index"

import Test from "@/pages/Test/index"
import test1 from "@/pages/Test/test1";
import test2 from "@/pages/Test/test2";
import test3 from "@/pages/Test/test3";
import examTest from "@/pages/Test/examTest";

// 创建一个路由器 并暴露
const router = new VueRouter({
    routes: [
        {
            path: "/",
            name: "HomeIndex",
            component: HomeIndex
        },
        {
            path: "/test",
            name: "Test",
            component: Test,
            children: [
                {
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
                }
            ]
        },
        {
            path: "/examTest",
            name: "examTest",
            component: examTest,
        },
        
    ]
})

//配置全局路由guard
router.beforeEach((to, from, next) => {
    //放行
    next()
})

export default router