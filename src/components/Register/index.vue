<template>
    <div class="register_body">
        <div>
            <input v-model="username" type="text" class="register_text" placeholder="账户名">
        </div>
        <div>
            <input v-model="password" type="text" class="register_text" placeholder="请输入您的密码">
        </div>
        <div v-if="!isRegister" class="danger">注册失败</div>
        <div v-if="success" class="danger">注册成功</div>
        <div class="register_btn" @touchstart="handleToRegister">
            <input type="submit" value="注册">
        </div>
        <div class="register_link">
            <router-link style="color: blue" to="/login" tag="li">立即登录</router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'register',
  data () {
    return {
      username: '',
      password: '',
      isRegister: true,
      success: false
    }
  },
  methods: {
    handleToRegister () {
      axios({
        method: 'post',
        url: '/api2/users/register',
        data: {
          username: this.username,
          password: this.password
        }
      }).then((res) => {
        // console.log(res)
        var status = res.data.status
        if (status === 0) {
          this.success = true
          this.$router.push('/login')
        } else {
          this.isRegister = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .register_body{
        margin-top: 100px;
    }
    .register_text{
        width: 364px;
        height: 55px;
        margin: 0 25px;
        width: 100%;
        font-size: 15px;
        color: #191a1b;
        border: 0;
        outline: none;
    }
    .register_btn{
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
    .register_link{
      margin-top: 20px;
    }
</style>
