<template>
  <div>
    <el-input style="margin-bottom: 10px; margin-right:10px;width: 20%; float: left"
        placeholder="请输入用户名搜索"
        v-model="search_username"
        clearable>
    </el-input>
    <el-button type="primary" style="float: left" @click="searchUser">搜索</el-button>

    <el-table :data="userTableData" border stripe style="width: 100%">
      <el-table-column
          prop="username"
          label="用户名">
      </el-table-column>
      <el-table-column
          prop="nickname"
          label="昵称">
        <template slot-scope="scope">
          <el-input v-if="scope.row.isEdit"
                    v-model="scope.row.nickname"></el-input>
          <span v-else>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="role"
          label="权限">
        <template slot-scope="scope">
          <el-select v-if="scope.row.isEdit"
                    v-model="scope.row.role">
            <el-option
                v-for="item in roleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <span v-else>{{scope.row.role}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isEdit"
                     size="mini" type="success"
                     @click="submitEdit(scope.row)">确定</el-button>
          <el-button v-else style="margin-right: 10px"
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>

          <el-button v-if="scope.row.isEdit"
                     size="mini"
                     @click="cancel(scope.row)">取消</el-button>
          <el-popconfirm v-else @confirm="handleDelete(scope.row.username)"
              title="确定删除吗？">
            <el-button size="mini" type="danger"
                slot="reference">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userNum">
    </el-pagination>
  </div>
</template>

<script>
import {deleteUser, editUser, getUserNum, getUserPage} from "@/api/profile";

export default {
  name: "PermissionComp",
  mounted() {
    this.getTableData()
  },
  methods:{
    cancel(row){
      this.$set(row, 'isEdit', false)
    },
    submitEdit(row){
      const edit_user = {
        "username": row.username,  // 必须传入，作为唯一标识
        "nickname": row.nickname,
        "role": row.role
      }
      editUser(edit_user).then(
          (res)=>{
            console.log(res)
            this.getTableData()
            this.$set(row, 'isEdit', false)
            this.$store.commit("setRole", row.role)
            this.$store.commit("setNickName", row.nickname)
          }
      )
    },
    searchUser(){
      this.getTableData()
    },
    getTableData(){
      // 获取所有用户信息
      getUserPage(this.search_username, this.currentPage,this.pageSize).then(
          (res)=>{
            this.userTableData = res.data.data
          }
      )
      // 获取所有用户量
      getUserNum(this.search_username).then(
          (res)=>{
            console.log(res)
            this.userNum = res.data.data
          }
      )
    },
    handleEdit(row){
      this.$set(row, 'isEdit', true)
      console.log(row)
    },
    handleDelete(username){
      // 删除用户
      deleteUser(username).then(
          ()=>{
            this.getTableData()
          }
      )
    },
    handleCurrentChange(curPage){
      // 获取分页用户信息
      this.currentPage = curPage
      this.getTableData()
    },
    handleSizeChange(pageSize){
      // 获取分页用户信息
      this.pageSize = pageSize
      this.getTableData()
    },
  },
  data(){
    return{
      userTableData: [],
      userNum: 0,
      currentPage: 1,
      pageSize: 10,
      search_username: "",
      roleOptions: [
        {
          "value": "admin",
          "label": "admin",
        },
        {
          "value": "user",
          "label": "user",
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
