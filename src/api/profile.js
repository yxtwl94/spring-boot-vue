import request from '@/utils/request'

export function editUser(data){
    return request({
        url: '/editUser', // url在封装的时候指定了base url: 'api'
        method: 'put',
        data
    })
}

export function getUserNum(){
    return request({
        url: '/userNum', // url在封装的时候指定了base url: 'api'
        method: 'get'
    })
}
