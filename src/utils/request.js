import axios from 'axios'
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
       // 如果是登陆或者注册不要带token请求头，直接放行

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
       // 如果是login注册不需要带请求头
       if (config.url === '/login'  || config.url === '/register'){
           return config;
       } else {
           config.headers['user_token'] = token
           return config;
       }

   },
   error => {
       // 请求失败在这里处理
       console.error("【API请求失败】",error);
       return Promise.reject(error)
   },

)

// 响应拦截器
service.interceptors.response.use(
    response=>{
        const res = response.data;
        // 如果返回code不是200，则弹错误提示
        if (res.code !== 200){
            console.error("响应码不是200：",res)
        }
        return response;
    },
    error => {
        // for debug
        console.error("API响应错误信息：", error)
        return Promise.reject(error) //接口500抛出异常（不走页面逻辑）
    }
)
export default service
