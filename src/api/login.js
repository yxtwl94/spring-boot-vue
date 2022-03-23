
import request from '@/utils/request'

export function login(data){
    return request({
        url: '/login', // url在封装的时候指定了base url: 'api'
        method: 'post',
        data
    })
}

export function logout(){
    return request({
        url: '/logout', // url在封装的时候指定了base url: 'api'
        method: 'GET'
    })
}

export function getUserInfo(){
    return request({
        url: '/getUserInfo',
        method: 'GET'
    })
}

export function register(data){
    return request({
        url: '/register',
        method: 'POST',
        data
    })
}


