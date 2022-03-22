import axios from 'axios'
import { Message } from 'element-ui'
// import {verifyToken} from "@/api/login";
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: '/api', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
   config =>{
       // 请求之前在这里处理，把cookie的user_token加到header里
       // 添加token到请求头
       const cookies = document.cookie  // _ga=GA1.1.1053150339.1601784951; user_token=user_token_value
       // 1、分割cookie
       const cookie_array = cookies.split(";")
       let token = ""
       // 2、获取user_token值
       for (let i = 0; i < cookie_array.length; i++) {
           let key = cookie_array[i].split("=")[0].trim()  // 去除空白字符
           let value = cookie_array[i].split("=")[1]
           if (key === "user_token"){
               token = value.trim()
               break
           }
       }
       config.headers['user_token'] = token
       return config;
   },
   error => {
       // 请求失败在这里处理
       console.log("API请求失败",error);
       return Promise.reject(error)
   },

)

// 响应拦截器
service.interceptors.response.use(
    response=>{
        const res = response.data;
        // 如果返回code不是200，则弹错误提示
        if (res.code !== 200){
            Message({
                message: "【API】" + res.message || '【API】Error',
                type: 'error',
                duration: 5*1000
            })
        }
        return response;
    },
    error => { // for debug
        Message({
            message: error.response.data.message || "【API】服务器异常",
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error) //接口500抛出异常（不走页面逻辑）
    }
)
export default service