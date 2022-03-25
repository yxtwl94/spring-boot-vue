
import request from '@/utils/request'
// 登陆
export function login(data){
    return request({
        url: '/login', // url在封装的时候指定了base url: 'api'
        method: 'post',
        data
    })
}
// 登出
export function logout(){
    return request({
        url: '/logout', // url在封装的时候指定了base url: 'api'
        method: 'GET'
    })
}
// 鉴权
export function getUserInfo(){
    return request({
        url: '/getUserInfo',
        method: 'GET'
    })
}
// 注册
export function register(data){
    return request({
        url: '/register',
        method: 'POST',
        data
    })
}


