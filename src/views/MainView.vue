<template>
  <div>
    <el-container>
      <el-aside>
        <el-menu :default-openeds="['1', '2']"
                 style="overflow-x: hidden"
                 background-color="rgb(48, 65, 86)"
                 router
                 class="el-menu-vertical"
                 :collapse="showFoldIcon"
                 text-color="#ffff">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-eleme"/>
              <span>导航1</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/main">Main</el-menu-item>
              <el-menu-item index="/sub">Sub</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-eleme"/>
              <span>管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/permission">用户权限</el-menu-item>
              <el-menu-item index="/sub">Sub</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-row style="width: 100%;display: flex;align-items: center;">
            <el-col :span="1">
              <div @click="fold" style="font-size: 25px;cursor:pointer; color: black">
                <i class="el-icon-s-fold" v-show="!showFoldIcon"></i>
                <i class="el-icon-s-unfold" v-show="showFoldIcon"></i>
              </div>
            </el-col>
            <el-col :span="22">
              <el-dropdown style="display: flex;flex-direction: row-reverse;" @command="handleCommand">
                <span class="el-dropdown-link">
                  {{this.$store.state.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {logout} from "@/api/login";

export default {
  name: "MainView",
  methods:{
    fold(){
      const _this = this;
      console.log(_this.showFoldIcon)
      _this.showFoldIcon = !_this.showFoldIcon;
    },
    handleCommand(cmd){
      const _this = this
      switch (cmd){
        case "logout":
          logout()
          _this.$router.push('/login')
          break
        case "profile":
          _this.$router.push('/profile')
          break
      }
    },
    logout(){

    },
  },
  data(){
    return{
      showFoldIcon: false
    }
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: whitesmoke;
  color: #ffff;
  text-align: center;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 5px
}
.el-main {
  background-color: #ffff;
  color: #3e71e0;
  text-align: center;
  padding: 10px;
}
.el-dropdown{
  height: 100%;
  font-size: large;
}
/*右上角头像*/
.el-dropdown-link {
  color: black;
  height: 100%;
  cursor:pointer;
}
.el-menu{
  height: 100vh;
  border-right: none;
}

/*设置选中el-menu-item时的样式*/
.el-menu-item:hover{
  color: #1787FB !important;
  background-color: black !important;
}
.el-menu-item{
  background-color: #333333 !important;
}
/*导航栏展开自定义宽度*/
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
