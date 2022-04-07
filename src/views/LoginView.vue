<template>
  <div class="login-view">
    <Login class="login"></Login>
  </div>
</template>

<script>
import Login from "@/components/LoginComp";
export default {
  name: "LoginView",
  // eslint-disable-next-line vue/no-unused-components
  components: {Login},
  data(){
    return{
    }
  },
  mounted() {
    this.getCurrentPosition()
  },
  methods: {
  },
}
</script>

<style scoped>

.login-view{
  background-color: #333333;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
