import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from "@/views/MainView";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import MainComp from "@/components/MainComp";
import ProfileComp from "@/components/ProfileComp";
import CSVTool from "@/components/CSVTool";
import PermissionComp from "@/components/PermissionComp";
import Error403Comp from "@/components/Error403Comp";
import MapTool from "@/components/MapTool";
import ChatComp from "@/components/ChatComp";
import LiveComp from "@/components/LiveComp";

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
        path: '/csvTool',
        name: 'csvTool',
        meta: { title: 'csvTool' },
        component: CSVTool
      },
      {
        path: '/mapTool',
        name: 'mapTool',
        meta: { title: 'mapTool' },
        component: MapTool
      },
      {
        path: '/chat',
        name: 'chat',
        meta: { title: 'chat' },
        component: ChatComp
      },
      {
        path: '/live',
        name: 'live',
        meta: { title: 'live' },
        component: LiveComp
      },
      {
        path: '/profile',
        name: 'profile',
        meta: { title: 'profile' },
        component: ProfileComp
      },
      {
        path: '/permission',
        name: 'permission',
        meta: { title: 'permission' },
        component: PermissionComp
      },
      {
        path: '/403',
        name: '403',
        meta: { title: '403' },
        component: Error403Comp
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
