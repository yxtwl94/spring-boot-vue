<template>
  <div>
    <el-table :data="tableData"
              width="100%"
              border stripe>
      <el-table-column
          prop="id"
          label="id">
      </el-table-column>
      <el-table-column
          prop="name"
          label="名字">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template v-slot="scope">
          <el-button @click="handleShowClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="handleDelClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "SubComp",
  methods:{
    getTable(){
    },
    handleShowClick(param){
      console.log(param)
    },
    handleDelClick(param){
      console.log(param)
    }
  }
}
</script>

<style scoped>

</style>
