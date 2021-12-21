//api写在这里 可以根据需要穿件文件夹
import requests from "@/utils/requests";

export const signUp=(data) => {
    return requests({
        url:'/account/signup',method:'post',data:data
    })
}

export const login = (postData)=>{
    console.log(postData)
    return requests({url:'/account/login',method:'post',data:postData})
}
export const checkState = ()=>{
    return requests({url:'/account/checkState',method:'get'})
}
export const getAllInfo = (postData)=>{
    return requests({url:'/account/getAllInfo',method:'get'})
}
export const searchCourse1 = (data)=>{
    return requests({url:'/course/getCourseById',method:'get', params:data})
}
export const searchCourse2 = (data)=>{
    return requests({url:'/course/getCourseByTitle',method:'get', params:data});
}
export const searchCourse3 = (data)=>{
    return requests({url:'/course/getCourseByTName',method:'get', params:data})
}



