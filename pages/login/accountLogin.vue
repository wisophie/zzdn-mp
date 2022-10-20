<template>
  <div class="container">
    <div class="form-box">

    	<div class="form-item">
    		<input class="username" v-model="username" placeholder="账号"/>
        <van-icon name="close" v-if="username.length > 0" id="clear-username" class="clear"/>
    	</div>

    	<div class="form-item">
    		<input class="password" v-model="password" password placeholder="密码"/>
        <van-icon class="clear" id="clear-password" v-if="password.length > 0" name="close"/>      
    	</div>

    <button type="primary" class="login-btn" @click="accountLogin">账号登录</button>

     <div class="form-item-text">
      <navigator url="/pages/login/register" class="register">注册账号</navigator>
			<navigator url="/pages/login/reset" class="reset">忘记密码</navigator>
    </div> 
    </div>
  </div>
</template>

<script>
import { loginByAccount } from '@/api/login'
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
      var that = this;

    if (this.password.length < 1 || this.username.length < 1) {
      uni.showModal({
        title: '错误信息',
        content: '请输入用户名和密码',
        showCancel: false
      });
      return false;
    }

    loginByAccount({
      username: that.username,
      password: that.password
    }).then(res => {
      if (res.data.errno == 0) {
        that.loginErrorCount = 0
        uni.setStorageSync('userInfo', res.data.data.userInfo);
        uni.setStorage({
          key: "token",
          data: res.data.data.token,
          success: function() {
            uni.switchTab({
              url: '/pages/ucenter/index/index'
            });
          }
        });
      } else {
        that.loginErrorCount += 1
        uni.showErrorToast('账户登录失败');
      }
    })

    uni.request({
      url: api.AuthLoginByAccount,
      data: {
        username: that.username,
        password: that.password
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errno == 0) {
          that.setData({
            loginErrorCount: 0
          });
          app.globalData.hasLogin = true;
          uni.setStorageSync('userInfo', res.data.data.userInfo);
          uni.setStorage({
            key: "token",
            data: res.data.data.token,
            success: function() {
              uni.switchTab({
                url: '/pages/ucenter/index/index'
              });
            }
          });
        } else {
          that.setData({
            loginErrorCount: that.loginErrorCount + 1
          });
          app.globalData.hasLogin = false;
          uni.showErrorToast('账户登录失败');
        }
      }
    });
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

.form-item .username, .form-item .password, .form-item .code {
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

.login-btn {
  margin: 60rpx 0 40rpx 0;
  height: 96rpx;
  line-height: 96rpx;
  font-size: 30rpx;
  border-radius: 6rpx;
  width: 90%;
  color: #fff;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: flex;
  bottom: 0;
  left: 0;
  padding: 0;
  margin-left: 5%;
  text-align: center;
  /* padding-left: -5rpx; */
  border-top-left-radius: 50rpx;
  border-bottom-left-radius: 50rpx;
  border-top-right-radius: 50rpx;
  border-bottom-right-radius: 50rpx;
  letter-spacing: 3rpx;
  background-image: linear-gradient(to right, #9a9ba1 0%, #9a9ba1 100%);
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