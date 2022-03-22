import router from './router'
import store from "@/store";
import NProgress from 'nprogress' // progress bar,浏览器上边的进度条
import 'nprogress/nprogress.css'
import {getUserInfo} from "@/api/login";
import {Message} from "element-ui";


// 路由拦截器，和请求拦截器是两个东西
router.beforeEach( (to, from, next) => {
    console.log("在这里做权限判断,一般是请求一个token")
    NProgress.start()
    if (to.meta['title'] === 'login'){  // 如果请求登录页面直接请求
        next()
        NProgress.done()
    } else {
        // 根据token获取用户信息(token会自动加到header上所以不需要传入)
        getUserInfo().then((res)=>{
            // console.log("获取到用户信息", res.data)
            const nickname = res.data.data.nickname
            // 存入全局变量store里
            store.commit("setNickName", nickname)
            next()
            NProgress.done()
        }).catch(()=>{
            Message({
                message: '获取用户信息失败，请重新登陆',
                type: 'warning',
                duration: 5*1000
            })
            next({path:'/login'})
            NProgress.done()
        })
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
