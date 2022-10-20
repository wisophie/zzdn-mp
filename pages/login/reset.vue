<template>
  <view class="container">
    <view class="form-box">

      <view class="form-item">
        <input class="mobile" v-model="mobile" placeholder="手机号" />
      </view>

      <view class="form-item-code">
        <view class="form-item code-item">
          <input class="code" v-model="code" placeholder="验证码" />
        </view>
        <view class="code-btn" @click="sendCode">获取验证码</view>
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
export default {
  data() {
    return {
      mobile: '',
      code: '',
      password: '',
      confirmPassword: ''
    }
  },

  methods: {
    sendCode() {
      let that = this;
      wx.request({
        url: api.AuthRegisterCaptcha,
        data: {
          mobile: that.data.mobile
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          if (res.data.errno == 0) {
            wx.showModal({
              title: '发送成功',
              content: '验证码已发送',
              showCancel: false
            });
          } else {
            wx.showModal({
              title: '错误信息',
              content: res.data.errmsg,
              showCancel: false
            });
          }
        }
      });
    },

    startReset() {
      var that = this;

      if (this.data.mobile.length == 0 || this.data.code.length == 0) {
        wx.showModal({
          title: '错误信息',
          content: '手机号和验证码不能为空',
          showCancel: false
        });
        return false;
      }

      if (this.data.password.length < 3) {
        wx.showModal({
          title: '错误信息',
          content: '用户名和密码不得少于3位',
          showCancel: false
        });
        return false;
      }

      if (this.data.password != this.data.confirmPassword) {
        wx.showModal({
          title: '错误信息',
          content: '确认密码不一致',
          showCancel: false
        });
        return false;
      }

      wx.request({
        url: api.AuthReset,
        data: {
          mobile: that.data.mobile,
          code: that.data.code,
          password: that.data.password
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          if (res.data.errno == 0) {
            wx.navigateBack();
          } else {
            wx.showModal({
              title: '密码重置失败',
              content: res.data.errmsg,
              showCancel: false
            });
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
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
  margin-top: 32rpx;
  height: auto;
  overflow: hidden;
  width: 100%;
}

.form-item-code .form-item {
  float: left;
  width: 350rpx;
}

.form-item-code .code-btn {
  float: right;
  padding: 20rpx 40rpx;
  border: 1px solid #d9d9d9;
  border-radius: 10rpx;
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
  background: #b4282d;
  border-radius: 6rpx;
}

</style>