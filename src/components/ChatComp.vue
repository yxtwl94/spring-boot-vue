<template>
  <div id="chat">
    <div id="msg" style="height:400px;overflow-y: scroll">
      <div v-for="(msg, i) in msgList" :key="i">
        <p style="display: flex">{{msg}}</p>
      </div>
    </div>
    <el-row>
      <el-col :span="20">
        <el-input v-model="message" @keyup.enter.native="sendMsg"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="sendMsg">发送</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import store from "@/store";


export default {
  name: "ChatComp",
  data() {
    return {
      message: "",
      msgList: [],
      isConnected: false,
      ws: null
    };
  },
  mounted() {
    this.initWS();
  },
  destroyed() {
    this.ws.close();
  },
  methods: {
    initWS(){
      const _this = this;
      // 如果不支持 WebSocket
      if (!("WebSocket" in window)) {
        alert("您的浏览器不支持 WebSocket!");
        return;
      }
      // 初始化websocket
      _this.ws = new WebSocket("ws://192.168.31.51:3010/ws");
      // 当socket连接打开时，输出连接成功
      _this.ws.onopen = function () {
        console.log("连接成功");
        _this.isConnected = true;
      };
      // 当有消息时根据消息类型显示不同信息
      _this.ws.onmessage = _this.onWebSocketMsg;
      // 发生错误时显示错误信息
      _this.ws.onerror = function (msg) {
        console.log(msg.data);
      };
    },
    sendMsg() {
      // 前端发送消息
      const _this = this;
      if (this.message){
        const nickname = store.state.nickname;
        _this.ws.send(nickname + ":"+this.message);
      }
      // 清空输入框
      _this.message = "";
    },
    // websocket接收到消息
    onWebSocketMsg(msgList){
      // 解析消息
      const _this = this;
      _this.msgList = []
      JSON.parse(msgList.data).forEach(function (msg) {
        _this.msgList.push(msg);
      });
      // 滚动条滚动到底部
      _this.$nextTick(function () {
        const msg = document.getElementById("msg");
        msg.scrollTop = msg.scrollHeight;
      });
    },

  },
}
</script>

<style scoped>
</style>
