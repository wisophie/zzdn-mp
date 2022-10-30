<template>
  <view class="container">
    <view class="form-box">

      <view class="form-item">
        <input class="mobile" v-model="mobile" type="number" placeholder="手机号" />
      </view>

      <view class="form-item-code">
        <view class="form-item code-item">
          <input class="code" v-model="code" type="number" placeholder="验证码" />
        </view>
        <view class="code-btn" @click="sendCode">{{ codeTips }}</view>
        <u-code ref="uCode"	@change="codeChange"></u-code>
      </view>

      <view class="form-item">
        <input class="password" v-model="password" password placeholder="密码" />
      </view>

      <view class="form-item">
        <input class="password" v-model="confirmPassword" password placeholder="确认密码" />
      </view>

      <button type="default" class="reset-btn" @click="startReset">密码重置</button>

    </view>
  </view>
</template>

<script>
import { resetPwd, regCaptcha } from '@/api/login'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      password: '',
      confirmPassword: '',
      codeTips: '获取验证码'
    }
  },

  methods: {
    sendCode() {
      if (!this.mobile) {
        uni.$u.toast('手机号不能为空')
        return false;
      }

      regCaptcha({
        mobile: this.mobile,
        type: 'captcha'
      }).then(res => {
        if (res.errno == 0) {
          uni.$u.toast('验证码已发送')
          // 通知验证码组件内部开始倒计时
          this.$refs.uCode.start();
        } else {
          uni.$u.toast(res.errmsg)
        }
      })
    },

    codeChange(text) {
      this.codeTips = text;
    },

    startReset() {
      var that = this;

      if (this.mobile.length == 0 || this.code.length == 0) {
        uni.$u.toast('手机号和验证码不能为空')
        return false;
      }

      if (this.password.length < 6) {
        uni.$u.toast('密码不得少于6位')
        return false;
      }

      if (this.password != this.confirmPassword) {
        uni.$u.toast('确认密码不一致')
        return false;
      }

      resetPwd({
        mobile: this.mobile,
        code: this.code,
        password: this.password
      }).then(res => {
        if (res.errno === 0) {
          uni.navigateBack()
        } else {
          uni.$u.toast('密码重置失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #fff;
  overflow: auto;
}

.form-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 0 40rpx;
  margin-top: 96rpx;
  background: #fff;
}

.form-item {
  position: relative;
  background: #fff;
  height: 96rpx;
  border-bottom: 1px solid #d9d9d9;
}

.form-item .mobile, .form-item .password, .form-item .code {
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
  position: relative;
  margin-top: 32rpx;
  height: auto;
  overflow: hidden;
  width: 100%;
}

.form-item-code .form-item {
  float: left;
  width: 100%;
}

.form-item-code .code-btn {
  position: absolute;
  right: 0;
  bottom: 16rpx;
  padding: 10rpx 20rpx;
  color: #5d51ff;
  z-index: 10;
}

.form-item .clear {
  position: absolute;
  top: 32rpx;
  right: 18rpx;
  z-index: 2;
  display: block;
  background: #fff;
}

.reset-btn {
  margin: 60rpx 0 40rpx 0;
  height: 96rpx;
  line-height: 96rpx;
  color: #fff;
  font-size: 30rpx;
  width: 100%;
  background: #5d51ff;
  border-radius: 6rpx;
}

</style>