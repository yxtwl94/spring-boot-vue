<template>
  <div class="register-page">
    <el-row>
      <el-image style="width: 100px; height: 100px" :src="require('../assets/logo.png')"></el-image>
    </el-row>

    <el-row>
      <el-input v-model="username" placeholder="请输入用户名"></el-input>
    </el-row>

    <el-row>
      <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
    </el-row>
    <el-row>
      <el-input v-model="verifyPassword" placeholder="请确认密码" show-password></el-input>
    </el-row>

    <el-row>
      <el-input v-model="nickname" placeholder="请输入昵称"></el-input>
    </el-row>

    <el-row style="display: flex;width: 100%;flex-direction: row;justify-content: space-between;">
      <el-button type="success" @click="register">注册</el-button>
    </el-row>
  </div>
</template>

<script>
import {register} from "@/api/login";

export default {
  name: "RegisterView",
  methods:{
    register(){
      const user_json = {
        "username": this.username,
        "password": this.password,
        "nickname": this.nickname
      }
      register(user_json).then((res)=>{
        console.log(res)

      })
    }
  },
  data(){
    return{
      username: "",
      password: "",
      verifyPassword: "",
      nickname: ""
    }
  }
}
</script>

<style scoped>

.register-page{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333333;
  height: 100%;
  justify-content: center;
}
.el-input{
  padding: 10px;
  width: 300px;
}

</style>