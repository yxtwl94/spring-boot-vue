import request from '@/utils/request'
// 编辑用户信息
export function editUser(data){
    return request({
        url: '/editUser', // url在封装的时候指定了base url: 'api'
        method: 'put',
        data
    })
}

// 获取总用户数量(模糊查询)
export function getUserNum(username){
    return request({
        url: '/userNum', // url在封装的时候指定了base url: 'api'
        method: 'get',
        params:{
            "username": username,
        }
    })
}

// 获取分页用户(模糊查询)
export function getUserPage(username, cur, size){
    return request({
        url: '/getUserPage', // url在封装的时候指定了base url: 'api'
        method: 'get',
        params:{
            "username": username,
            "cur":cur,
            "size": size
        }
    })
}

// 获取分页用户(模糊查询)
export function getOneUser(username){
    return request({
        url: '/getOneUser', // url在封装的时候指定了base url: 'api'
        method: 'get',
        params:{
            "username": username,
        }
    })
}

// 删除用户
export function deleteUser(username){
    return request({
        url: '/deleteUser', // url在封装的时候指定了base url: 'api'
        method: 'DELETE',
        params:{
            "username":username,
        }
    })
}


