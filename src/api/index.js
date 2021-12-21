//api写在这里 可以根据需要穿件文件夹
import requests from "@/utils/requests";

export const signUp=(data) => {
    return requests({
        url:'/account/signup',method:'post',data:data
    })
}