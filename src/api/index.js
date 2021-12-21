//api写在这里 可以根据需要穿件文件夹
import requests from "@/utils/requests";


export const test = (postData)=>{
    console.log(postData)
    return requests({url:'/account/login',method:'post',data:postData})
}

export const getAllInfo = (postData)=>{
    return requests({url:'/account/getAllInfo',method:'get'})
}


