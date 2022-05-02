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
                console.log(res)
                store.commit("setNickName", res.data.data.user.nickname)
                store.commit("setUserName", res.data.data.username)
                store.commit("setAuthorities", res.data.data.authorities)
                // 不用路由表，单独对这个进行权限管理
                if (to.path === "/permission"){
                    let auth = res.data.data.authorities
                    for (let i = 0; i < auth.length; i++) {
                        const curAuth = auth[i].authority
                        if (curAuth === "ROLE_admin") {
                            next()
                            NProgress.done()
                            return
                        }
                    }
                    // 如果没有权限，跳转到403页面
                    next({path: '/403'})
                    NProgress.done()

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
