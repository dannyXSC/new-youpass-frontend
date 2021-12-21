//api写在这里 可以根据需要穿件文件夹
import requests from "@/utils/requests";

export const signUp=(data) => {
    return requests({
        url:'/account/signup',method:'post',data:data
    })
}

export const test = (postData)=>{
    console.log(postData)
    return requests({url:'/account/login',method:'post',data:postData})
}


