import router from './router'
import store from "@/store";
import NProgress from 'nprogress' // progress bar,浏览器上边的进度条
import 'nprogress/nprogress.css'
import {getUserInfo} from "@/api/login";
import {Message} from "element-ui";

const whiteList = ['/login', '/register'] // 白名单，可以直接访问

// 路由拦截器，和请求拦截器是两个东西
router.beforeEach( (to, from, next) => {
    NProgress.start()

    if (whiteList.indexOf(to.path) !== -1){
        // 如果请求的是白名单的
        next()
        NProgress.done()
    } else {
        // 如果请求其他主页面，需要鉴权
        getUserInfo().then(
            (res)=>{
                store.commit("setNickName", res.data.data.nickname)
                store.commit("setUserName", res.data.data.username)
                store.commit("setRole", res.data.data.role)
                // 不用路由表，单独对这个进行权限管理
                if (to.path === "/permission"){
                    if (res.data.data.role === "admin"){
                        next()
                        NProgress.done()
                    } else{
                        next({path: '/403'})
                        NProgress.done()
                    }
                } else {
                    next()
                    NProgress.done()
                }
            }
        ).catch(
            ()=>{
                Message({
                    message: '获取用户信息失败，请重新登陆',
                    type: 'warning',
                    duration: 5*1000
                })
                next({path:'/login'})
                NProgress.done()
            }
        )
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
