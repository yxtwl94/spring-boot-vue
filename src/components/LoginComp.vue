<template>
  <div class="login-page">
    <el-row>
      <el-image style="width: 100px; height: 100px" :src="require('../assets/logo.png')"></el-image>
    </el-row>

    <el-row>
      <el-input v-model="username" placeholder="请输入用户名"></el-input>
    </el-row>

    <el-row>
      <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
    </el-row>

    <el-row style="display: flex;width: 100%;flex-direction: row;justify-content: space-between;">
      <el-button type="success" @click="register">注册</el-button>
      <el-button type="primary" @click="login">登录</el-button>
    </el-row>
  </div>
</template>

<script>
import {login} from "@/api/login";
import {Message} from "element-ui";

export default {
  name: "LoginComp",
  data(){
    return{
      username: "",
      password: ""
    }
  },
  methods:{
    register(){
      const _this = this;
      _this.$router.push('/register')
    },
    login(){
      // 通过api封装了方法
      const _this = this
      // 请求的用户体
      const user_json = {
        "username": _this.username,
        "password": _this.password
      }
      // loading开始
      _this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      login(user_json).then( (res)=>{
        //  用用户名密码请求token
        if (res.data.code === 200){
          // expire 为0代表回话有效期
          _this.$cookies.set("user_token", res.data.data, 0)
          _this.$router.push('/main')
          // loading结束
          _this.$loading().close();
        } else {
          Message({
            message: '登陆失败，用户密码错误',
            type: 'error',
            duration: 5*1000
          })
          // loading结束
          _this.$loading().close();
        }
      }).catch(
          () =>{
            Message({
              message: '登陆失败，请重新登陆',
              type: 'warning',
              duration: 5*1000
            })
            // loading结束
            _this.$loading().close();
          }

      )
    }
  }
}
</script>

<style scoped>
.login-page{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-input{
  padding: 10px;
  width: 300px;
}

</style>
