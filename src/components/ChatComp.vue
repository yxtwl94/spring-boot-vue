<template>
  <div id="chat">
<!--    按钮-->
    <el-input v-model="message"></el-input>
    <el-button type="primary" @click="sendMsg">发送消息</el-button>
<!--    聊天框-->
    <div>
      {{message}}
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatComp",
  data() {
    return {
      message: "",
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
      _this.ws = new WebSocket("ws://localhost:8080/ws");
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
      const _this = this;
      _this.ws.send(this.message);
    },
    // websocket接收到消息
    onWebSocketMsg(msg){
      console.log(msg.data)
    }
  },
}
</script>

<style scoped>

</style>