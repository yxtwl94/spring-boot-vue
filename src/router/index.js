import Vue from 'vue'
import VueRouter from 'vue-router'
import SubPage from "@/components/SubPage";
import MainView from "@/views/MainView";
import MainPage from "@/components/MainPage";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainView,
    meta: { title: 'main-view' },
    children:[
      {
        path: '/main',
        name: 'main',
        meta: { title: 'main' },
        component: MainPage
      },
      {
        path: '/sub',
        name: 'sub',
        meta: { title: 'sub' },
        component: SubPage
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: 'login' },
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    meta: { title: 'register' },
    component: RegisterView
  },
]

const router = new VueRouter({
  routes
})

export default router
