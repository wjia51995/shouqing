<template>
    <div class="login_body">
        <div>
            <input v-model="username" type="text" class="login_text" placeholder="账户名">
        </div>
        <div>
            <input v-model="password" type="text" class="login_text" placeholder="请输入您的密码">
        </div>
        <div v-if="!isLogin" class="danger">账号或密码错误，请重新输入</div>
        <div class="login_btn" @touchstart="handleToLogin">
            <input type="submit" value="登录">
        </div>
        <div class="login_link">
            <router-link style="color: blue" to="/register" tag="li">立即注册</router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      isLogin: true
    }
  },
  methods: {
    handleToLogin () {
      axios({
        method: 'post',
        url: '/api2/users/login',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        // console.log(res)
        var status = res.data.status
        if (status === 0) {
          this.isLogin = true
          this.$router.push('/center')
        } else {
          this.isLogin = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .login_body{
        margin-top: 100px;
    }
    .login_text{
        width: 364px;
        height: 55px;
        margin: 0 25px;
        width: 100%;
        font-size: 15px;
        color: #191a1b;
        border: 0;
        outline: none;
    }
    .login_btn{
        line-height: 45px;
        margin: 70px 25px 0;
        border-radius: 3px;
        text-align: center;
        background-color: #ff5f16;
        height: 44px;
        input{
            background: none;
            border: none;
            outline: none;
            color: #fff;
            font-size: 16px;
        }
    }
    .danger{
      width: auto;
      text-align: center;
      color: red;
    }
    .login_link{
      margin-top: 20px;
    }
</style>
