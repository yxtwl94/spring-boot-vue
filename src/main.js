import Vue  from 'vue'
import store from './store'//引入store, vuex
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'  // 全局样式
import './permission'  // 权限配置
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(ElementUI)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
