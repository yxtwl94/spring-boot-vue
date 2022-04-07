<template>
  <div id="chat">
<!--    按钮-->
    <el-input v-model="message"></el-input>
    <el-button type="primary" @click="sendMsg">发送消息</el-button>
<!--    聊天框-->
    <div v-for="(msg, i) in msgList" :key="i">
      <p>{{msg}}</p>
    </div>
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
      // 初始化websocket
      _this.ws = new WebSocket("ws://localhost:3010/ws");
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
    },
    // websocket接收到消息
    onWebSocketMsg(msgList){
      // 解析消息
      const _this = this;
      _this.msgList = []
      JSON.parse(msgList.data).forEach(function (msg) {
        _this.msgList.push(msg);
      });
    }
  },
}
</script>

<style scoped>

</style>
