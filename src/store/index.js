import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
//创建Store实例
const store = new Vuex.Store({
    // 存储状态值
    state: {
        nickname: "",
        username: "",
        authorities: []
    },
    // 状态值的改变方法,操作状态值
    // 提交mutations是更改Vuex状态的唯一方法
    mutations: {
        setNickName(state, nickname){
            state.nickname = nickname;
        },
        setUserName(state, username){
            state.username = username;
        },
        setAuthorities(state, authorities){
            state.authorities = authorities;
        },
    },
    // 在store中定义getters（可以认为是store的计算属性）。Getters接收state作为其第一个函数
    getters: {
    },
    actions: {
    }
})
// 要改变状态值只能通过提交mutations来完成
export default store;
