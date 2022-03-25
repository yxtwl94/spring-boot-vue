<template>
  <div class="profile">
    <el-main>
      <el-dialog
          title="提示"
          :visible.sync="showDialog"
          width="30%"
          :before-close="handleClose">

        <span>
          昵称:
        </span>
        <el-input v-model="nickname" placeholder="请输入内容" style="width: 150px"></el-input>

        <span slot="footer" class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户信息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="edit">操作</el-button>
        </div>
        <div class="item">
          用户名： {{this.$store.state.username}}
        </div>
        <div class="item">
          昵称： {{this.$store.state.nickname}}
        </div>
        <div class="item">
          权限： {{this.$store.state.role}}
        </div>
      </el-card>
    </el-main>
  </div>
</template>

<script>
import {editUser} from "@/api/profile";
import {Message} from "element-ui";
import store from "@/store";

export default {
  name: "ProfileComp",
  methods:{
    handleClose(){
      this.nickname = this.$store.state.nickname
      this.showDialog = false
    },
    edit(){
      this.showDialog = true
    },
    close(){
      this.nickname = this.$store.state.nickname
      this.showDialog = false
    },
    submit(){
      const json = {
        "username": this.username,
        "nickname": this.nickname,
      }
      editUser(json).then(
        (res)=> {
          if (res.data.code === 200){
            Message({
              message: '修改成功',
              type: 'success',
              duration: 5*1000
            })
            store.commit("setNickName", this.nickname)
          } else{
            if (res.data.code === 403){
              Message({
                message: '修改失败，权限认证失败',
                type: 'warning',
                duration: 5*1000
              })
            }
          }
          this.showDialog = false
        }).catch(
          ()=>{
            Message({
              message: '操作失败，请重试',
              type: 'error',
              duration: 5*1000
            })
            this.showDialog = false
          }
      )

    },
  },
  data(){
    return{
      showDialog: false,
      nickname: this.$store.state.nickname
    }
  }
}
</script>

<style scoped>
.item {
  margin-bottom: 18px;
  margin-left: 0px;
}
.box-card {
  width: 480px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
</style>
