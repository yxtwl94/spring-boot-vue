<template>
  <div class="login-view">
    <LoginPage class="login"></LoginPage>
  </div>
</template>

<script>
import LoginPage from "@/components/LoginPage";
export default {
  name: "LoginView",
  components: {LoginPage},
  data(){
    return{
    }
  }
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