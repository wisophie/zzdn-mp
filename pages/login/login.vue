<template>
  <div class="container">
    <div class="login">
      <div class="login-header">
        <div class="login-avatar">
          <open-data type="userAvatarUrl"></open-data>
        </div>
        <div class="login-nickname">
          <open-data type="userNickName"></open-data>
        </div>
      </div>
      <div class="login-content">
        <image class="login-image" src="/static/home/image-login.png"></image>
        <div>请先登录账号</div>

        <div class="login-box">
          <button v-if="canIUseGetUserProfile" type="primary" class="uni-login-btn" @click="wxLogin">微信直接登录</button>  
          <button v-else type="primary" class="uni-login-btn" open-type="getUserInfo" @getuserinfo="wxLogin">微信直接登录</button>
          <button type="primary" class="account-login-btn" @click="accountLogin">账号登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user from '@/utils/user'
export default {
  data() {
    return {
      canIUseGetUserProfile: false
    }
  },

  methods: {
    wxLogin: function(e) {
      if (this.canIUseGetUserProfile) {
        uni.getUserProfile({
          desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            this.doLogin(res.userInfo)
          },
          fail: () => {
            util.showErrorToast('微信登录失败');
          }
        })
      }
      else {
        if (e.detail.userInfo == undefined) {
          app.globalData.hasLogin = false;
          util.showErrorToast('微信登录失败');
          return;
        }
        this.doLogin(e.detail.userInfo)
      }
    },
    doLogin: function(userInfo) {
      user.checkLogin().catch(() => {
        user.loginByWeixin(userInfo).then(res => {
          app.globalData.hasLogin = true;
          uni.navigateBack({
            delta: 1
          })
        }).catch((err) => {
          app.globalData.hasLogin = false;
          util.showErrorToast('微信登录失败');
        });

      });
    },
    accountLogin: function() {
      uni.navigateTo({
        url: "/pages/login/accountLogin"
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  background-color: #f4f4f4;
  font-family: PingFangSC-Light, helvetica, 'Heiti SC';
}

.login-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 0 40rpx;
  margin-top: 50rpx;
}

.uni-login-btn {
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
}

.account-login-btn {
  width: 90%;
  margin: 0 auto;
  color: #fff;
  font-size: 30rpx;
  height: 96rpx;
  line-height: 96rpx;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: flex;
  bottom: 0;
  left: 0;
  border-radius: 0;
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

.login {

  .login-header {
    height: 216rpx;
    display: flex;
    align-items: center;

    .login-avatar {
      width: 110rpx;
      height: 110rpx;
      margin-left: 62rpx;
      margin-right: 34rpx;
      border-radius: 50%;
      overflow: hidden;
    }

    .login-nickname {
      flex: 1;
      color: #000;
      font-size: 30rpx;
    }
  }

  .login-content {
    border-top: 8rpx solid #F3F2F2;
    padding-top: 102rpx;
    text-align: center;

    .login-image {
      width: 292rpx;
      height: 214rpx;
      margin-bottom: 20rpx;
    }
  }
}
</style>