<template>
  <div class="container">
    <div class="form-box">

      <div class="form-item">
        <input class="username" v-model="formData.username" placeholder="用户名" auto-focus/>
      </div>

      <div class="form-item">
        <input class="password" v-model="formData.password" password placeholder="密码" />
      </div>

      <div class="form-item">
        <input class="password" v-model="formData.confirmPassword" password placeholder="确认密码" />
      </div>

      <div class="form-item">
        <uni-data-picker 
          :localdata="addressOptions" 
          placeholder="地址" 
          popup-title="请选择"
          :map="{text: 'name', value: 'code'}"
          :clear-icon="false"
          preload
          @change="onchange"
        ></uni-data-picker>
      </div>

      <div class="form-item">
        <input class="mobile" v-model="formData.mobile" placeholder="手机号" />
      </div>

      <div class="form-item-code">
        <div class="form-item code-item">
          <input class="code" v-model="formData.code" placeholder="验证码" />
        </div>
        <div class="code-btn" @click="sendCode">{{ codeTips }}</div>
        <u-code ref="uCode"	@change="codeChange"></u-code>
      </div>

      <view class="register-btn">
        <u-button type="primary" @click="startRegister">注册</u-button>
      </view>

    </div>
  </div>
</template>

<script>
import { register, regCaptcha } from '@/api/login'
import { regionList } from '@/api/address'
// #ifdef MP-WEIXIN
const isMpWeixin = true
// #endif
// #ifdef APP-PLUS
const isMpWeixin = false
// #endif
export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        code: '',
        province: '',
        city: '',
      },

      genderOption: [
        { text: '男', value: 1 },
        { text: '女', value: 2 },
      ],
      addressOptions: [],
      codeTips: '获取验证码',
    }
  },

  created() {
    this.getRegionList()
  },

  methods: {
    getRegionList() {
      regionList().then(res => {
        this.addressOptions = res.data.list
        console.log(this.addressOptions)
      })
    },

    onchange(e) {
      const { value } = e.detail
      const addressType = ['province', 'city']
      value.forEach((item, index) => {
        if (addressType[index]) {
          this.formData[addressType[index]] = item.text
        }
      })
    },
    
    codeChange(text) {
      this.codeTips = text;
    },

    sendCode() {
      let that = this;

      if (this.formData.mobile.length == 0) {
        uni.$u.toast('手机号不能为空')
        return false;
      }

      regCaptcha({
        mobile: this.formData.mobile
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

    requestRegister(wxCode) {
      let that = this;
      const params = {...this.formData}
      if (wxCode) params.wxCode = wxCode
      register(params).then(res => {
        if (res.errno == 0) {
          uni.setStorageSync('userInfo', res.data.userInfo);
          uni.setStorage({
            key: "token",
            data: res.data.token,
            success: function() {
              uni.switchTab({
                url: '/pages/home/home'
              });
            }
          });
        } else {
          uni.$u.toast(res.errmsg)
        }
      })
    },

    startRegister() {
      var that = this;
      if (this.formData.username.length < 1) {
        uni.$u.toast('用户名不得少于1位')
        return false;
      }
      if (this.formData.password.length < 6) {
        uni.$u.toast('密码不得少于6位')
        return false;
      }

      if (this.formData.password != this.formData.confirmPassword) {
        uni.$u.toast('确认密码不一致')
        return false;
      }

      if (this.formData.mobile.length == 0 || this.formData.code.length == 0) {
        uni.$u.toast('手机号和验证码不能为空')
        return false;
      }

      if (!this.formData.province) {
        uni.$u.toast('地址不能为空')
        return false
      }

      if (isMpWeixin) {
        uni.login({
          success: function(res) {
            if (!res.code) {
              uni.$u.toast('注册失败')
            }
  
            that.requestRegister(res.code);
          }
        });
      } else {
        that.requestRegister();
      }

    },
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
  // width: 100%;
  height: auto;
  overflow: hidden;
  padding: 0 40rpx;
  margin-top: 96rpx;
  background: #fff;
  box-sizing: border-box;
}

.form-item {
  position: relative;
  background: #fff;
  height: 96rpx;
  border-bottom: 1px solid #d9d9d9;
}

.form-item .username, .form-item .password, .form-item .mobile, .form-item .code {
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

.register-btn {
  margin: 60rpx 0 40rpx 0;
  height: 96rpx;
  line-height: 96rpx;
  color: #fff;
  font-size: 30rpx;
  width: 100%;
  border-radius: 6rpx;
}

/deep/ {
  .input-value-border {
    padding: 0;
    border: none;
  }

  .uni-data-tree, .selected-area.placeholder {
    font-size: 30rpx !important;
  }
}
</style>