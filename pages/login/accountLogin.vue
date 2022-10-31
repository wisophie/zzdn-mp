<template>
  <div class="container">
    <div class="form-box">
      <div class="form-item">
        <input class="username" v-model="username" placeholder="账号" />
        <van-icon name="close" v-if="username.length > 0" id="clear-username" class="clear" />
      </div>

      <div class="form-item">
        <input class="password" v-model="password" password placeholder="密码" />
        <van-icon class="clear" id="clear-password" v-if="password.length > 0" name="close" />
      </div>

      <div class="button-login">
        <u-button type="primary" text="登录" @click="accountLogin"></u-button>
      </div>

      <div class="form-item-text">
        <navigator url="/pages/login/register" class="register">注册账号</navigator>
        <navigator url="/pages/login/reset" class="reset">忘记密码</navigator>
      </div>
    </div>
  </div>
</template>

<script>
import { loginByAccount, fetchUserInfo } from '@/api/login'

export default {
  data() {
    return {
      username: '',
      password: '',
      code: '',
      loginErrorCount: 0
    }
  },

  methods: {
    accountLogin() {
      var that = this

      if (this.password.length < 1 || this.username.length < 1) {
        uni.$u.toast('请输入账号和密码')
        return false
      }

      loginByAccount({
        username: that.username,
        password: that.password
      }).then(res => {
        if (res.errno == 0) {
          that.loginErrorCount = 0
          uni.setStorage({
            key: 'token',
            data: res.data.token,
            success: function () {
              fetchUserInfo().then(response => {
                const userInfo = response.data
                // console.log('%c 【 userInfo 】-60', 'font-size:14px; color:rgb(210, 110, 210);', userInfo)
                uni.setStorageSync('userInfo', userInfo)
                setTimeout(() => {
                  uni.switchTab({
                    url: '/pages/home/home'
                  })
                }, 600)
              })
            }
          })
        } else {
          that.loginErrorCount += 1
          uni.$u.toast('账户登录失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background: #fff;
  overflow: hidden;
}

.form-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 0 40rpx;
  margin-top: 200rpx;
  background: #fff;
}

.form-item {
  position: relative;
  background: #fff;
  height: 96rpx;
  border-bottom: 1px solid #d9d9d9;
}

.form-item .username,
.form-item .password,
.form-item .code {
  position: absolute;
  top: 26rpx;
  left: 0;
  display: block;
  width: 100%;
  height: 44rpx;
  background: #fff;
  color: #333;
  font-size: 30rpx;
}

.form-item-code {
  margin-top: 32rpx;
  height: auto;
  overflow: hidden;
  width: 100%;
}

.form-item-code .form-item {
  float: left;
  width: 350rpx;
}

.form-item-code .code-img {
  float: right;
  margin-top: 4rpx;
  height: 88rpx;
  width: 236rpx;
}

.form-item .clear {
  position: absolute;
  top: 32rpx;
  right: 18rpx;
  z-index: 2;
  display: block;
  background: #fff;
}

.button-login {
  margin-top: 60rpx;
  margin-bottom: 40rpx;
}

.form-item-text {
  height: 35rpx;
  width: 100%;
}

.form-item-text .register {
  display: block;
  height: 34rpx;
  float: left;
  font-size: 28rpx;
}

.form-item-text .reset {
  display: block;
  height: 34rpx;
  float: right;
  font-size: 28rpx;
}
</style>
