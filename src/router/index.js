// 用于创建整个应用的路由器

import {checkState, getExamQuestion} from "@/api";
import addQuestions from "@/pages/Dashboard/addQuestions";
import correctedQuestion from "@/pages/Dashboard/course/correctedQuestion";
import correctPaper from "@/pages/Dashboard/course/correctPaper";
import course from "@/pages/Dashboard/course/course";
import examTest from "@/pages/Dashboard/examTest";
import homeworkTest from "@/pages/Dashboard/homeworkTest";
import dashboard from "@/pages/Dashboard/index";
import message from "@/pages/Dashboard/message";
import personInfo from "@/pages/Dashboard/personInfo";
import pick from "@/pages/Dashboard/pick";
import postExam from "@/pages/Dashboard/postExam";
import homeworkList from "@/pages/Dashboard/course/homeworkList";
import todo from "@/pages/Dashboard/todo";
import CertainExam from "@/pages/exams/CertainExam";
import HomeIndex from "@/pages/Home/index";
import login from "@/pages/login";
import notfound from "@/pages/notfound";
import register from "@/pages/register";
import Exams from "@/pages/studentPage/Exams";
import Test from "@/pages/Test/index";
import test1 from "@/pages/Test/test1";
import test2 from "@/pages/Test/test2";
import test3 from "@/pages/Test/test3";
import test4 from "@/pages/Test/test4";
import test5 from "@/pages/Test/test5";
import test6 from "@/pages/Test/test6";
import test997 from "@/pages/Test/test997";
import test998 from "@/pages/Test/test998";
import test999 from "@/pages/Test/test999";
import chooseQue from "@/pages/Test/chooseQue"
import BarChart from "@/pages/exams/BarChart"
import VueRouter from "vue-router";
import StudentExam from "@/pages/exams/StudentExam";
import zjptest from "@/pages/Test/MyAccount";
import MyAccount from "@/pages/Test/MyAccount";
import testStudentList from "@/pages/Test/testStudentList";
import testHomeWork from "@/pages/Test/testHomework";
import CommentSection from "@/pages/Test/CommentSection";
import OthersInfo from "@/pages/Test/OthersInfo";
import testHomeworkInfo from "@/pages/Test/testHomeworkInfo";
import testHomeworkFeedback from "@/pages/Test/testHomeworkFeedback";
import homeworkFeedback from "@/pages/Dashboard/course/homeworkFeedback";
import testLogin from "@/pages/Test/testLogin";
import testCorrectPaper from "@/pages/Test/testCorrectPaper";
import commentSection from "@/pages/Dashboard/commentSection";
import homeworkListOfStudent from "@/pages/Dashboard/studentHomeworkList/homeworkListOfStudent";
import studentList from "@/pages/Dashboard/course/studentList";
import homeworkListOfStudentOfCourse from "@/pages/Dashboard/course/homeworkListOfStudentOfCourse";


