<template>
  <view class="container">
    <u--form labelWidth="60px">
      <u-form-item label="手机" borderBottom>
        <u-input v-model="formData.mobile" placeholder="请输入您的手机号" border="none" type="number"></u-input>
      </u-form-item>
      <u-form-item label="验证码" borderBottom>
        <u-input v-model="formData.code" placeholder="请输入您的验证码" border="none" type="number">
          <view slot="suffix" class="code-btn" @click="sendCode">{{codeTips}}</view>
          <!-- <u-button slot="suffix" type="success" size="mini" @click="sendCode">{{codeTips}}</u-button> -->
          <u-code ref="uCode"	@change="codeChange"></u-code>
        </u-input>
      </u-form-item>
      <u-form-item label="密码">
        <u-input v-model="formData.password" type="password" border="none" placeholder="请输入当前账号的密码"></u-input>
      </u-form-item>
    </u--form>

    <view class="bottom">
      <u-button type="primary" @click="handleBind">{{ isBinded ? '确认换绑' : '确认绑定' }}</u-button>
    </view>
  </view>
</template>

<script>
import { regCaptcha } from '@/api/login'
import { resetPhone } from '@/api/home'

export default {
  data() {
    return {
      isBinded: false,
      codeTips: '获取验证码',
      formData: {
        mobile: '',
        code: '',
        password: ''
      }
    }
  },

  onLoad(options) {
    if (options.mobile) {
      this.isBinded = true
      this.formData.mobile = options.mobile
    }
  },

  methods: {
    codeChange(text) {
      this.codeTips = text;
    },

    sendCode() {
      if(!this.$refs.uCode.canGetCode) {
        return
      }

      if (this.formData.mobile.length == 0) {
        uni.$u.toast('手机号不能为空')
        return false;
      }

      regCaptcha({
        mobile: this.formData.mobile
      }).then(res => {
        uni.$u.toast('验证码已发送')
        // 通知验证码组件内部开始倒计时
        this.$refs.uCode.start();
      })
    },

    handleBind() {
      if (!this.formData.mobile) {
        uni.$u.toast('手机号不能为空')
        return false;
      }

      if (!this.formData.code) {
        uni.$u.toast('验证码不能为空')
        return false;
      }

      resetPhone(this.formData).then(res => {
        uni.$u.toast('绑定成功')
        uni.navigateBack({
           delta: 1
        });
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100vh;
  padding: 48rpx 24rpx;
  box-sizing: border-box;
  background: #fff;

  .code-btn {
    color: #5d51ff;
  }

  .bottom {
    margin-top: 80rpx;
  }
}
</style>