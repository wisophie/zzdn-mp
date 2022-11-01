<template>
  <div class="container">
    <div class="login">
      <div class="login-content">
        <image class="login-image" src="/static/home/image-login.png"></image>
        <div>请先登录账号</div>

        <div class="login-box">
          <button v-if="canIUseGetUserProfile" type="primary" class="uni-login-btn" @click="getUserInfo">微信授权登录/注册</button>
          <button v-else type="primary" class="uni-login-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">微信授权登录/注册</button>
          <button type="primary" class="account-login-btn" @click="accountLogin">账号登录</button>
        </div>
      </div>
    </div>

    <u-popup :show="authVisible" :round="10" mode="center">
      <view class="popup-content">
        <view class="popup-title">授权</view>
        <view class="popup-desc">授权完善你的昵称、头像等公开信息<br>获得更好体验</view>
        <view class="popup-button">
          <button class="button-left" @click="authVisible=false">不同意</button>
          <button class="button-right" open-type="getUserInfo" @getuserinfo="getUserInfo">同意</button>
        </view>
      </view>
    </u-popup>
  </div>
</template>

<script>
import user from '@/utils/user'
import { bindPhone, fetchUserInfo } from '@/api/login'
export default {
  data() {
    return {
      canIUseGetUserProfile: false,
      userInfo: null,
      phoneInfo: null,
      authVisible: false
    }
  },

  created() {
    if (uni.getUserProfile) {
      this.canIUseGetUserProfile = true
    }
  },

  methods: {
    getUserInfo(e) {
      if (this.canIUseGetUserProfile) {
        uni.getUserProfile({
          desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            this.userInfo = res.userInfo
            this.doLogin(res.userInfo)
          },
          fail: () => {
            util.showErrorToast('微信登录失败');
          }
        })
        return
      }
      if (e.detail.userInfo !== undefined) {
        this.userInfo = e.detail.userInfo
        this.doLogin(this.userInfo)
      }
    },

    getPhoneNumber(e) {
      if (e.detail.errMsg !== "getPhoneNumber:ok") {
        uni.$u.toast('微信登录失败')
        // 拒绝授权
        return;
      }
      this.phoneInfo = e.detail

      if (this.userInfo) {
        this.doLogin(this.userInfo)
      } else {
        this.authVisible = true
      }
    },

    doLogin(userInfo) {
      user.checkLogin().then(() => {
        this.fetchUserInfo()
      }).catch(() => {
        user.loginByWeixin(userInfo)
          .then(res => {
            this.fetchUserInfo()
          }).catch((err) => {
            uni.$u.toast('微信登录失败')
          });

      });
    },

    doBindPhone() {
      const { encryptedData, iv } = this.phoneInfo
      bindPhone({
        encryptedData,
        iv
      }).then((res) => {
        if (res.errno === 0) {
          uni.$u.toast('微信登录成功')
          uni.navigateBack({
            delta: 1
          })
        } else {
          uni.$u.toast('微信登录失败')
        }
      })
    },

    fetchUserInfo() {
      return fetchUserInfo({}).then(res => {
        // 校验手机号、省市区等个人信息是否存在
        if (res.errno === 0) {
          const data = res.data
          if (!data.mobile || !data.province) {
            uni.navigateTo({
              url: '/pages/login/perfectInfo'
            })
            return
          }
        }
        uni.navigateBack()
      })
    },

    accountLogin: function() {
      uni.navigateTo({
        url: "/pages/login/accountLogin"
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  background-color: #fff;
  font-family: PingFangSC-Light, helvetica, 'Heiti SC';
  height: 100vh;
}

.login-box {
  // width: 100%;
  height: auto;
  overflow: hidden;
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
  background  : #5c4ffe;
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

.popup-content {
  width: 640rpx;

  .popup-title {
    margin-top: 80rpx;
    margin-bottom: 60rpx;
    font-size: 36rpx;
    font-weight: 600;
    text-align: center;
    color: #333;
  }

  .popup-desc {
    margin-bottom: 60rpx;
    font-size: 30rpx;
    line-height: 1.5;
    color: #333;
    text-align: center;
  }

  .popup-button {
    display: flex;
    justify-content: space-between;
    padding: 0 60rpx 60rpx;

    .button-left, .button-right {
      height: 72rpx;
      line-height: 72rpx;
      width: 180rpx;
      border-radius: 36rpx;
      text-align: center;
      font-size: 30rpx;
    }

    .button-left {
      border: 1rpx solid #ccc;
      color: #333;
    }

    .button-right {
      background: #2979ff;
      color: #fff;
    }
  }
}
</style>