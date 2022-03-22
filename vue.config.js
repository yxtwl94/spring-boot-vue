const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port: 8080,
    proxy:{
      '/api':{
        target:'http://localhost:3010/', // 后台接口地址
        changeOrigin: true,  //允许跨域
        pathRewrite:{
          '^/api':''  //去除api
        }
      }
    }
  }
})
