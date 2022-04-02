<template>
  <div>
    <el-upload
        class="upload"
        drag
        action="/api/tools/uploadFile/"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传csv文件</div>
    </el-upload>

    <!--chart-->
    <div id="chart" style="width: 100%;height:400px;"></div>
  </div>
</template>

<script>
import {Message} from "element-ui";
import * as echarts from "_echarts@5.3.2@echarts";

export default {
  name: "SubComp",
  data: function () {
    return {
      fileList: [],
      fileData: {},
    };
  },
  methods:{
    handleExceed(files) {
      Message({
        message: '当前限制选择 ' + files.length + ' 个文件',
        type: 'warning'
      });
    },
    handleRemove(file) {
      console.log(file);
    },
    handleSuccess(res) {
      this.drawChart(res.data);
    },
    drawChart(data){
      console.log(data)
      // 初始化echarts实例
      var myChart = echarts.init(document.getElementById('chart'));
      // 绘制图表
      var series = []
      for (const key in data) {
        series.push({
          type: 'line',
          data: data[key]
        })
      }
      myChart.setOption({
        title: {
          text: '文件展示'
        },
        tooltip: {
          trigger: 'axis',
          // 缩放
          zoom: true,
        },
        toolbox:{
          feature:{
            dataZoom:{
              yAxisIndex: 'none'
            },
            restore:{},
            saveAsImage:{}
          }
        },
        legend: {},
        xAxis: {
          type: 'category',
        },
        yAxis: {},
        series: series
      });
      // echarts大小自适应
      window.addEventListener('resize', function () {
        myChart.resize();
      });
    }
  }
}
</script>

<style scoped>

</style>
