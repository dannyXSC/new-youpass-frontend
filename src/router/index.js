// 用于创建整个应用的路由器
import VueRouter from "vue-router";

import HomeIndex from "@/pages/Home/index"

import Test from "@/pages/Test/index"

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
        },
    ]
})

//配置全局路由guard
router.beforeEach((to, from, next) => {
    //放行
    next()
})

export default router