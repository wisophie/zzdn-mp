<template>
  <div class="container">
    <div class="login">
      <div class="login-content">
        <image class="login-image" src="/static/home/image-login.png"></image>
        <div>请先登录账号</div>

        <div class="login-box">
          <!-- #ifdef MP-WEIXIN -->
          <button v-if="canIUseGetUserProfile" type="primary" class="uni-login-btn" @click="getUserInfo">微信授权登录/注册</button>
          <button v-else type="primary" class="uni-login-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">微信授权登录/注册</button>
          <!-- #endif -->
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
import {loginImUser} from '../../utils/imlogin';
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

  onShow() {
    if (uni.getUserProfile) {
      this.canIUseGetUserProfile = true
    }
  },

  methods: {
    getUserInfo(e) {
			if (!user.isMpWeixin) {
				this.doLogin()
				return
			}
      if (this.canIUseGetUserProfile) {
        uni.getUserProfile({
          desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            console.log(res)
            this.userInfo = res.userInfo
            this.doLogin(res.userInfo)
          },
          fail: () => {
            uni.$u.toast('微信登录失败')
          }
        })
        return
      }
      console.log( e.detail, '--gg')
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
			console.log('doLogin')
      user.checkLogin().then(() => {
				console.log('checkLogin true')
        this.fetchUserInfo()
      }).catch(() => {
				console.log('checkLogin false')
        user.loginByWeixin(userInfo)
          .then(res => {
            this.fetchUserInfo()
			
          }).catch((err) => {
            uni.$u.toast(err)
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
		loginImUser()
        if (res.errno === 0) {
          const data = res.data
          if (!data.mobile || !data.province) {
            uni.redirectTo({
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
	// loginImUser(){
	// 	const {id:userID,avatar:FaceUrl,username:Nick} = uni.getStorageSync('userInfo')
	// 	let usig=genTestUserSig('administrator')
	// 	uni.request({
	// 		url:`https://console.tim.qq.com/v4/im_open_login_svc/account_import?sdkappid=1400755763&identifier=administrator&usersig=eJwtzMEOgjAQBNB-6RVD1upSQ*JJvRgSi4J6bWypGwWxNMRo-HcROM6byXxYlhzC1jgWMx4Cm-SZtKk8FdSz0iVV1Hin-MONg0bfVF2TZvF0DiAQRTQbGvOqyZnOEZEDwKCeyr9FkRDAcSHGF7Ld-4rbzfmppLRBju9qW*x3zpn2sj6Lqz2VKeXHeyKzQFK6ZN8fZOA1Tw__&random=2233221152&contenttype=json`,
	// 		data:{
	// 			   "UserID":userID.toString(),
	// 			   "Nick":Nick,
	// 			   "FaceUrl":FaceUrl
	// 			},
	// 		method:'POST',
	// 		success:(res)=>{	
	// 			if(res.data.ActionStatus=='OK'){
	// 				this.login(userID.toString())
	// 			}
				
	// 		}
	// 	})
	// },
	// login(e) {
	// 	const userID = e  //this.userID;
	// 	const userSig = genTestUserSig(userID).userSig;
	// 	const SDKAppID = app.globalData.SDKAppID;
	// 	logger.log(`TUI-login | login  | userSig:${userSig} userID:${userID}`);
	// 	// #ifdef  APP-PLUS
	// 	uni.$aegis.reportEvent({
	// 	    name: 'platform',
	// 	    ext1: 'platform-APP',
	// 	    ext2: 'uniTuikitExternal',
	// 	    ext3: `${SDKAppID}`,
	// 	})
	// 	// #endif
	// 	// #ifdef MP-WEIXIN  
	// 	uni.$aegis.reportEvent({
	// 	    name: 'platform',
	// 	    ext1: 'platform-MP-WEIXIN',
	// 	    ext2: 'uniTuikitExternal',
	// 	    ext3: `${SDKAppID}`,
	// 	})
	// 	// #endif
	// 	// #ifdef H5
	// 	uni.$aegis.reportEvent({
	// 	    name: 'platform',
	// 	    ext1: 'platform-H5',
	// 	    ext2: 'uniTuikitExternal',
	// 	    ext3: `${SDKAppID}`,
	// 	})
	// 	uni.showToast({
	// 		title: 'TUIKit 暂不支持 H5 / web ，请使用者自己完成兼容哦～ ',
	// 		icon: 'none',
	// 		duration: 3000
	// 	});
	// 	// #endif
	// 	app.globalData.userInfo = {
	// 		userSig,
	// 		userID
	// 	};
	// 	// setTokenStorage({
	// 	// 	userInfo: app.globalData.userInfo
	// 	// });
	// 	wx.setStorageSync(`TIM_${getApp().SDKAppID}_isTUIKit`, true);
	// 	uni.$TUIKit.login({
	// 		userID: userID,
	// 		userSig: userSig
	// 	}).then(() => {
	// 		uni.$aegis.reportEvent({
	// 		    name: 'login',
	// 		    ext1: 'login-success',
	// 		    ext2: 'uniTuikitExternal',
	// 		    ext3: `${SDKAppID}`,
	// 		})
	// 	}).catch((error) => {
	// 		uni.$aegis.reportEvent({
	// 		    name: 'login',
	// 		    ext1: `login-failed#error:${error}`,
	// 		    ext2: 'uniTuikitExternal',
	// 		    ext3: `${SDKAppID}`,
	// 		})
	// 	})
		
	// 	// 登录原生插件
	// 	// #ifdef APP-PLUS
	// 	if(typeof(uni.$TUICalling) == 'undefined') {
	// 		uni.showToast({
	// 			title: '如果需要音视频功能，请集成插件使用真机运行并且自定义基座调试哦～',
	// 			icon: 'none',
	// 			duration: 3000
	// 		});
	// 		logger.error('请使用真机运行并且自定义基座调试，否则影响音视频功能～ 插件地址：https://ext.dcloud.net.cn/plugin?id=7097 , 调试地址：https://nativesupport.dcloud.net.cn/NativePlugin/use/use');
	// 	} else {
	// 		uni.$TUICalling.login(
	// 			{
	// 				sdkAppID: SDKAppID,
	// 				userID: userID,
	// 				userSig: userSig
	// 			},
	// 			res => {
	// 				console.log(JSON.stringify(res.msg));
	// 				uni.showToast({
	// 					title: 'login',
	// 					icon: 'none'
	// 				});
	// 			}
	// 		);
	// 	}
		
	// 	// #endif
	// 	if (this.path && this.path !== 'undefined') {
	// 		uni.redirectTo({
	// 			url: this.path
	// 		});
	// 	} else {
	// 		// uni.switchTab({
	// 		// 	url: '../TUI-Conversation/conversation/conversation'
	// 		// });
	// 	}
	// },
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