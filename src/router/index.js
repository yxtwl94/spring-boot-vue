import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from "@/views/MainView";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import MainComp from "@/components/MainComp";
import ProfileComp from "@/components/ProfileComp";
import SubComp from "@/components/SubComp";

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
        component: MainComp
      },
      {
        path: '/sub',
        name: 'sub',
        meta: { title: 'sub' },
        component: SubComp
      },
      {
        path: '/profile',
        name: 'profile',
        meta: { title: 'profile' },
        component: ProfileComp
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
