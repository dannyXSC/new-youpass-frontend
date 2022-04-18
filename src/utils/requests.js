//对于axios 进行二次封装
import axios from "axios"
//引入进度条
import nprogress from "nprogress"
//引入进度条样式
import "nprogress/nprogress.css"

//1.利用axios对象的方法create去创建一个axios实例
//2.request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径中会出现api
    baseURL: "/api",
    //代表请求超市的时间5s
    timeout: 5000,
})

//请求拦截器，在发送请求之前，请求拦截器可以监测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    //config 配置对象，对象里面又一个属性很重要，header请求头
    //进度条开始动
    nprogress.start()
    return config
})

//响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数：服务器响应数据回来以后，响应拦截器可以监测到，可以做一些事情
    //进度条结束
    nprogress.done()

    let data = res.data
    data.msg = res.data.message || "错误"
    data.code = res.data.code === 200 ? 100 : res.data.code
    console.log(data)
    return res.data
}, (error) => {
    //响应失败的回调函数
    console.log(error)
    return Promise.reject(new Error('faile'))
})

export default requests;