// 创建一个路由器 并暴露
const router = new VueRouter({
    routes: [
        {
            path: "/",
            name: "login",
            component: login,
        },
        {
            path: "/register",
            name: "register",
            component: register,
        },
        {
            path: "/homeIndex",
            name: "HomeIndex",
            component: HomeIndex
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            component: dashboard,
            children: [{
                path: "/dashboard",
                redirect: "/dashboard/todo"
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
                    name: "homeworkListOfStudent",
                    path: "/dashboard/homeworkListOfStudent",
                    component: homeworkListOfStudent,
                    props: true
                },
                {
                    name: "addQuestion",
                    path: "/dashboard/addQuestion",
                    component: addQuestions,
                    props: true
                },
                {
                    name: "correctPaper",
                    path: "/dashboard/correctPaper",
                    component: correctPaper,
                    props: true
                },
                {
                    name: "homeworkList",
                    path: "/dashboard/homeworkList",
                    component: homeworkList,
                    props: true,
                },
                {
                    name: "correctedQuestion",
                    path: "/dashboard/correctedQuestion",
                    component: correctedQuestion,
                    props: true
                },
                {
                    name: "todo",
                    path: "/dashboard/todo",
                    component: todo,
                },
                {
                    path: "/dashboard/course",
                    component: course
                },
                {
                    path: "/dashboard/personinfo",
                    component: personInfo,
                    name: "personInfo"
                },
                {
                    path: "/dashboard/postExam",
                    component: postExam,
                    name: "postExam",
                    props: true
                },
                {
                    name: 'studentExam',
                    path: '/dashboard/studentExam',
                    props: true,
                    component: StudentExam,
                },
                {
                    name: "CertainExam",
                    path: '/dashboard/exam',
                    component: CertainExam,
                    props: true
                },
                {
                    name: "homeworkFeedback",
                    path: '/dashboard/homeworkFeedback',
                    component: homeworkFeedback,
                    props: true
                },
                {
                    name: "commentSection",
                    path: '/dashboard/commentSection',
                    component: commentSection,
                    props: true
                },
                {
                    path: "/homeworkTest",
                    name: "/dashboard/homeworkTest",
                    component: homeworkTest,
                    props: true
                },
                {
                    name: "studentList",
                    path: '/dashboard/studentList',
                    component: studentList,
                    props: true
                },
                {
                    name: "homeworkListOfStudentOfCourse",
                    path: '/dashboard/homeworkListOfStudentOfCourse',
                    component: homeworkListOfStudentOfCourse,
                    props: true
                },
            ]
        },
        {
            path: "/test",
            name: "Test",
            component: Test,
            children: [
                {
                    path: "/chooseQue",
                    component: chooseQue
                },
                {
                    path: "/test2",
                    component: test2
                },
                {
                    path: "/test1",
                    component: test1
                },
                {
                    path: "/test3",
                    component: test3
                },
                {
                    path: "/test997",
                    component: test997
                },
                {
                    path: "/test998",
                    component: test998
                },
                {
                    path: "/test999",
                    component: test999
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
                    name: todo
                },
                {
                    path: "/examlist/:courseId",
                    component: Exams
                },
                {

                    path: '/exam/:examId',
                    component: CertainExam
                },
                {
                    name: 'studentExam',
                    path: '/studentExam',
                    props: true,
                    component: StudentExam,
                },
                {

                    path: "/test4",
                    component: test4
                },
                {
                    path: "/test5",
                    component: test5
                },
                {
                    path: "/test6",
                    component: test6
                },
                {
                    path: "/testStudentList",
                    component: testStudentList,
                    props: {
                        courseId: 1000
                    }
                },
                // {
                //     name: "testHomeWork",
                //     path: "/testHomeWork",
                //     component: testHomeWork,
                //     props: true
                // },
                {
                    path: "/OthersInfo",
                    component: OthersInfo,
                },
                {
                    name: "testHomeWork",
                    path: "/testHomeWork",
                    component: testHomeWork,
                    props: true
                },
                {
                    name: "testHomeworkInfo",
                    path: "/testHomeworkInfo",
                    component: testHomeworkInfo,
                    props: true
                },
                {
                    name: "testHomeworkFeedback",
                    path: "/testHomeworkFeedback",
                    component: testHomeworkFeedback,
                    props: true
                },
                {
                    path: "/MyAccount",
                    component: MyAccount
                },
                {
                    path: "/CommentSection",
                    component: CommentSection
                },
                {
                    path: "/OthersInfo",
                    component: OthersInfo
                },
                {
                    path:"/testCorrectPaper",
                    component: testCorrectPaper
                },
            ]
        },
        {
            path: "/examTest",
            name: "examTest",
            component: examTest,
        },
        {
            name: "testLogin",
            path: "/testLogin",
            component: testLogin
        },
        {
            path: "/:catchAll(.*)",
            name: "notFound",
            component: notfound
        },


    ]
})

//配置全局路由guard,每次路由切换之前被调用
router.beforeEach((to, from, next) => {
    //如果进入dashboard
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
                    next("/dashboard/todo")
                } else {
                    next()
                }
            })
            .catch((err) => {
                console.error(err)
                next({name: "notFound"})
            })
    } else if (to.name === "examTest") {
        getExamQuestion().then((res) => {
            if (res.code === 100) {
                next()
            } else {
                next("/notFound")
            }
        }).catch((err =>
                next("/notFound")
        ))
    } else {
        next()
    }

})

export default router