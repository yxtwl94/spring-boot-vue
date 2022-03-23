<template>
  <div class="register-page">
    <el-row>
      <el-image style="width: 100px; height: 100px" :src="require('../assets/logo.png')"></el-image>
    </el-row>
    <el-form status-icon
        :model="ruleForm" :rules="rules" ref="ruleForm"
        label-position="left" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" show-password></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="success" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {register} from "@/api/login";
import {Message} from "element-ui";

export default {
  name: "RegisterView",
  methods:{
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const user_json = {
            "username": this.ruleForm.username,
            "password": this.ruleForm.checkPass,
            "nickname": this.ruleForm.nickname
          }
          register(user_json).then((res)=>{
            console.log(res)
            Message({
              message: "注册成功",
              type: 'success',
              duration: 5 * 1000
            })
            this.$router.push("/login")
          }).catch(
              ()=>{
                Message({
                  message: "注册失败，请检查用户名",
                  type: 'error',
                  duration: 5 * 1000
                })
              }
          )
        } else {
          Message({
            message: "请确认输入",
            type: 'error',
            duration: 5 * 1000
          })
          return false;
        }
      });
    }
  },
  data(){
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback)=>{
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validateCheckPass = (rule, value, callback)=>{
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validateNickname = (rule, value, callback)=>{
      if (value === '') {
        callback(new Error('请输入昵称'));
      } else {
        callback();
      }
    };
    return{
      ruleForm:{
        username: "",
        password: "",
        checkPass: "",
        nickname: ""
      },
      rules:{
        username: [
          {required: true, message:"请输入用户名",trigger: 'blur', validator: validateUsername}
        ],
        password: [
          {required: true, message:"密码",trigger: 'blur', validator: validatePassword}
        ],
        checkPass: [
          {required: true, message:"请确认密码",trigger: 'blur',validator: validateCheckPass}
        ],
        nickname: [
          {required: true, message:"请输入昵称",trigger: 'blur',validator: validateNickname}
        ],


      }
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
</style>